"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CourseGame = "All" | "MLBB" | "FF" | "Cross-game";
export type CourseLevel = "All" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type CourseCategory = "All" | "Hard Skill" | "Soft Skill" | "Mental" | "Wellness";

export interface CourseListItem {
  id: string;
  emoji: string;
  title: string;
  game: CourseGame;
  level: CourseLevel;
  category: CourseCategory;
  lessons: number;
  duration: number;
  progress: number | null;
  locked: boolean;
  lockedTier?: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const MOCK_COURSES: CourseListItem[] = [
  {
    id: "jungle-mastery",
    emoji: "\uD83C\uDFAF",
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
    emoji: "\u2694\uFE0F",
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
    emoji: "\uD83D\uDD2B",
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
    emoji: "\uD83D\uDDE3\uFE0F",
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
    emoji: "\uD83E\uDDE0",
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
    emoji: "\uD83D\uDCAA",
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

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAcademyData() {
  return useData<CourseListItem[]>({
    mockData: MOCK_COURSES,
    apiUrl: "/api/courses",
  });
}
