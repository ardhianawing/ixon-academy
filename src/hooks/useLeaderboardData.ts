"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Player {
  id: string;
  nickname: string;
  initials: string;
  tier: string;
  game: string;
  role: string;
  talentScore: number;
  xp: number;
  reputation: number;
  isCurrentUser: boolean;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_LEADERBOARD: Player[] = [
  {
    id: "1",
    nickname: "PhoenixBlade",
    initials: "PB",
    tier: "PLATINUM",
    game: "MLBB",
    role: "Gold Laner",
    talentScore: 87,
    xp: 12450,
    reputation: 340,
    isCurrentUser: false,
  },
  {
    id: "2",
    nickname: "ShadowStrike",
    initials: "SS",
    tier: "GOLD",
    game: "MLBB",
    role: "Jungler",
    talentScore: 82,
    xp: 10200,
    reputation: 280,
    isCurrentUser: false,
  },
  {
    id: "3",
    nickname: "DragonFury",
    initials: "DF",
    tier: "GOLD",
    game: "FF",
    role: "Rusher",
    talentScore: 79,
    xp: 9800,
    reputation: 260,
    isCurrentUser: false,
  },
  {
    id: "4",
    nickname: "TENSAI",
    initials: "TE",
    tier: "GOLD",
    game: "MLBB",
    role: "Jungler",
    talentScore: 78,
    xp: 8500,
    reputation: 220,
    isCurrentUser: true,
  },
  {
    id: "5",
    nickname: "NightHawk",
    initials: "NH",
    tier: "SILVER",
    game: "MLBB",
    role: "Mid Laner",
    talentScore: 74,
    xp: 7200,
    reputation: 190,
    isCurrentUser: false,
  },
  {
    id: "6",
    nickname: "BlazeFire",
    initials: "BF",
    tier: "SILVER",
    game: "FF",
    role: "Sniper",
    talentScore: 71,
    xp: 6800,
    reputation: 170,
    isCurrentUser: false,
  },
  {
    id: "7",
    nickname: "StormRider",
    initials: "SR",
    tier: "SILVER",
    game: "MLBB",
    role: "Roamer",
    talentScore: 68,
    xp: 5400,
    reputation: 150,
    isCurrentUser: false,
  },
  {
    id: "8",
    nickname: "CrystalEdge",
    initials: "CE",
    tier: "FREE",
    game: "MLBB",
    role: "EXP Laner",
    talentScore: 62,
    xp: 3200,
    reputation: 90,
    isCurrentUser: false,
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLeaderboardData() {
  return useData<Player[]>({
    mockData: MOCK_LEADERBOARD,
    apiUrl: "/api/leaderboard",
  });
}
