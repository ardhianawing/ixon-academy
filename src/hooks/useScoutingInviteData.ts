"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface InvitePlayerProfile {
  id: string;
  nickname: string;
  avatar: string;
  game: string;
  rank: string;
  role: string;
  talentScore: number;
  skill: number;
  mindset: number;
  commitment: number;
}

export interface ScoutingInviteData {
  player: InvitePlayerProfile | null;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const playersData: Record<string, InvitePlayerProfile> = {
  "phoenix-blade": {
    id: "phoenix-blade",
    nickname: "PhoenixBlade",
    avatar: "PB",
    game: "MLBB",
    rank: "Mythical Honor",
    role: "Gold Laner",
    talentScore: 87,
    skill: 90,
    mindset: 85,
    commitment: 82,
  },
  tensai: {
    id: "tensai",
    nickname: "TENSAI",
    avatar: "TS",
    game: "MLBB",
    rank: "Mythical Glory",
    role: "Jungler",
    talentScore: 78,
    skill: 82,
    mindset: 75,
    commitment: 72,
  },
  "ixon-reaper": {
    id: "ixon-reaper",
    nickname: "IXONReaper",
    avatar: "IR",
    game: "MLBB",
    rank: "Mythic",
    role: "EXP Laner",
    talentScore: 72,
    skill: 70,
    mindset: 78,
    commitment: 68,
  },
  "shadow-ff": {
    id: "shadow-ff",
    nickname: "ShadowFF",
    avatar: "SF",
    game: "FF",
    rank: "Grandmaster",
    role: "Rusher",
    talentScore: 65,
    skill: 60,
    mindset: 70,
    commitment: 65,
  },
  "ace-hunter": {
    id: "ace-hunter",
    nickname: "AceHunter",
    avatar: "AH",
    game: "MLBB",
    rank: "Legend",
    role: "Roamer",
    talentScore: 45,
    skill: 40,
    mindset: 55,
    commitment: 42,
  },
};

function getMockInviteData(playerId: string): ScoutingInviteData {
  return {
    player: playersData[playerId] ?? null,
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useScoutingInviteData(playerId: string) {
  return useData<ScoutingInviteData>({
    mockData: getMockInviteData(playerId),
    apiUrl: `/api/scouting/invite/${playerId}`,
  });
}
