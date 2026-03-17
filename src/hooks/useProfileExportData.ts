"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProfileSkill {
  name: string;
  score: number;
  color: string;
}

export interface ProfileBadge {
  name: string;
  iconName: string;
}

export interface ProfileExportData {
  avatar: string;
  username: string;
  rank: string;
  role: string;
  game: string;
  talentScore: number;
  skills: ProfileSkill[];
  badges: ProfileBadge[];
  stats: {
    matchesReviewed: number;
    coursesCompleted: number;
  };
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_PROFILE: ProfileExportData = {
  avatar: "T",
  username: "TENSAI",
  rank: "Mythical Glory",
  role: "Jungler",
  game: "MLBB",
  talentScore: 78,
  skills: [
    { name: "Mechanical", score: 80, color: "bg-blue-500" },
    { name: "Game Sense", score: 65, color: "bg-purple-500" },
  ],
  badges: [
    { name: "Review Master", iconName: "Star" },
    { name: "Course Scholar", iconName: "BookOpen" },
    { name: "Community MVP", iconName: "Trophy" },
    { name: "Streak 30 Hari", iconName: "Swords" },
  ],
  stats: {
    matchesReviewed: 47,
    coursesCompleted: 12,
  },
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useProfileExportData() {
  return useData<ProfileExportData>({
    mockData: MOCK_PROFILE,
    apiUrl: "/api/player/profile/export",
  });
}
