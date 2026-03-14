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
  const { reason, description } = await req.json();

  if (!reason) return err("reason wajib diisi");

  const post = await prisma.communityPost.findUnique({ where: { id: postId } });
  if (!post) return notFound("Post");

  const report = await prisma.communityReport.create({
    data: {
      reporterUserId: user.id,
      reportableType: "post",
      reportableId: postId,
      reason,
      description: description ?? null,
    },
  });

  await prisma.communityPost.update({
    where: { id: postId },
    data: { reportsCount: { increment: 1 } },
  });

  return ok(report, 201);
}
