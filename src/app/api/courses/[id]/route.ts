import { requireAuth, ok, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id, isPublished: true },
    include: {
      game: true,
      modules: {
        orderBy: { sortOrder: "asc" },
        include: {
          lessons: {
            orderBy: { sortOrder: "asc" },
            select: {
              id: true,
              title: true,
              description: true,
              videoDurationSec: true,
              sortOrder: true,
              isFreePreview: true,
            },
          },
        },
      },
    },
  });

  if (!course) return notFound("Course");

  const progress = await prisma.userCourseProgress.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: id } },
  });

  return ok({ ...course, progress });
}
