"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ParentChild {
  id: string;
  nickname: string;
  realName: string;
  game: string;
  tier: string;
  level: number;
  avatar: string;
}

export interface WeeklyHour {
  day: string;
  hours: number;
}

export interface CourseProgressItem {
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export interface TalentTrendItem {
  week: string;
  score: number;
}

export interface ParentDashboardData {
  child: ParentChild;
  weeklyHours: WeeklyHour[];
  courseProgress: CourseProgressItem[];
  talentTrend: TalentTrendItem[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_PARENT_DASHBOARD: ParentDashboardData = {
  child: {
    id: "child-001",
    nickname: "AceHunter",
    realName: "Andi Pratama",
    game: "MLBB",
    tier: "Free",
    level: 5,
    avatar: "AP",
  },
  weeklyHours: [
    { day: "Sen", hours: 1.5 },
    { day: "Sel", hours: 2.0 },
    { day: "Rab", hours: 1.0 },
    { day: "Kam", hours: 2.5 },
    { day: "Jum", hours: 1.5 },
    { day: "Sab", hours: 3.0 },
    { day: "Min", hours: 2.0 },
  ],
  courseProgress: [
    {
      title: "Dasar-Dasar Jungling",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
    },
    {
      title: "Map Awareness 101",
      progress: 40,
      totalLessons: 10,
      completedLessons: 4,
    },
  ],
  talentTrend: [
    { week: "Minggu 1", score: 58 },
    { week: "Minggu 2", score: 63 },
    { week: "Minggu 3", score: 68 },
    { week: "Minggu 4", score: 72 },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useParentDashboardData() {
  return useData<ParentDashboardData>({
    mockData: MOCK_PARENT_DASHBOARD,
    apiUrl: "/api/parent/dashboard",
  });
}
