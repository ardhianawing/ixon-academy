"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ScoutingPlayer {
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
  shortlisted: boolean;
}

export interface ScoutingData {
  players: ScoutingPlayer[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_SCOUTING: ScoutingData = {
  players: [
    {
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
      shortlisted: true,
    },
    {
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
      shortlisted: false,
    },
    {
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
      shortlisted: false,
    },
    {
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
      shortlisted: false,
    },
    {
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
      shortlisted: false,
    },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useScoutingData() {
  return useData<ScoutingData>({
    mockData: MOCK_SCOUTING,
    apiUrl: "/api/scouting/talent-board",
  });
}
