"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DashboardData {
  user: {
    name: string;
    tier: string;
    avatarUrl: string | null;
  };
  player: {
    nickname: string;
    rank: string;
    roleIngame: string;
    talentScore: number;
    xp: number;
    level: number;
    game: { title: string; slug: string };
  } | null;
  xp: number;
  level: number;
  xpForNextLevel: number;
  talentScore: number;
  radarData: { stat: string; value: number }[] | null;
  scoreTrend: { day: string; score: number }[];
  missions: {
    id: string;
    title: string;
    description: string;
    type: string;
    xp: number;
    status: string;
  }[];
  streak: number;
  notifications: {
    id: string;
    type: string;
    title: string;
    body: string;
    isRead: boolean;
    sentAt: string;
  }[];
  unreadNotifications: number;
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    format: string;
    maxParticipants: number;
    currentParticipants: number;
    tierRequired: string;
    game: string;
  }[];
  recentSubmissions: {
    id: string;
    heroPlayed: string;
    status: string;
    submittedAt: string;
    hasReview: boolean;
  }[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_DASHBOARD: DashboardData = {
  user: {
    name: "TENSAI",
    tier: "GOLD",
    avatarUrl: null,
  },
  player: {
    nickname: "TENSAI",
    rank: "Mythic",
    roleIngame: "Jungler",
    talentScore: 78,
    xp: 2450,
    level: 14,
    game: { title: "Mobile Legends", slug: "mlbb" },
  },
  xp: 2450,
  level: 14,
  xpForNextLevel: 3000,
  talentScore: 78,
  radarData: [
    { stat: "Mechanical", value: 80 },
    { stat: "Game Sense", value: 65 },
    { stat: "Hero Mastery", value: 75 },
    { stat: "Teamwork", value: 60 },
    { stat: "Mental", value: 70 },
  ],
  scoreTrend: [
    { day: "W1", score: 62 },
    { day: "W2", score: 65 },
    { day: "W3", score: 68 },
    { day: "W4", score: 72 },
    { day: "W5", score: 75 },
    { day: "W6", score: 78 },
  ],
  missions: [
    { id: "1", title: "Login Harian", description: "Login ke IXON Academy", type: "login", xp: 10, status: "completed" },
    { id: "2", title: "Selesaikan 1 Lesson", description: "Pelajari 1 lesson", type: "lesson", xp: 25, status: "assigned" },
    { id: "3", title: "Reply di Forum", description: "Balas 1 post di forum", type: "community", xp: 15, status: "assigned" },
  ],
  streak: 7,
  notifications: [
    { id: "1", type: "review", title: "Review Baru", body: "Coach Alex review gameplay #12 kamu", isRead: false, sentAt: new Date(Date.now() - 2 * 3600_000).toISOString() },
    { id: "2", type: "level_up", title: "Level Up!", body: "Kamu naik ke Level 14!", isRead: false, sentAt: new Date(Date.now() - 5 * 3600_000).toISOString() },
    { id: "3", type: "mission", title: "Misi Selesai", body: "Misi 'Login Harian' tercapai", isRead: true, sentAt: new Date(Date.now() - 6 * 3600_000).toISOString() },
    { id: "4", type: "quiz", title: "Quiz Selesai", body: "Quiz 'Jungle Basics': 85%", isRead: true, sentAt: new Date(Date.now() - 24 * 3600_000).toISOString() },
  ],
  unreadNotifications: 2,
  upcomingEvents: [
    { id: "1", title: "IXON Weekly Scrim #12", date: "2026-03-15T10:00:00Z", format: "5v5", maxParticipants: 32, currentParticipants: 24, tierRequired: "SILVER", game: "Mobile Legends" },
    { id: "2", title: "IXON Rookie Tournament S1", date: "2026-03-22T10:00:00Z", format: "Tournament", maxParticipants: 16, currentParticipants: 12, tierRequired: "GOLD", game: "Mobile Legends" },
  ],
  recentSubmissions: [],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useDashboardData() {
  return useData<DashboardData>({
    mockData: MOCK_DASHBOARD,
    apiUrl: "/api/player/dashboard",
  });
}
