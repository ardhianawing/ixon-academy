"use client";

import { useParams } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GameBadge } from "@/components/ui/GameBadge";

/* ──────────────────────── Types ──────────────────────── */

interface Lesson {
  id: string;
  number: string;
  title: string;
  duration: string;
  status: "completed" | "current" | "locked";
  type: "video" | "quiz";
}

interface Module {
  id: string;
  title: string;
  locked: boolean;
  lessons: Lesson[];
}

interface CourseDetail {
  id: string;
  emoji: string;
  title: string;
  description: string;
  game: string;
  level: string;
  lessons: number;
  duration: number;
  progress: number;
  modules: Module[];
}

/* ──────────────────────── Mock Data ──────────────────────── */

const courseData: Record<string, CourseDetail> = {
  "jungle-mastery": {
    id: "jungle-mastery",
    emoji: "\ud83c\udfaf",
    title: "Jungle Mastery: Dari Noob ke Pro",
    description:
      "Pelajari seni jungling di Mobile Legends dari dasar hingga tingkat lanjut. Kurikulum ini mencakup pathing, objective control, ganking timing, dan teknik advanced yang digunakan oleh jungler profesional di MDL.",
    game: "MLBB",
    level: "Intermediate",
    lessons: 12,
    duration: 180,
    progress: 40,
    modules: [
      {
        id: "mod-1",
        title: "Fundamental",
        locked: false,
        lessons: [
          {
            id: "lesson-1-1",
            number: "1.1",
            title: "Pengenalan Role Jungler",
            duration: "8:30",
            status: "completed",
            type: "video",
          },
          {
            id: "lesson-1-2",
            number: "1.2",
            title: "Pathing Dasar",
            duration: "12:15",
            status: "completed",
            type: "video",
          },
          {
            id: "lesson-1-3",
            number: "1.3",
            title: "Timing Objective",
            duration: "10:45",
            status: "current",
            type: "video",
          },
          {
            id: "lesson-1-4",
            number: "1.4",
            title: "Quiz Modul 1",
            duration: "",
            status: "locked",
            type: "quiz",
          },
        ],
      },
      {
        id: "mod-2",
        title: "Intermediate Jungle",
        locked: true,
        lessons: [
          {
            id: "lesson-2-1",
            number: "2.1",
            title: "Counter Jungling",
            duration: "11:20",
            status: "locked",
            type: "video",
          },
          {
            id: "lesson-2-2",
            number: "2.2",
            title: "Invade Strategy",
            duration: "9:45",
            status: "locked",
            type: "video",
          },
          {
            id: "lesson-2-3",
            number: "2.3",
            title: "Ganking Pattern",
            duration: "13:00",
            status: "locked",
            type: "video",
          },
          {
            id: "lesson-2-4",
            number: "2.4",
            title: "Quiz Modul 2",
            duration: "",
            status: "locked",
            type: "quiz",
          },
        ],
      },
      {
        id: "mod-3",
        title: "Advanced Techniques",
        locked: true,
        lessons: [
          {
            id: "lesson-3-1",
            number: "3.1",
            title: "Retribution Timing Sempurna",
            duration: "14:30",
            status: "locked",
            type: "video",
          },
          {
            id: "lesson-3-2",
            number: "3.2",
            title: "Draft & Hero Pool Management",
            duration: "16:00",
            status: "locked",
            type: "video",
          },
          {
            id: "lesson-3-3",
            number: "3.3",
            title: "Late Game Macro Decision",
            duration: "12:10",
            status: "locked",
            type: "video",
          },
          {
            id: "lesson-3-4",
            number: "3.4",
            title: "Final Exam",
            duration: "",
            status: "locked",
            type: "quiz",
          },
        ],
      },
    ],
  },
};

/* ──────────────────────── Level Color Map ──────────────────────── */

const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-400",
  Intermediate: "bg-blue-500/15 text-blue-400",
  Advanced: "bg-orange-500/15 text-orange-400",
  Expert: "bg-red-500/15 text-red-400",
};

/* ──────────────────────── Lesson Status Icon ──────────────────────── */

function LessonStatusIcon({ status }: { status: Lesson["status"] }) {
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

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  // Fallback to jungle-mastery for any courseId (mock)
  const course = courseData[courseId] ?? courseData["jungle-mastery"]!;

  const completedLessons = course.modules
    .flatMap((m) => m.lessons)
    .filter((l) => l.status === "completed").length;

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
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
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

        <Accordion defaultValue={[course.modules[0]?.id ?? ""]}>
          {course.modules.map((mod, modIdx) => (
            <AccordionItem
              key={mod.id}
              value={mod.id}
              className="overflow-hidden rounded-xl border border-white/8 bg-[#1A2332] mb-3"
              disabled={mod.locked}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex flex-1 items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg text-xs font-bold ${
                      mod.locked
                        ? "bg-white/5 text-[#475569]"
                        : "bg-[#D4A843]/10 text-[#D4A843]"
                    }`}
                  >
                    {modIdx + 1}
                  </div>
                  <div className="text-left">
                    <span
                      className={`text-sm font-semibold ${
                        mod.locked ? "text-[#475569]" : "text-white"
                      }`}
                    >
                      {mod.title}
                    </span>
                    <span className="ml-2 text-xs text-[#64748B]">
                      {mod.lessons.length} lessons
                    </span>
                  </div>
                  {mod.locked && (
                    <Lock className="ml-auto size-4 text-[#475569]" />
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-3">
                <div className="space-y-1">
                  {mod.lessons.map((lesson) => {
                    const isClickable =
                      lesson.status === "completed" || lesson.status === "current";

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
                            <span className="text-[10px] text-[#64748B]">Quiz</span>
                          )}
                        </div>
                        {lesson.duration && (
                          <span className="text-xs text-[#64748B]">
                            {lesson.duration}
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
        {(() => {
          const currentLesson = course.modules
            .flatMap((m) => m.lessons)
            .find((l) => l.status === "current");
          if (!currentLesson) return null;
          return (
            <Button
              className="h-11 gap-2 rounded-xl bg-[#D4A843] px-8 text-sm font-semibold text-[#0B1120] hover:bg-[#F0DCA0] transition-colors"
              render={
                <Link href={`/academy/${course.id}/${currentLesson.id}`} />
              }
            >
              <PlayCircle className="size-4" />
              Lanjutkan Belajar
            </Button>
          );
        })()}
      </div>
    </div>
  );
}
