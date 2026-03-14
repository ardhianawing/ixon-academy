import { NextRequest } from "next/server";
import { requireRole, ok, err, forbidden, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  const user = await requireRole("COACH");
  if (!user) return forbidden();

  const { submissionId } = await params;
  const body = await req.json();

  const {
    mechanicalScore,
    gameSenseScore,
    heroMasteryScore,
    teamworkScore,
    mentalScore,
    feedbackText,
    improvementPlan,
    reviewDurationMin,
  } = body;

  if (
    !mechanicalScore || !gameSenseScore || !heroMasteryScore ||
    !teamworkScore || !mentalScore || !feedbackText || !improvementPlan
  ) {
    return err("Semua field rubrik wajib diisi");
  }

  const submission = await prisma.evaluationSubmission.findFirst({
    where: { id: submissionId, assignedCoachId: user.id },
  });

  if (!submission) return notFound("Submission");

  const existing = await prisma.evaluationReview.findUnique({
    where: { submissionId },
  });
  if (existing) return err("Review sudah pernah dikirim untuk submission ini");

  const wordCount = feedbackText.trim().split(/\s+/).length;

  const [review] = await prisma.$transaction([
    prisma.evaluationReview.create({
      data: {
        submissionId,
        coachId: user.id,
        mechanicalScore,
        gameSenseScore,
        heroMasteryScore,
        teamworkScore,
        mentalScore,
        feedbackText,
        improvementPlan,
        reviewDurationMin: reviewDurationMin ?? 0,
        wordCount,
        status: "submitted",
      },
    }),
    prisma.evaluationSubmission.update({
      where: { id: submissionId },
      data: { status: "completed", completedAt: new Date() },
    }),
    // Credit coach wallet: 50k per review
    prisma.coachWallet.upsert({
      where: { userId: user.id },
      update: {
        balance: { increment: 50000 },
        totalEarned: { increment: 50000 },
      },
      create: {
        userId: user.id,
        balance: 50000,
        totalEarned: 50000,
      },
    }),
  ]);

  return ok(review, 201);
}
