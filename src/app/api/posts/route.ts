import { NextRequest } from "next/server";
import { requireAuth, ok, err, unauthorized, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { searchParams } = new URL(req.url);
  const game = searchParams.get("game");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") ?? "latest";
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 20;

  const posts = await prisma.communityPost.findMany({
    where: {
      ...(game && { gameId: game }),
      ...(category && { category }),
    },
    include: {
      user: { select: { id: true, namaAsli: true, avatarUrl: true, tier: true } },
      game: { select: { id: true, title: true, slug: true } },
      _count: { select: { replies: true, reactions: true } },
    },
    orderBy:
      sort === "popular"
        ? { reactionsCount: "desc" }
        : sort === "trending"
        ? { viewsCount: "desc" }
        : { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return ok({ posts, page, limit });
}

export async function POST(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  // Free members cannot post
  if (user.tier === "FREE") {
    return forbidden();
  }

  const body = await req.json();
  const { gameId, category, title, content } = body;

  if (!category || !title || !content) {
    return err("category, title, dan content wajib diisi");
  }

  const post = await prisma.communityPost.create({
    data: {
      userId: user.id,
      gameId: gameId ?? null,
      category,
      title,
      content,
    },
  });

  return ok(post, 201);
}
