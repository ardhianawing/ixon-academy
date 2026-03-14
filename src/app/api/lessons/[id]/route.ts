import { requireAuth, ok, unauthorized, notFound, forbidden } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      module: { include: { course: true } },
      quiz: { include: { questions: { orderBy: { sortOrder: "asc" } } } },
    },
  });

  if (!lesson) return notFound("Lesson");

  // Gate: non-free lesson requires active subscription
  if (!lesson.isFreePreview && user.tier === "FREE") {
    return forbidden();
  }

  const userProgress = await prisma.userLessonProgress.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId: id } },
  });

  // Redact correct answers from quiz questions
  const lessonData = {
    ...lesson,
    quiz: lesson.quiz
      ? {
          ...lesson.quiz,
          questions: lesson.quiz.questions.map(({ correctAnswerIdx: _, ...q }) => q),
        }
      : null,
    progress: userProgress,
  };

  return ok(lessonData);
}
