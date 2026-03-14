import { requireAuth, ok, err, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id: missionId } = await params;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const userMission = await prisma.userMission.findFirst({
    where: { userId: user.id, missionId, date: today },
    include: { mission: true },
  });

  if (!userMission) return notFound("Mission");
  if (userMission.status === "completed") return err("Mission sudah diselesaikan hari ini");

  await prisma.userMission.update({
    where: { id: userMission.id },
    data: { status: "completed", completedAt: new Date() },
  });

  // Award XP to player
  const player = await prisma.player.findFirst({ where: { userId: user.id } });
  if (player) {
    await prisma.player.update({
      where: { id: player.id },
      data: { xp: { increment: userMission.mission.xpReward } },
    });
  }

  return ok({ completed: true, xpEarned: userMission.mission.xpReward });
}
