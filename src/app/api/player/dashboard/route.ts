import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [players, missions, notifications, recentSubmissions] = await Promise.all([
    prisma.player.findMany({
      where: { userId: user.id },
      include: { game: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.userMission.findMany({
      where: {
        userId: user.id,
        date: today,
      },
      include: { mission: true },
    }),
    prisma.notification.findMany({
      where: { userId: user.id, isRead: false },
      orderBy: { sentAt: "desc" },
      take: 5,
    }),
    prisma.evaluationSubmission.findMany({
      where: { userId: user.id },
      orderBy: { submittedAt: "desc" },
      take: 3,
      include: { review: true },
    }),
  ]);

  const mainPlayer = players[0] ?? null;

  return ok({
    player: mainPlayer,
    allPlayers: players,
    missions,
    unreadNotifications: notifications.length,
    notifications,
    recentSubmissions,
  });
}
