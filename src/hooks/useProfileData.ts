"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProfileData {
  player: {
    nickname: string;
    rank: string;
    roleIngame: string;
    tier: string;
    game: string;
    level: number;
    xp: number;
    talentScore: number;
  };
  radarData: { stat: string; value: number }[];
  talentBreakdown: { label: string; score: number; color: string }[];
  reviews: {
    id: number;
    hero: string;
    rating: number;
    date: string;
    coach: string;
    breakdown: { aspect: string; score: number }[];
  }[];
  courses: {
    id: number;
    title: string;
    progress: number;
    lessonsCompleted: number;
    totalLessons: number;
  }[];
  communityStats: {
    postCount: number;
    replyCount: number;
    reputation: number;
    recentPosts: { title: string; likes: number; replies: number }[];
  };
  tournaments: {
    id: number;
    name: string;
    placement: number;
    date: string;
    teamName: string;
  }[];
  badges: {
    id: number;
    emoji: string;
    name: string;
    description: string;
    earned: boolean;
    earnedDate?: string;
  }[];
}

// ─── Mock Data (extracted from profile/page.tsx) ─────────────────────────────

const MOCK_PROFILE: ProfileData = {
  player: {
    nickname: "TENSAI",
    rank: "Mythic",
    roleIngame: "Jungler",
    tier: "GOLD",
    game: "MLBB",
    level: 14,
    xp: 2450,
    talentScore: 78,
  },
  radarData: [
    { stat: "Mechanical", value: 80 },
    { stat: "Game Sense", value: 65 },
    { stat: "Hero Mastery", value: 75 },
    { stat: "Teamwork", value: 60 },
    { stat: "Mental", value: 70 },
  ],
  talentBreakdown: [
    { label: "Skill", score: 82, color: "from-blue-500 to-blue-400" },
    { label: "Mindset", score: 74, color: "from-purple-500 to-purple-400" },
    { label: "Commitment", score: 78, color: "from-emerald-500 to-emerald-400" },
  ],
  reviews: [
    {
      id: 1,
      hero: "Hayabusa",
      rating: 4,
      date: "5 Mar 2026",
      coach: "Coach Alex",
      breakdown: [
        { aspect: "Mechanics", score: 85 },
        { aspect: "Decision Making", score: 75 },
        { aspect: "Map Awareness", score: 80 },
      ],
    },
    {
      id: 2,
      hero: "Ling",
      rating: 3.5,
      date: "28 Feb 2026",
      coach: "Coach Riku",
      breakdown: [
        { aspect: "Mechanics", score: 78 },
        { aspect: "Decision Making", score: 65 },
        { aspect: "Map Awareness", score: 70 },
      ],
    },
  ],
  courses: [
    {
      id: 1,
      title: "Jungle Pathing Masterclass",
      progress: 65,
      lessonsCompleted: 8,
      totalLessons: 12,
    },
    {
      id: 2,
      title: "Mental Fortitude for Gamers",
      progress: 30,
      lessonsCompleted: 2,
      totalLessons: 8,
    },
  ],
  communityStats: {
    postCount: 12,
    replyCount: 45,
    reputation: 220,
    recentPosts: [
      { title: "Tips Jungler Season 35 - Sharing Pengalaman", likes: 34, replies: 12 },
      { title: "Highlight: Comeback Epic di Ranked", likes: 67, replies: 15 },
      { title: "Cara Rotate Jungler di Late Game", likes: 22, replies: 8 },
    ],
  },
  tournaments: [
    {
      id: 1,
      name: "1v1 Showdown IXON S1",
      placement: 3,
      date: "20 Feb 2026",
      teamName: "Solo",
    },
  ],
  badges: [
    {
      id: 1,
      emoji: "\uD83C\uDF93",
      name: "First Course",
      description: "Selesaikan kursus pertama",
      earned: true,
      earnedDate: "Jan 2026",
    },
    {
      id: 2,
      emoji: "\uD83D\uDD25",
      name: "7-Day Streak",
      description: "Login 7 hari berturut-turut",
      earned: true,
      earnedDate: "Feb 2026",
    },
    {
      id: 3,
      emoji: "\u2B50",
      name: "Clean Player",
      description: "Tidak ada report selama 30 hari",
      earned: true,
      earnedDate: "Feb 2026",
    },
    {
      id: 4,
      emoji: "\uD83C\uDFC6",
      name: "Tournament Top 3",
      description: "Finish top 3 di turnamen",
      earned: true,
      earnedDate: "Feb 2026",
    },
    {
      id: 5,
      emoji: "\uD83D\uDCAC",
      name: "Forum Active",
      description: "Buat 10 post di forum",
      earned: true,
      earnedDate: "Mar 2026",
    },
    {
      id: 6,
      emoji: "\uD83C\uDFAF",
      name: "Sharpshooter",
      description: "Skor 90+ di quiz",
      earned: false,
    },
    {
      id: 7,
      emoji: "\uD83D\uDC51",
      name: "Platinum Member",
      description: "Upgrade ke Platinum",
      earned: false,
    },
    {
      id: 8,
      emoji: "\uD83C\uDF1F",
      name: "Talent 90+",
      description: "Capai Talent Score 90+",
      earned: false,
    },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useProfileData() {
  return useData<ProfileData>({
    mockData: MOCK_PROFILE,
    apiUrl: "/api/player/profile",
  });
}
