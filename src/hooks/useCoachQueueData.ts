"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CoachQueueStat {
  label: string;
  value: number;
}

export interface CoachQueueItem {
  id: string;
  player: string;
  game: string;
  hero: string;
  timeAgo: string;
  slaSeconds: number;
  urgent: boolean;
}

export interface CoachQueueData {
  stats: CoachQueueStat[];
  queue: CoachQueueItem[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_COACH_QUEUE: CoachQueueData = {
  stats: [
    { label: "Total Queue", value: 5 },
    { label: "In Review", value: 1 },
    { label: "Completed Today", value: 3 },
  ],
  queue: [
    {
      id: "sub-001",
      player: "TENSAI",
      game: "MLBB",
      hero: "Hayabusa",
      timeAgo: "2 jam lalu",
      slaSeconds: 78300,
      urgent: false,
    },
    {
      id: "sub-002",
      player: "IXONReaper",
      game: "MLBB",
      hero: "Chou",
      timeAgo: "5 jam lalu",
      slaSeconds: 66600,
      urgent: false,
    },
    {
      id: "sub-003",
      player: "ShadowFF",
      game: "FF",
      hero: "Chrono",
      timeAgo: "1 hari lalu",
      slaSeconds: 8100,
      urgent: true,
    },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCoachQueueData() {
  return useData<CoachQueueData>({
    mockData: MOCK_COACH_QUEUE,
    apiUrl: "/api/coach/queue",
  });
}
