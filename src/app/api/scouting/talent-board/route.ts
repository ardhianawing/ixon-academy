import { NextRequest } from "next/server";
import { requireRole, ok, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await requireRole("SCOUTING", "ADMIN");
  if (!user) return forbidden();

  const { searchParams } = new URL(req.url);
  const game = searchParams.get("game");
  const role = searchParams.get("role");
  const minScore = parseFloat(searchParams.get("min_score") ?? "0");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 20;

  const talents = await prisma.talentBoard.findMany({
    where: {
      talentScore: { gte: minScore },
      player: {
        ...(game && { gameId: game }),
        ...(role && { roleIngame: role }),
      },
    },
    include: {
      player: {
        include: {
          game: true,
          user: { select: { id: true, namaAsli: true, avatarUrl: true } },
        },
      },
    },
    orderBy: { talentScore: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return ok({ talents, page, limit });
}
