"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChildInfo {
  nickname: string;
  realName: string;
  game: string;
  tier: string;
  level: number;
  avatar: string;
  joinDate: string;
}

export interface WeeklyReportInfo {
  text: string;
  period: string;
}

export interface DetailedStat {
  label: string;
  value: string;
  unit: string;
  subtitle?: string;
}

export interface TimeManagementEntry {
  name: string;
  value: number;
  color: string;
}

export interface CareerInfo {
  interest: string;
  preferredRole: string;
  strengths: string[];
  areasToImprove: string[];
  recommendation: string;
}

export interface ParentChildData {
  child: ChildInfo;
  weeklyReport: WeeklyReportInfo;
  detailedStats: DetailedStat[];
  timeManagement: TimeManagementEntry[];
  careerInfo: CareerInfo;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_PARENT_CHILD: ParentChildData = {
  child: {
    nickname: "AceHunter",
    realName: "Andi Pratama",
    game: "MLBB",
    tier: "Free",
    level: 5,
    avatar: "AP",
    joinDate: "Januari 2026",
  },
  weeklyReport: {
    text: "Minggu ini, Andi menyelesaikan 3 lessons, mengerjakan 2 quiz (rata-rata 85%), dan aktif di komunitas dengan 0 report.",
    period: "3 - 9 Maret 2026",
  },
  detailedStats: [
    { label: "Lessons Diselesaikan", value: "3", unit: "lessons" },
    { label: "Quiz Dikerjakan", value: "2", unit: "quiz", subtitle: "Rata-rata: 85%" },
    { label: "Total Jam Belajar", value: "13.5", unit: "jam" },
    { label: "Post di Komunitas", value: "4", unit: "post", subtitle: "0 report" },
    { label: "Talent Score", value: "72", unit: "/100", subtitle: "+4 dari minggu lalu" },
    { label: "Attitude Score", value: "92", unit: "/100", subtitle: "Sangat Baik" },
  ],
  timeManagement: [
    { name: "Belajar Kursus", value: 45, color: "#D4A843" },
    { name: "Quiz & Latihan", value: 20, color: "#3B82F6" },
    { name: "Komunitas & Forum", value: 15, color: "#8B5CF6" },
    { name: "Menonton Replay", value: 12, color: "#10B981" },
    { name: "Mentoring", value: 8, color: "#F59E0B" },
  ],
  careerInfo: {
    interest: "Pro Player / Content Creator",
    preferredRole: "Jungler",
    strengths: ["Mekanik Hero", "Farming Efficiency", "Adaptasi Meta"],
    areasToImprove: ["Map Awareness", "Komunikasi Tim", "Late Game Decision"],
    recommendation:
      "Andi menunjukkan potensi yang baik sebagai Jungler. Disarankan untuk mengikuti kursus 'Advanced Rotation' dan sesi mentoring dengan coach jungler untuk memperdalam pemahaman rotasi dan timing objektif.",
  },
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useParentChildData(childId: string) {
  return useData<ParentChildData>({
    mockData: MOCK_PARENT_CHILD,
    apiUrl: `/api/parent/child/${childId}`,
  });
}
