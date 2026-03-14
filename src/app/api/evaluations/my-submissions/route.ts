import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const submissions = await prisma.evaluationSubmission.findMany({
    where: { userId: user.id },
    include: {
      player: { include: { game: true } },
      review: {
        include: { rating: true },
      },
    },
    orderBy: { submittedAt: "desc" },
  });

  return ok(submissions);
}
