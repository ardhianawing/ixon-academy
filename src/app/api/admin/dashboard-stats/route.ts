import { requireRole, ok, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await requireRole("ADMIN");
  if (!user) return forbidden();

  const [
    totalUsers,
    totalPlayers,
    totalSubmissions,
    pendingReports,
    activeSubscriptions,
    totalCourses,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.player.count(),
    prisma.evaluationSubmission.count(),
    prisma.communityReport.count({ where: { status: "pending" } }),
    prisma.subscription.count({ where: { status: "active" } }),
    prisma.course.count({ where: { isPublished: true } }),
  ]);

  const usersByTier = await prisma.user.groupBy({
    by: ["tier"],
    _count: true,
  });

  const submissionsByStatus = await prisma.evaluationSubmission.groupBy({
    by: ["status"],
    _count: true,
  });

  return ok({
    totalUsers,
    totalPlayers,
    totalSubmissions,
    pendingReports,
    activeSubscriptions,
    totalCourses,
    usersByTier: Object.fromEntries(usersByTier.map((u) => [u.tier, u._count])),
    submissionsByStatus: Object.fromEntries(
      submissionsByStatus.map((s) => [s.status, s._count])
    ),
  });
}
