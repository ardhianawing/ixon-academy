"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AdminAnalyticsData {
  funnelSteps: { label: string; value: number; color: string }[];
  retentionData: { day: string; rate: number }[];
  popularCourses: { title: string; enrollments: number; completionRate: number }[];
  communityStats: {
    postsPerDay: number;
    postsPerDayTrend: string;
    toxicityRate: number;
    toxicityThreshold: string;
    activeThreads: number;
    activeThreadsNote: string;
  };
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_ADMIN_ANALYTICS: AdminAnalyticsData = {
  funnelSteps: [
    { label: "Guest", value: 2000, color: "#64748b" },
    { label: "Free", value: 847, color: "#3b82f6" },
    { label: "Silver", value: 245, color: "#94a3b8" },
    { label: "Gold", value: 89, color: "#D4A843" },
    { label: "Platinum", value: 12, color: "#22d3ee" },
  ],
  retentionData: [
    { day: "D0", rate: 100 },
    { day: "D1", rate: 72 },
    { day: "D3", rate: 58 },
    { day: "D7", rate: 45 },
    { day: "D14", rate: 34 },
    { day: "D30", rate: 28 },
    { day: "D60", rate: 22 },
    { day: "D90", rate: 18 },
  ],
  popularCourses: [
    { title: "Mastering Jungler Role", enrollments: 234, completionRate: 78 },
    { title: "Gold to Mythic: Midlane Guide", enrollments: 189, completionRate: 65 },
    { title: "Map Awareness & Rotation", enrollments: 156, completionRate: 82 },
    { title: "Draft Pick Strategy", enrollments: 132, completionRate: 71 },
    { title: "EXP Lane Domination", enrollments: 98, completionRate: 59 },
  ],
  communityStats: {
    postsPerDay: 28,
    postsPerDayTrend: "+12% dari minggu lalu",
    toxicityRate: 2.1,
    toxicityThreshold: "Di bawah threshold 5%",
    activeThreads: 47,
    activeThreadsNote: "12 dengan 10+ replies",
  },
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAdminAnalyticsData() {
  return useData<AdminAnalyticsData>({
    mockData: MOCK_ADMIN_ANALYTICS,
    apiUrl: "/api/admin/analytics",
  });
}
