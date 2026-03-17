"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CoachReviewSubmission {
  player: string;
  hero: string;
  game: string;
  matchContext: string;
  url: string;
  description: string;
}

export interface CoachReviewData {
  submission: CoachReviewSubmission;
  rubricLabels: string[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_COACH_REVIEW: CoachReviewData = {
  submission: {
    player: "TENSAI",
    hero: "Hayabusa",
    game: "MLBB",
    matchContext: "Ranked",
    url: "https://youtube.com/watch?v=example123",
    description:
      "Tolong review gameplay jungler saya, terutama di bagian early game pathing dan timing retribution saat objective.",
  },
  rubricLabels: [
    "Mechanical Skill",
    "Game Sense",
    "Hero Mastery",
    "Teamwork",
    "Mental",
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCoachReviewData(submissionId: string) {
  return useData<CoachReviewData>({
    mockData: MOCK_COACH_REVIEW,
    apiUrl: `/api/coach/review/${submissionId}`,
  });
}
