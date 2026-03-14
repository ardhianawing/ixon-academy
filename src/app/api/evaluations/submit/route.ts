import { NextRequest } from "next/server";
import { requireAuth, ok, err, unauthorized, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  if (user.tier === "FREE") {
    return forbidden();
  }

  const body = await req.json();
  const { playerId, gameplayUrl, gameplayDesc, heroPlayed, matchContext } = body;

  if (!playerId || !gameplayUrl || !heroPlayed || !matchContext) {
    return err("playerId, gameplayUrl, heroPlayed, dan matchContext wajib diisi");
  }

  // Verify player belongs to user
  const player = await prisma.player.findFirst({
    where: { id: playerId, userId: user.id },
  });
  if (!player) return err("Player tidak ditemukan atau bukan milik kamu", 404);

  // Find available coach (least busy, isAvailable)
  const coach = await prisma.coachProfile.findFirst({
    where: { isAvailable: true },
    orderBy: { totalReviews: "asc" },
  });

  const submission = await prisma.evaluationSubmission.create({
    data: {
      playerId,
      userId: user.id,
      gameplayUrl,
      gameplayDesc: gameplayDesc ?? null,
      heroPlayed,
      matchContext,
      assignedCoachId: coach?.userId ?? null,
      assignedAt: coach ? new Date() : null,
      status: coach ? "assigned" : "queued",
    },
  });

  return ok(submission, 201);
}
