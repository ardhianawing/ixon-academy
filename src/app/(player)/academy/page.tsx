"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Lock,
  GraduationCap,
  Filter,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameBadge } from "@/components/ui/GameBadge";

/* ──────────────────────── Types ──────────────────────── */

type Game = "All" | "MLBB" | "FF" | "Cross-game";
type Level = "All" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Category = "All" | "Hard Skill" | "Soft Skill" | "Mental" | "Wellness";

interface Course {
  id: string;
  emoji: string;
  title: string;
  game: Game;
  level: Level;
  category: Category;
  lessons: number;
  duration: number;
  progress: number | null;
  locked: boolean;
  lockedTier?: string;
}

/* ──────────────────────── Mock Data ──────────────────────── */

const courses: Course[] = [
  {
    id: "jungle-mastery",
    emoji: "\ud83c\udfaf",
    title: "Jungle Mastery: Dari Noob ke Pro",
    game: "MLBB",
    level: "Intermediate",
    category: "Hard Skill",
    lessons: 12,
    duration: 180,
    progress: 40,
    locked: false,
  },
  {
    id: "gold-lane-domination",
    emoji: "\u2694\ufe0f",
    title: "Gold Lane Domination",
    game: "MLBB",
    level: "Advanced",
    category: "Hard Skill",
    lessons: 10,
    duration: 150,
    progress: null,
    locked: true,
    lockedTier: "Silver",
  },
  {
    id: "ff-battle-royale",
    emoji: "\ud83d\udd2b",
    title: "Free Fire Battle Royale Strategy",
    game: "FF",
    level: "Beginner",
    category: "Hard Skill",
    lessons: 8,
    duration: 120,
    progress: null,
    locked: false,
  },
  {
    id: "shotcalling-communication",
    emoji: "\ud83d\udde3\ufe0f",
    title: "Shotcalling & Team Communication",
    game: "Cross-game",
    level: "Intermediate",
    category: "Soft Skill",
    lessons: 6,
    duration: 90,
    progress: null,
    locked: false,
  },
  {
    id: "tilt-management",
    emoji: "\ud83e\udde0",
    title: "Tilt Management & Mental Fortitude",
    game: "Cross-game",
    level: "Intermediate",
    category: "Mental",
    lessons: 8,
    duration: 100,
    progress: null,
    locked: false,
  },
  {
    id: "gamer-wellness",
    emoji: "\ud83d\udcaa",
    title: "Gamer Wellness: Body & Mind",
    game: "Cross-game",
    level: "Beginner",
    category: "Wellness",
    lessons: 5,
    duration: 60,
    progress: null,
    locked: false,
  },
];

const games: Game[] = ["All", "MLBB", "FF", "Cross-game"];
const levels: Level[] = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];
const categories: Category[] = ["All", "Hard Skill", "Soft Skill", "Mental", "Wellness"];

/* ──────────────────────── Level Color Map ──────────────────────── */

const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-400",
  Intermediate: "bg-blue-500/15 text-blue-400",
  Advanced: "bg-orange-500/15 text-orange-400",
  Expert: "bg-red-500/15 text-red-400",
};

/* ──────────────────────── Filter Pill ──────────────────────── */

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-[#D4A843] text-[#0B1120] shadow-[0_0_12px_rgba(212,168,67,0.3)]"
          : "bg-[#1A2332] text-[#94A3B8] hover:bg-[#243044] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

/* ──────────────────────── Filter Select (Mobile) ──────────────────────── */

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="relative flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-[#0B1120] px-3 py-2.5 pr-8 text-sm text-white outline-none focus:border-[#D4A843]/50"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {label}: {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
    </div>
  );
}

/* ──────────────────────── Course Card ──────────────────────── */

/* ──────────────────────── Course Card (Desktop grid) ──────────────────────── */

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" as const }}
    >
      <Link
        href={course.locked ? "#" : `/academy/${course.id}`}
        className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
          course.locked
            ? "cursor-not-allowed border-white/5 bg-[#1A2332]/60 opacity-70"
            : "border-white/8 bg-[#1A2332] hover:border-[#D4A843]/30 hover:shadow-[0_0_30px_-5px_rgba(212,168,67,0.12)]"
        }`}
      >
        {/* Thumbnail area */}
        <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-[#0B1120] to-[#1A2332]">
          <span className="text-5xl">{course.emoji}</span>
          {course.locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-1.5">
                <Lock className="size-6 text-[#94A3B8]" />
                <span className="text-xs font-medium text-[#94A3B8]">
                  Butuh {course.lockedTier}+
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {course.game !== "Cross-game" ? (
              <GameBadge game={course.game} size="sm" />
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-semibold text-purple-400">
                <span className="size-1.5 rounded-full bg-purple-400" />
                Cross-game
              </span>
            )}
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                levelColors[course.level] ?? "bg-white/10 text-white/60"
              }`}
            >
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold leading-snug text-white line-clamp-2">
            {course.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-[#64748B]">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="size-3.5" />
              {course.lessons} lessons
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {course.duration} min
            </span>
          </div>

          {/* Progress */}
          {course.progress !== null && course.progress > 0 && (
            <div className="mt-auto pt-2">
              <div className="flex items-center justify-between text-[10px] font-medium">
                <span className="text-[#94A3B8]">Progress</span>
                <span className="text-[#D4A843]">{course.progress}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#F0DCA0] transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}

          {course.progress === null && !course.locked && (
            <div className="mt-auto pt-2">
              <span className="text-[10px] font-medium text-[#64748B]">
                Belum dimulai
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────── Course Row (Mobile compact list) ──────────────────────── */

function CourseRow({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" as const }}
    >
      <Link
        href={course.locked ? "#" : `/academy/${course.id}`}
        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
          course.locked
            ? "cursor-not-allowed border-white/5 bg-[#1A2332]/60 opacity-60"
            : "border-white/[0.06] bg-[#1A2332] active:bg-[#243044]"
        }`}
      >
        {/* Emoji */}
        <div className={`shrink-0 size-12 rounded-xl bg-gradient-to-br from-[#0B1120] to-[#1A2332] flex items-center justify-center text-2xl ${course.locked ? "relative" : ""}`}>
          {course.locked ? (
            <Lock className="size-5 text-[#94A3B8]" />
          ) : (
            course.emoji
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">{course.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            {course.game !== "Cross-game" ? (
              <GameBadge game={course.game} size="sm" />
            ) : (
              <span className="inline-flex items-center rounded-full bg-purple-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-purple-400">Cross</span>
            )}
            <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${levelColors[course.level] ?? "bg-white/10 text-white/60"}`}>
              {course.level}
            </span>
            <span className="text-[10px] text-[#64748B]">{course.lessons} lessons</span>
          </div>
        </div>

        {/* Right: progress or status */}
        <div className="shrink-0 text-right">
          {course.progress !== null && course.progress > 0 ? (
            <span className="text-sm font-bold text-[#D4A843]">{course.progress}%</span>
          ) : course.locked ? (
            <span className="text-[10px] text-[#94A3B8]">{course.lockedTier}+</span>
          ) : (
            <ChevronRight className="size-4 text-white/20" />
          )}
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────── Main Page ──────────────────────── */

export default function AcademyPage() {
  const [gameFilter, setGameFilter] = useState<Game>("All");
  const [levelFilter, setLevelFilter] = useState<Level>("All");
  const [categoryFilter, setCategoryFilter] = useState<Category>("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (gameFilter !== "All" && c.game !== gameFilter) return false;
      if (levelFilter !== "All" && c.level !== levelFilter) return false;
      if (categoryFilter !== "All" && c.category !== categoryFilter) return false;
      return true;
    });
  }, [gameFilter, levelFilter, categoryFilter]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#D4A843]/10">
            <GraduationCap className="size-5 text-[#D4A843]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Academy
            </h1>
            <p className="text-sm text-[#94A3B8]">
              Kurikulum terstruktur dari coach profesional
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-white/8 bg-[#1A2332]/60 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          <Filter className="size-3.5" />
          Filter
        </div>

        {/* Mobile: dropdowns */}
        <div className="flex gap-2 sm:hidden">
          <FilterSelect label="Game" value={gameFilter} options={games} onChange={setGameFilter} />
          <FilterSelect label="Level" value={levelFilter} options={levels} onChange={setLevelFilter} />
          <FilterSelect label="Kategori" value={categoryFilter} options={categories} onChange={setCategoryFilter} />
        </div>

        {/* Desktop: pills */}
        <div className="hidden sm:block space-y-3">
          {/* Game filter */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#64748B]">Game</span>
            <div className="flex flex-wrap gap-2">
              {games.map((g) => (
                <FilterPill key={g} label={g} active={gameFilter === g} onClick={() => setGameFilter(g)} />
              ))}
            </div>
          </div>

          {/* Level filter */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#64748B]">Level</span>
            <div className="flex flex-wrap gap-2">
              {levels.map((l) => (
                <FilterPill key={l} label={l} active={levelFilter === l} onClick={() => setLevelFilter(l)} />
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#64748B]">Kategori</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <FilterPill key={c} label={c} active={categoryFilter === c} onClick={() => setCategoryFilter(c)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#94A3B8]">
          Menampilkan{" "}
          <span className="font-semibold text-white">{filtered.length}</span>{" "}
          kursus
        </p>
        {(gameFilter !== "All" || levelFilter !== "All" || categoryFilter !== "All") && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#D4A843] hover:text-[#F0DCA0]"
            onClick={() => {
              setGameFilter("All");
              setLevelFilter("All");
              setCategoryFilter("All");
            }}
          >
            Reset Filter
          </Button>
        )}
      </div>

      {/* Course List (mobile) / Grid (desktop) */}
      {filtered.length > 0 ? (
        <>
          {/* Mobile: compact list */}
          <div className="space-y-2 sm:hidden">
            {filtered.map((course, i) => (
              <CourseRow key={course.id} course={course} index={i} />
            ))}
          </div>
          {/* Desktop: card grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#1A2332]/40 py-20">
          <BookOpen className="size-12 text-[#2A3A50]" />
          <p className="mt-4 text-sm text-[#64748B]">
            Tidak ada kursus yang sesuai filter
          </p>
        </div>
      )}
    </div>
  );
}
