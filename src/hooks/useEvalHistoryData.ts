"use client";

import { useData } from "./useData";

export interface Submission {
  id: string;
  hero: string;
  game: string;
  date: string;
  status: "completed" | "in-review" | "queued";
  coach: string | null;
}

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: "rev-001",
    hero: "Hayabusa",
    game: "MLBB",
    date: "8 Mar 2026",
    status: "completed",
    coach: "Coach Alex",
  },
  {
    id: "rev-002",
    hero: "Ling",
    game: "MLBB",
    date: "5 Mar 2026",
    status: "in-review",
    coach: "Coach Mira",
  },
  {
    id: "rev-003",
    hero: "Fanny",
    game: "MLBB",
    date: "1 Mar 2026",
    status: "queued",
    coach: null,
  },
];

export function useEvalHistoryData() {
  return useData<Submission[]>({
    mockData: MOCK_SUBMISSIONS,
    apiUrl: "/api/evaluations/my-submissions",
  });
}
