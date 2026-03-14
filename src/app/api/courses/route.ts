import { NextRequest } from "next/server";
import { requireAuth, ok, unauthorized } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { searchParams } = new URL(req.url);
  const game = searchParams.get("game");
  const level = searchParams.get("level");
  const category = searchParams.get("category");

  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
      ...(game && { gameId: game }),
      ...(level && { level: level as never }),
      ...(category && { category: category as never }),
    },
    include: {
      game: { select: { id: true, title: true, slug: true, iconUrl: true } },
      _count: { select: { modules: true } },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  // Attach user progress
  const progressList = await prisma.userCourseProgress.findMany({
    where: {
      userId: user.id,
      courseId: { in: courses.map((c) => c.id) },
    },
  });

  const progressMap = new Map(progressList.map((p) => [p.courseId, p]));

  const result = courses.map((course) => ({
    ...course,
    progress: progressMap.get(course.id) ?? null,
  }));

  return ok(result);
}
