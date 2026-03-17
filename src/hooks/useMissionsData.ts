"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Mission {
  id: string;
  title: string;
  xp: number;
  status: "completed" | "in-progress" | "not-started";
  progress: string;
  type: string;
}

export interface MissionsPageData {
  missions: Mission[];
  streak: number;
  weeklyChallenge: {
    title: string;
    total: number;
    done: number;
  };
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_MISSIONS: MissionsPageData = {
  missions: [
    {
      id: "1",
      title: "Login Harian",
      xp: 10,
      status: "completed",
      progress: "1/1",
      type: "login",
    },
    {
      id: "2",
      title: "Selesaikan 1 Lesson",
      xp: 25,
      status: "in-progress",
      progress: "0/1",
      type: "lesson",
    },
    {
      id: "3",
      title: "Reply di Forum",
      xp: 15,
      status: "not-started",
      progress: "0/1",
      type: "community",
    },
  ],
  streak: 7,
  weeklyChallenge: {
    title: "Selesaikan 5 Lesson Minggu Ini",
    total: 5,
    done: 2,
  },
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMissionsData() {
  return useData<MissionsPageData>({
    mockData: MOCK_MISSIONS,
    apiUrl: "/api/missions/daily",
  });
}
