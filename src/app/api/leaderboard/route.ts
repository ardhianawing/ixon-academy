import { NextRequest } from "next/server";
import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "xp"; // xp | talent | attitude
  const game = searchParams.get("game");
  const limit = 50;

  const orderBy =
    type === "talent"
      ? { talentScore: "desc" as const }
      : type === "attitude"
      ? { attitudeScore: "desc" as const }
      : { xp: "desc" as const };

  const players = await prisma.player.findMany({
    where: { ...(game && { gameId: game }) },
    include: {
      user: { select: { id: true, namaAsli: true, avatarUrl: true, tier: true } },
      game: { select: { id: true, title: true, slug: true } },
    },
    orderBy,
    take: limit,
  });

  const leaderboard = players.map((p, i) => ({
    rank: i + 1,
    playerId: p.id,
    userId: p.userId,
    nickname: p.nickname,
    user: p.user,
    game: p.game,
    xp: p.xp,
    level: p.level,
    talentScore: p.talentScore,
    attitudeScore: p.attitudeScore,
    isMe: p.userId === user.id,
  }));

  return ok(leaderboard);
}
