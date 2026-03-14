import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get or assign daily missions
  let missions = await prisma.userMission.findMany({
    where: { userId: user.id, date: today },
    include: { mission: true },
  });

  // If no missions today, assign 3 random active missions
  if (missions.length === 0) {
    const available = await prisma.dailyMission.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { id: "asc" },
    });

    if (available.length > 0) {
      await prisma.userMission.createMany({
        data: available.map((m) => ({
          userId: user.id,
          missionId: m.id,
          date: today,
          status: "assigned",
        })),
        skipDuplicates: true,
      });

      missions = await prisma.userMission.findMany({
        where: { userId: user.id, date: today },
        include: { mission: true },
      });
    }
  }

  return ok(missions);
}
