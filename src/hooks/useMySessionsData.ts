"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MentoringSession {
  id: string;
  mentorNickname: string;
  mentorInitial: string;
  mentorColor: string;
  sessionType: string;
  emoji: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  price: string;
  notes?: string;
  rating?: number;
  review?: string;
}

export interface MySessionsData {
  upcomingSessions: MentoringSession[];
  pastSessions: MentoringSession[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_MY_SESSIONS: MySessionsData = {
  upcomingSessions: [
    {
      id: "s1",
      mentorNickname: "RRQ Lemon",
      mentorInitial: "RL",
      mentorColor: "from-red-500 to-orange-500",
      sessionType: "1-on-1 Review",
      emoji: "\ud83c\udfaf",
      date: "15 Mar 2026",
      time: "14:00 WIB",
      duration: "30 menit",
      status: "confirmed",
      price: "Rp 150.000",
      notes: "Review gameplay ranked match terakhir",
    },
  ],
  pastSessions: [
    {
      id: "s2",
      mentorNickname: "RRQ Lemon",
      mentorInitial: "RL",
      mentorColor: "from-red-500 to-orange-500",
      sessionType: "Group Session",
      emoji: "\ud83d\udc65",
      date: "8 Mar 2026",
      time: "19:00 WIB",
      duration: "60 menit",
      status: "completed",
      price: "Rp 75.000",
      rating: 5,
      review:
        "Sesi yang sangat bermanfaat! Lemon menjelaskan rotasi jungler dengan sangat detail. Sekarang saya lebih paham kapan harus gank dan kapan farming.",
    },
    {
      id: "s3",
      mentorNickname: "EVOS Wannn",
      mentorInitial: "EW",
      mentorColor: "from-blue-500 to-cyan-500",
      sessionType: "1-on-1 Review",
      emoji: "\ud83c\udfaf",
      date: "1 Mar 2026",
      time: "10:00 WIB",
      duration: "30 menit",
      status: "completed",
      price: "Rp 150.000",
      rating: 4,
      review:
        "Coaching gold lane yang bagus. Wannn memberikan tips farming pattern yang efektif. Mungkin bisa lebih detail di bagian team fight positioning.",
    },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMySessionsData() {
  return useData<MySessionsData>({
    mockData: MOCK_MY_SESSIONS,
    apiUrl: "/api/mentorship/my-sessions",
  });
}
