import { NextRequest } from "next/server";
import { requireAuth, ok, err, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id: submissionId } = await params;
  const { clarity, relevance, actionability, satisfaction, comment } = await req.json();

  if (!clarity || !relevance || !actionability || !satisfaction) {
    return err("clarity, relevance, actionability, satisfaction wajib diisi (1-5)");
  }

  const submission = await prisma.evaluationSubmission.findFirst({
    where: { id: submissionId, userId: user.id },
    include: { review: true },
  });

  if (!submission) return notFound("Submission");
  if (!submission.review) return err("Review belum tersedia");

  const existing = await prisma.evaluationRating.findUnique({
    where: { reviewId: submission.review.id },
  });
  if (existing) return err("Sudah pernah memberikan rating untuk review ini");

  const rating = await prisma.evaluationRating.create({
    data: {
      reviewId: submission.review.id,
      playerId: submission.playerId,
      clarity,
      relevance,
      actionability,
      satisfaction,
      comment: comment ?? null,
    },
  });

  // Update coach avg rating
  const avgRatings = await prisma.evaluationRating.aggregate({
    where: { review: { coachId: submission.review.coachId } },
    _avg: { satisfaction: true },
    _count: true,
  });

  await prisma.coachProfile.update({
    where: { userId: submission.review.coachId },
    data: {
      avgRating: avgRatings._avg.satisfaction ?? 0,
      totalReviews: avgRatings._count,
    },
  });

  return ok(rating, 201);
}
