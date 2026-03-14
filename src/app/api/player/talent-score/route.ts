import { requireAuth, ok, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const player = await prisma.player.findFirst({
    where: { userId: user.id },
    include: {
      game: true,
      talentBoard: true,
    },
  });

  if (!player) return notFound("Player profile");

  return ok({
    talentScore: player.talentScore,
    skillSignal: player.skillSignal,
    mindsetSignal: player.mindsetSignal,
    commitmentSignal: player.commitmentSignal,
    attitudeScore: player.attitudeScore,
    xp: player.xp,
    level: player.level,
    talentBoard: player.talentBoard,
  });
}
