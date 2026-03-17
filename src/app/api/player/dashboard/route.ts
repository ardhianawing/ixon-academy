import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    userData,
    players,
    missions,
    notifications,
    recentSubmissions,
    upcomingEvents,
    reputation,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      select: { namaAsli: true, tier: true, avatarUrl: true },
    }),
    prisma.player.findMany({
      where: { userId: user.id },
      include: { game: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.userMission.findMany({
      where: { userId: user.id, date: today },
      include: { mission: true },
    }),
    prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { sentAt: "desc" },
      take: 10,
    }),
    prisma.evaluationSubmission.findMany({
      where: { userId: user.id },
      orderBy: { submittedAt: "desc" },
      take: 5,
      include: {
        review: {
          select: {
            mechanicalScore: true,
            gameSenseScore: true,
            heroMasteryScore: true,
            teamworkScore: true,
            mentalScore: true,
            feedbackText: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.event.findMany({
      where: { status: "upcoming" },
      orderBy: { startDate: "asc" },
      take: 3,
      include: {
        game: { select: { title: true, slug: true } },
      },
    }),
    prisma.userReputation.findUnique({
      where: { userId: user.id },
      select: { cleanDaysStreak: true, totalScore: true, badges: true },
    }),
  ]);

  const mainPlayer = players[0] ?? null;

  // Calculate XP level from player data
  const xp = mainPlayer?.xp ?? 0;
  const level = mainPlayer?.level ?? 1;
  const xpForNextLevel = level * 500; // 500 XP per level

  // Helper to calculate overall score from 5 rubrics
  function calcOverall(r: { mechanicalScore: number; gameSenseScore: number; heroMasteryScore: number; teamworkScore: number; mentalScore: number }) {
    return Math.round(
      r.mechanicalScore * 0.25 +
      r.gameSenseScore * 0.25 +
      r.heroMasteryScore * 0.20 +
      r.teamworkScore * 0.15 +
      r.mentalScore * 0.15
    );
  }

  // Build radar data from latest review scores
  const latestReview = recentSubmissions.find((s) => s.review)?.review;
  const radarData = latestReview
    ? [
        { stat: "Mechanical", value: latestReview.mechanicalScore },
        { stat: "Game Sense", value: latestReview.gameSenseScore },
        { stat: "Hero Mastery", value: latestReview.heroMasteryScore },
        { stat: "Teamwork", value: latestReview.teamworkScore },
        { stat: "Mental", value: latestReview.mentalScore },
      ]
    : null;

  // Build score trend from reviews (chronological)
  const reviewedSubmissions = recentSubmissions
    .filter((s) => s.review)
    .reverse();
  const scoreTrend = reviewedSubmissions.map((s, i) => ({
    day: `W${i + 1}`,
    score: calcOverall(s.review!),
  }));

  return ok({
    user: {
      name: userData?.namaAsli ?? user.name,
      tier: userData?.tier ?? user.tier,
      avatarUrl: userData?.avatarUrl,
    },
    player: mainPlayer,
    allPlayers: players,
    xp,
    level,
    xpForNextLevel,
    radarData,
    scoreTrend,
    talentScore: mainPlayer?.talentScore ?? 0,
    missions: missions.map((m) => ({
      id: m.id,
      title: m.mission.title,
      description: m.mission.description,
      type: m.mission.type,
      xp: m.mission.xpReward,
      status: m.status,
    })),
    streak: reputation?.cleanDaysStreak ?? 0,
    notifications: notifications.map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      body: n.body,
      isRead: n.isRead,
      sentAt: n.sentAt,
    })),
    unreadNotifications: notifications.filter((n) => !n.isRead).length,
    upcomingEvents: upcomingEvents.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.startDate,
      format: e.format,
      maxParticipants: e.maxParticipants,
      currentParticipants: e.currentParticipants,
      tierRequired: e.tierRequired,
      game: e.game.title,
    })),
    recentSubmissions: recentSubmissions.map((s) => ({
      id: s.id,
      heroPlayed: s.heroPlayed,
      status: s.status,
      submittedAt: s.submittedAt,
      hasReview: !!s.review,
    })),
  });
}
