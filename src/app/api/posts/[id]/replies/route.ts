import { NextRequest } from "next/server";
import { requireAuth, ok, err, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id: postId } = await params;
  const { content, parentReplyId } = await req.json();

  if (!content) return err("content wajib diisi");

  const post = await prisma.communityPost.findUnique({ where: { id: postId } });
  if (!post) return notFound("Post");
  if (post.isLocked) return err("Post ini telah dikunci", 403);

  const reply = await prisma.communityReply.create({
    data: {
      postId,
      userId: user.id,
      content,
      parentReplyId: parentReplyId ?? null,
    },
    include: {
      user: { select: { id: true, namaAsli: true, avatarUrl: true, tier: true } },
    },
  });

  await prisma.communityPost.update({
    where: { id: postId },
    data: { repliesCount: { increment: 1 } },
  });

  return ok(reply, 201);
}
