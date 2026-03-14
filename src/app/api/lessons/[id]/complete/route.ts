import { NextRequest } from "next/server";
import { requireAuth, ok, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id: lessonId } = await params;
  const { watchedSeconds = 0 } = await req.json().catch(() => ({}));

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });

  if (!lesson) return notFound("Lesson");

  // Upsert lesson progress
  await prisma.userLessonProgress.upsert({
    where: { userId_lessonId: { userId: user.id, lessonId } },
    update: {
      isCompleted: true,
      completedAt: new Date(),
      watchedSeconds,
    },
    create: {
      userId: user.id,
      lessonId,
      isCompleted: true,
      completedAt: new Date(),
      watchedSeconds,
    },
  });

  const courseId = lesson.module.courseId;

  // Count completed lessons in this course
  const totalLessons = await prisma.lesson.count({
    where: { module: { courseId } },
  });

  const completedLessons = await prisma.userLessonProgress.count({
    where: {
      userId: user.id,
      isCompleted: true,
      lesson: { module: { courseId } },
    },
  });

  const isCompleted = completedLessons >= totalLessons;

  // Upsert course progress
  await prisma.userCourseProgress.upsert({
    where: { userId_courseId: { userId: user.id, courseId } },
    update: {
      lessonsCompleted: completedLessons,
      status: isCompleted ? "completed" : "in_progress",
      ...(isCompleted && { completedAt: new Date() }),
    },
    create: {
      userId: user.id,
      courseId,
      lessonsCompleted: completedLessons,
      status: isCompleted ? "completed" : "in_progress",
      ...(isCompleted && { completedAt: new Date() }),
    },
  });

  return ok({ completed: true, courseCompleted: isCompleted, completedLessons, totalLessons });
}
