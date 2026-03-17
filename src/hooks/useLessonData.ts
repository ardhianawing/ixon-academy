"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface LessonData {
  id: string;
  title: string;
  type: "video" | "article" | "quiz";
  duration: number;
  completed: boolean;
  courseId: string;
  courseTitle: string;
  moduleId: string;
  moduleTitle: string;
  /** Video URL (only for type "video") */
  videoUrl: string | null;
  /** Rich text / markdown content (for "video" notes or "article" body) */
  content: string | null;
  /** Quiz questions (only for type "quiz") */
  quiz: QuizQuestion[] | null;
  /** Navigation */
  prevLessonId: string | null;
  nextLessonId: string | null;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_LESSON: LessonData = {
  id: "les-1-1",
  title: "Peran Jungler di Meta Saat Ini",
  type: "video",
  duration: 15,
  completed: true,
  courseId: "jungle-mastery",
  courseTitle: "Jungle Mastery: Dari Noob ke Pro",
  moduleId: "mod-1",
  moduleTitle: "Fundamental Jungle",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  content:
    "## Key Takeaways\n\n" +
    "1. **Jungler adalah playmaker utama** — Kamu mengontrol tempo permainan melalui rotasi dan objective.\n\n" +
    "2. **Meta saat ini menekankan early game aggression** — Jungler yang bisa memberikan tekanan di menit 2-4 punya win-rate lebih tinggi.\n\n" +
    "3. **Hero pool minimal 3 hero** — Siapkan 1 assassin, 1 fighter, dan 1 marksman jungle untuk fleksibilitas draft.\n\n" +
    "4. **Komunikasi dengan roamer** — Sinergi jungler-roamer menentukan 70% kesuksesan gank.\n\n" +
    "## Catatan Tambahan\n\n" +
    "Perhatikan mini-map setiap 3-5 detik. Awareness adalah skill paling penting untuk jungler di semua tier.",
  quiz: null,
  prevLessonId: null,
  nextLessonId: "les-1-2",
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLessonData(lessonId: string) {
  return useData<LessonData>({
    mockData: MOCK_LESSON,
    apiUrl: `/api/lessons/${lessonId}`,
  });
}
