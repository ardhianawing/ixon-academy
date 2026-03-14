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
  const { type } = await req.json(); // e.g. "fire", "like", "insightful"

  if (!type) return err("type wajib diisi");

  const post = await prisma.communityPost.findUnique({ where: { id: postId } });
  if (!post) return notFound("Post");

  const existing = await prisma.communityReaction.findUnique({
    where: {
      userId_reactableType_reactableId: {
        userId: user.id,
        reactableType: "post",
        reactableId: postId,
      },
    },
  });

  if (existing) {
    if (existing.type === type) {
      // Toggle off
      await prisma.communityReaction.delete({ where: { id: existing.id } });
      await prisma.communityPost.update({
        where: { id: postId },
        data: { reactionsCount: { decrement: 1 } },
      });
      return ok({ action: "removed" });
    } else {
      // Change reaction type
      await prisma.communityReaction.update({
        where: { id: existing.id },
        data: { type },
      });
      return ok({ action: "changed", type });
    }
  }

  await prisma.communityReaction.create({
    data: {
      userId: user.id,
      reactableType: "post",
      reactableId: postId,
      type,
    },
  });

  await prisma.communityPost.update({
    where: { id: postId },
    data: { reactionsCount: { increment: 1 } },
  });

  return ok({ action: "added", type });
}
