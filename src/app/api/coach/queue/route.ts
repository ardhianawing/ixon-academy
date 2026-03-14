import { requireRole, ok, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireRole("COACH");
  if (!user) return forbidden();

  const queue = await prisma.evaluationSubmission.findMany({
    where: {
      assignedCoachId: user.id,
      status: { in: ["assigned", "in_review"] },
    },
    include: {
      player: { include: { game: true } },
      user: { select: { id: true, namaAsli: true, avatarUrl: true } },
    },
    orderBy: { assignedAt: "asc" },
  });

  return ok(queue);
}
