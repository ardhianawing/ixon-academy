import { NextRequest } from "next/server";
import { requireAuth, ok, err, unauthorized, notFound } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  if (!user) return unauthorized();

  const { id: quizId } = await params;
  const { answers } = await req.json(); // { [questionId]: selectedIdx }

  if (!answers || typeof answers !== "object") {
    return err("answers harus berupa object { questionId: selectedIdx }");
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true },
  });

  if (!quiz) return notFound("Quiz");

  let correct = 0;
  const results = quiz.questions.map((q) => {
    const selected = answers[q.id];
    const isCorrect = selected === q.correctAnswerIdx;
    if (isCorrect) correct++;
    return {
      questionId: q.id,
      selected,
      correctAnswerIdx: q.correctAnswerIdx,
      explanation: q.explanation,
      isCorrect,
    };
  });

  const score = Math.round((correct / quiz.questions.length) * 100);
  const passed = score >= quiz.passScorePct;

  return ok({ score, passed, passScorePct: quiz.passScorePct, results });
}
