import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const pathways = await prisma.careerPathway.findMany({
    where: { isPublished: true },
    include: {
      _count: { select: { enrollments: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  const enrollments = await prisma.careerEnrollment.findMany({
    where: { userId: user.id },
  });
  const enrolledMap = new Map(enrollments.map((e) => [e.pathwayId, e]));

  const result = pathways.map((p) => ({
    ...p,
    enrollment: enrolledMap.get(p.id) ?? null,
  }));

  return ok(result);
}
