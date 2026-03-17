"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export type EventStatus = "upcoming" | "live" | "completed";

export interface EventItem {
  id: string;
  title: string;
  status: EventStatus;
  date: string;
  format: string;
  game: string;
  minTier: string;
  maxSlots: number;
  filledSlots: number;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_EVENTS: EventItem[] = [
  {
    id: "weekly-scrim-12",
    title: "IXON Weekly Scrim #12",
    status: "upcoming",
    date: "15 Mar 2026",
    format: "5v5",
    game: "MLBB",
    minTier: "SILVER",
    maxSlots: 32,
    filledSlots: 24,
  },
  {
    id: "rookie-tournament-s1",
    title: "IXON Rookie Tournament S1",
    status: "upcoming",
    date: "22 Mar 2026",
    format: "Tournament 5v5",
    game: "MLBB",
    minTier: "GOLD",
    maxSlots: 16,
    filledSlots: 12,
  },
  {
    id: "solo-showdown-1",
    title: "1v1 Solo Showdown",
    status: "completed",
    date: "1 Mar 2026",
    format: "1v1",
    game: "MLBB",
    minTier: "FREE",
    maxSlots: 32,
    filledSlots: 32,
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useEventsData() {
  return useData<EventItem[]>({
    mockData: MOCK_EVENTS,
    apiUrl: "/api/events",
  });
}
