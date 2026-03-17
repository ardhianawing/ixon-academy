"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LessonSummary {
  id: string;
  title: string;
  type: "video" | "article" | "quiz";
  duration: number;
  completed: boolean;
  locked: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: LessonSummary[];
}

export interface CourseDetail {
  id: string;
  emoji: string;
  title: string;
  description: string;
  game: string;
  level: string;
  category: string;
  lessons: number;
  duration: number;
  progress: number;
  instructor: {
    name: string;
    title: string;
    avatarUrl: string | null;
  };
  modules: CourseModule[];
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_COURSE_DETAIL: CourseDetail = {
  id: "jungle-mastery",
  emoji: "\uD83C\uDFAF",
  title: "Jungle Mastery: Dari Noob ke Pro",
  description:
    "Pelajari strategi jungle dari dasar hingga level kompetitif. Termasuk pathing, invade timing, objective control, dan hero pool management.",
  game: "MLBB",
  level: "Intermediate",
  category: "Hard Skill",
  lessons: 12,
  duration: 180,
  progress: 40,
  instructor: {
    name: "Coach Luminaire",
    title: "Ex-Pro Jungler, MPL Season 8",
    avatarUrl: null,
  },
  modules: [
    {
      id: "mod-1",
      title: "Fundamental Jungle",
      description: "Dasar-dasar peran jungler dan mindset yang benar",
      order: 1,
      lessons: [
        { id: "les-1-1", title: "Peran Jungler di Meta Saat Ini", type: "video", duration: 15, completed: true, locked: false },
        { id: "les-1-2", title: "Jungle Pathing Dasar", type: "video", duration: 18, completed: true, locked: false },
        { id: "les-1-3", title: "Farming Efficiency & Timing", type: "article", duration: 10, completed: true, locked: false },
        { id: "les-1-4", title: "Quiz: Fundamental Jungle", type: "quiz", duration: 5, completed: false, locked: false },
      ],
    },
    {
      id: "mod-2",
      title: "Ganking & Map Pressure",
      description: "Teknik gank efektif dan rotasi yang memberikan tekanan",
      order: 2,
      lessons: [
        { id: "les-2-1", title: "Kapan Harus Gank vs Farm", type: "video", duration: 20, completed: false, locked: false },
        { id: "les-2-2", title: "Lane Priority & Gank Setup", type: "video", duration: 15, completed: false, locked: false },
        { id: "les-2-3", title: "Counter-Gank & Invade Patterns", type: "article", duration: 12, completed: false, locked: false },
        { id: "les-2-4", title: "Quiz: Ganking Strategy", type: "quiz", duration: 5, completed: false, locked: false },
      ],
    },
    {
      id: "mod-3",
      title: "Objective Control & Late Game",
      description: "Mengamankan Lord, Turtle, dan decision-making di late game",
      order: 3,
      lessons: [
        { id: "les-3-1", title: "Turtle & Lord Timing", type: "video", duration: 18, completed: false, locked: true },
        { id: "les-3-2", title: "Smite Battle & Secure Techniques", type: "video", duration: 15, completed: false, locked: true },
        { id: "les-3-3", title: "Late Game Teamfight Positioning", type: "article", duration: 12, completed: false, locked: true },
      ],
    },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCourseDetailData(courseId: string) {
  return useData<CourseDetail>({
    mockData: MOCK_COURSE_DETAIL,
    apiUrl: `/api/courses/${courseId}`,
  });
}
