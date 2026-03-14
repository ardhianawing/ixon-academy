import { requireAuth, ok, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id } = await params;

  const post = await prisma.communityPost.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, namaAsli: true, avatarUrl: true, tier: true } },
      game: { select: { id: true, title: true, slug: true } },
      replies: {
        where: { parentReplyId: null },
        include: {
          user: { select: { id: true, namaAsli: true, avatarUrl: true, tier: true } },
          childReplies: {
            include: {
              user: { select: { id: true, namaAsli: true, avatarUrl: true, tier: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!post) return notFound("Post");

  // Increment view count
  await prisma.communityPost.update({
    where: { id },
    data: { viewsCount: { increment: 1 } },
  });

  // Check user reaction
  const userReaction = await prisma.communityReaction.findUnique({
    where: {
      userId_reactableType_reactableId: {
        userId: user.id,
        reactableType: "post",
        reactableId: id,
      },
    },
  });

  return ok({ ...post, userReaction: userReaction?.type ?? null });
}
