"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle2,
  PlayCircle,
  Lock,
  BookOpen,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLessonData } from "@/hooks/useLessonData";
import { useCourseDetailData } from "@/hooks/useCourseDetailData";
import type { LessonSummary } from "@/hooks/useCourseDetailData";

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

/* ──────────────────────── Sidebar Lesson Item ──────────────────────── */

function SidebarLessonItem({
  lesson,
  courseId,
  isActive,
  number,
  status,
}: {
  lesson: LessonSummary;
  courseId: string;
  isActive: boolean;
  number: string;
  status: "completed" | "current" | "locked";
}) {
  const isClickable = status !== "locked";

  const content = (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
        isActive
          ? "bg-[#D4A843]/10 border border-[#D4A843]/25"
          : isClickable
          ? "hover:bg-white/5"
          : "opacity-40 cursor-not-allowed"
      }`}
    >
      {status === "completed" ? (
        <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
      ) : status === "current" ? (
        <PlayCircle className="size-4 shrink-0 text-[#D4A843]" />
      ) : (
        <Lock className="size-3.5 shrink-0 text-[#475569]" />
      )}
      <div className="flex flex-1 flex-col min-w-0">
        <span
          className={`text-xs font-medium truncate ${
            isActive
              ? "text-[#D4A843]"
              : status === "completed"
              ? "text-white/80"
              : "text-[#475569]"
          }`}
        >
          {number}: {lesson.title}
        </span>
        {lesson.duration > 0 && (
          <span className="text-[10px] text-[#64748B]">
            {lesson.duration}:00
          </span>
        )}
      </div>
    </div>
  );

  if (isClickable) {
    return <Link href={`/academy/${courseId}/${lesson.id}`}>{content}</Link>;
  }

  return content;
}

/* ──────────────────────── Main Page ──────────────────────── */

export default function LessonPlayerPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);

  const { data: lesson, loading: lessonLoading } = useLessonData(lessonId);
  const { data: course, loading: courseLoading } =
    useCourseDetailData(courseId);

  const [isCompleted, setIsCompleted] = useState(false);

  if (lessonLoading || courseLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#D4A843]" />
      </div>
    );
  }

  // Build sidebar lesson list with status from course data
  let foundFirstIncomplete = false;
  const sidebarLessons = course.modules.flatMap((mod, modIdx) =>
    mod.lessons.map((l, lesIdx) => {
      const isFirstIncomplete =
        !foundFirstIncomplete && !l.completed && !l.locked;
      if (isFirstIncomplete) foundFirstIncomplete = true;
      const status = getLessonStatus(l, isFirstIncomplete);
      const number = `${modIdx + 1}.${lesIdx + 1}`;
      return { ...l, status, number };
    })
  );

  const completedCount = sidebarLessons.filter(
    (l) => l.status === "completed"
  ).length;
  const totalCount = sidebarLessons.length;

  // Navigation
  const nextLessonId = lesson.nextLessonId;
  const nextLessonData = nextLessonId
    ? sidebarLessons.find((l) => l.id === nextLessonId)
    : null;
  const nextLessonLocked = nextLessonData
    ? nextLessonData.status === "locked"
    : false;

  // Format duration
  const durationStr =
    lesson.duration > 0 ? `${lesson.duration}:00` : "";

  return (
    <div className="mx-auto max-w-7xl">
      {/* Back link */}
      <Link
        href={`/academy/${courseId}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-[#94A3B8] transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Course
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* ──────── Main Content ──────── */}
        <div className="flex-1 space-y-5">
          {/* Video Player (Mock) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full overflow-hidden rounded-2xl border border-white/8 bg-[#0B1120]"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Dark video area */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0B1120] to-[#1A2332]">
              {/* Grid lines effect */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Play button */}
              <button className="group relative z-10 flex size-20 items-center justify-center rounded-full border-2 border-[#D4A843]/40 bg-[#D4A843]/10 transition-all hover:border-[#D4A843] hover:bg-[#D4A843]/20 hover:shadow-[0_0_40px_rgba(212,168,67,0.3)]">
                <Play className="size-8 text-[#D4A843] transition-transform group-hover:scale-110" />
              </button>
            </div>

            {/* Watermark */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="select-none text-lg font-bold tracking-widest text-white/[0.06] sm:text-2xl">
                TENSAI - 2026-03-10
              </span>
            </div>

            {/* Duration badge */}
            {durationStr && (
              <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white/80">
                {durationStr}
              </div>
            )}
          </motion.div>

          {/* Lesson Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Module tag */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#D4A843]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D4A843]">
                {lesson.moduleTitle}
              </span>
              <span className="text-xs text-[#64748B]">
                Lesson {lesson.id}
              </span>
            </div>

            <h1 className="text-lg font-bold text-white sm:text-xl">
              {lesson.title}
            </h1>

            {lesson.content && (
              <p className="text-sm leading-relaxed text-[#94A3B8]">
                {lesson.content}
              </p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button
              className={`h-11 gap-2 rounded-xl px-6 text-sm font-semibold transition-all ${
                isCompleted
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-[#D4A843] text-[#0B1120] hover:bg-[#F0DCA0]"
              }`}
              onClick={() => setIsCompleted(!isCompleted)}
            >
              {isCompleted ? (
                <>
                  <Check className="size-4" />
                  Sudah Selesai
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Tandai Selesai
                </>
              )}
            </Button>

            {nextLessonId && !nextLessonLocked ? (
              <Button
                variant="outline"
                className="h-11 gap-2 rounded-xl border-white/10 px-6 text-sm font-semibold text-white hover:bg-white/5"
                render={
                  <Link href={`/academy/${courseId}/${nextLessonId}`} />
                }
              >
                Lesson Berikutnya
                <ArrowRight className="size-4" />
              </Button>
            ) : nextLessonId ? (
              <Button
                variant="outline"
                className="h-11 gap-2 rounded-xl border-white/5 px-6 text-sm text-[#475569] cursor-not-allowed"
                disabled
              >
                <Lock className="size-3.5" />
                Lesson Berikutnya Terkunci
              </Button>
            ) : null}
          </motion.div>
        </div>

        {/* ──────── Desktop Sidebar: Lesson Nav ──────── */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="hidden w-72 shrink-0 lg:block"
        >
          <div className="sticky top-24 space-y-3 rounded-2xl border border-white/8 bg-[#1A2332] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              <BookOpen className="size-3.5" />
              Daftar Lesson
            </div>

            <div className="space-y-1">
              {sidebarLessons.map((sl) => (
                <SidebarLessonItem
                  key={sl.id}
                  lesson={sl}
                  courseId={courseId}
                  isActive={sl.id === lesson.id}
                  number={sl.number}
                  status={sl.status}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <div className="border-t border-white/8 pt-3">
              <div className="flex items-center justify-between text-[10px] font-medium">
                <span className="text-[#94A3B8]">Progress</span>
                <span className="text-[#D4A843]">
                  {completedCount}/{totalCount}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#F0DCA0]"
                  style={{
                    width: `${
                      totalCount > 0
                        ? (completedCount / totalCount) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
