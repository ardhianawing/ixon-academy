"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  PlayCircle,
  Lock,
  Trophy,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GameBadge } from "@/components/ui/GameBadge";
import {
  useCourseDetailData,
  type LessonSummary,
} from "@/hooks/useCourseDetailData";

/* ──────────────────────── Level Color Map ──────────────────────── */

const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-400",
  Intermediate: "bg-blue-500/15 text-blue-400",
  Advanced: "bg-orange-500/15 text-orange-400",
  Expert: "bg-red-500/15 text-red-400",
};

/* ──────────────────────── Helpers ──────────────────────── */

function getLessonStatus(
  lesson: LessonSummary,
  isFirstIncomplete: boolean
): "completed" | "current" | "locked" {
  if (lesson.completed) return "completed";
  if (lesson.locked) return "locked";
  if (isFirstIncomplete) return "current";
  return "locked";
}

/* ──────────────────────── Lesson Status Icon ──────────────────────── */

function LessonStatusIcon({
  status,
}: {
  status: "completed" | "current" | "locked";
}) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />;
    case "current":
      return <PlayCircle className="size-5 shrink-0 text-[#D4A843]" />;
    case "locked":
      return <Lock className="size-4 shrink-0 text-[#475569]" />;
  }
}

/* ──────────────────────── Main Page ──────────────────────── */

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const { data: course, loading } = useCourseDetailData(courseId);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#D4A843]" />
      </div>
    );
  }

  // Track which lesson is the first incomplete one across all modules
  let foundFirstIncomplete = false;
  const modulesWithStatus = course.modules.map((mod, modIdx) => {
    const lessonsWithStatus = mod.lessons.map((lesson, lesIdx) => {
      const isFirstIncomplete =
        !foundFirstIncomplete && !lesson.completed && !lesson.locked;
      if (isFirstIncomplete) foundFirstIncomplete = true;
      const status = getLessonStatus(lesson, isFirstIncomplete);
      const number = `${modIdx + 1}.${lesIdx + 1}`;
      const durationStr =
        lesson.duration > 0 ? `${lesson.duration}:00` : "";
      return { ...lesson, status, number, durationStr };
    });
    const isLocked = lessonsWithStatus.every((l) => l.locked);
    return { ...mod, lessons: lessonsWithStatus, isLocked };
  });

  const allLessons = modulesWithStatus.flatMap((m) => m.lessons);
  const completedLessons = allLessons.filter(
    (l) => l.status === "completed"
  ).length;

  const currentLesson = allLessons.find((l) => l.status === "current");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back link */}
      <Link
        href="/academy"
        className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Academy
      </Link>

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-white/8 bg-[#1A2332]"
      >
        {/* Top banner */}
        <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-[#0B1120] via-[#1A2332] to-[#0B1120]">
          <span className="text-6xl">{course.emoji}</span>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_80%,rgba(212,168,67,0.08),transparent)]" />
        </div>

        {/* Info */}
        <div className="space-y-4 p-5 sm:p-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <GameBadge game={course.game} size="sm" />
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                levelColors[course.level] ?? "bg-white/10 text-white/60"
              }`}
            >
              {course.level}
            </span>
          </div>

          <h1 className="text-xl font-bold text-white sm:text-2xl">
            {course.title}
          </h1>

          <p className="text-sm leading-relaxed text-[#94A3B8]">
            {course.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#94A3B8]">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="size-4" />
              {course.lessons} lessons
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {course.duration} menit
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Trophy className="size-4 text-[#D4A843]" />
              {completedLessons}/{course.lessons} selesai
            </span>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-[#94A3B8]">Progress Keseluruhan</span>
              <span className="text-[#D4A843]">{course.progress}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#F0DCA0]"
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut" as const,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Module List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-3"
      >
        <h2 className="text-base font-bold text-white">Modul & Lessons</h2>

        <Accordion defaultValue={[modulesWithStatus[0]?.id ?? ""]}>
          {modulesWithStatus.map((mod, modIdx) => (
            <AccordionItem
              key={mod.id}
              value={mod.id}
              className="overflow-hidden rounded-xl border border-white/8 bg-[#1A2332] mb-3"
              disabled={mod.isLocked}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex flex-1 items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg text-xs font-bold ${
                      mod.isLocked
                        ? "bg-white/5 text-[#475569]"
                        : "bg-[#D4A843]/10 text-[#D4A843]"
                    }`}
                  >
                    {modIdx + 1}
                  </div>
                  <div className="text-left">
                    <span
                      className={`text-sm font-semibold ${
                        mod.isLocked ? "text-[#475569]" : "text-white"
                      }`}
                    >
                      {mod.title}
                    </span>
                    <span className="ml-2 text-xs text-[#64748B]">
                      {mod.lessons.length} lessons
                    </span>
                  </div>
                  {mod.isLocked && (
                    <Lock className="ml-auto size-4 text-[#475569]" />
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-3">
                <div className="space-y-1">
                  {mod.lessons.map((lesson) => {
                    const isClickable =
                      lesson.status === "completed" ||
                      lesson.status === "current";

                    const inner = (
                      <div
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                          lesson.status === "current"
                            ? "bg-[#D4A843]/8 border border-[#D4A843]/20"
                            : lesson.status === "completed"
                            ? "hover:bg-white/5"
                            : "opacity-50"
                        }`}
                      >
                        <LessonStatusIcon status={lesson.status} />
                        <div className="flex flex-1 flex-col">
                          <span
                            className={`text-sm font-medium ${
                              lesson.status === "current"
                                ? "text-[#D4A843]"
                                : lesson.status === "completed"
                                ? "text-white"
                                : "text-[#475569]"
                            }`}
                          >
                            {lesson.number}: {lesson.title}
                          </span>
                          {lesson.type === "quiz" && (
                            <span className="text-[10px] text-[#64748B]">
                              Quiz
                            </span>
                          )}
                        </div>
                        {lesson.durationStr && (
                          <span className="text-xs text-[#64748B]">
                            {lesson.durationStr}
                          </span>
                        )}
                      </div>
                    );

                    if (isClickable) {
                      return (
                        <Link
                          key={lesson.id}
                          href={`/academy/${course.id}/${lesson.id}`}
                        >
                          {inner}
                        </Link>
                      );
                    }

                    return (
                      <div key={lesson.id} className="cursor-not-allowed">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* CTA */}
      <div className="flex justify-center pb-6">
        {currentLesson && (
          <Button
            className="h-11 gap-2 rounded-xl bg-[#D4A843] px-8 text-sm font-semibold text-[#0B1120] hover:bg-[#F0DCA0] transition-colors"
            render={
              <Link href={`/academy/${course.id}/${currentLesson.id}`} />
            }
          >
            <PlayCircle className="size-4" />
            Lanjutkan Belajar
          </Button>
        )}
      </div>
    </div>
  );
}
