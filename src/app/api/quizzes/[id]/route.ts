import { requireAuth, ok, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          questionText: true,
          options: true,
          sortOrder: true,
          // correctAnswerIdx is NOT included
        },
      },
      lesson: { select: { id: true, title: true } },
    },
  });

  if (!quiz) return notFound("Quiz");

  return ok(quiz);
}
