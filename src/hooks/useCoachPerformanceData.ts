"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CQSBreakdown {
  label: string;
  score: number;
  weight: number;
  weighted: number;
}

export interface RatingDistEntry {
  rating: string;
  count: number;
}

export interface CoachPerformanceStat {
  label: string;
  value: string;
}

export interface CoachPerformanceData {
  cqsScore: number;
  breakdown: CQSBreakdown[];
  ratingDistribution: RatingDistEntry[];
  stats: CoachPerformanceStat[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_COACH_PERFORMANCE: CoachPerformanceData = {
  cqsScore: 4.2,
  breakdown: [
    { label: "Player Rating", score: 4.5, weight: 0.5, weighted: 2.25 },
    { label: "Rubrik Completeness", score: 4.0, weight: 0.3, weighted: 1.2 },
    { label: "Audit Score", score: 3.8, weight: 0.2, weighted: 0.76 },
  ],
  ratingDistribution: [
    { rating: "5 Star", count: 22 },
    { rating: "4 Star", count: 15 },
    { rating: "3 Star", count: 7 },
    { rating: "2 Star", count: 2 },
    { rating: "1 Star", count: 1 },
  ],
  stats: [
    { label: "Total Reviews", value: "47" },
    { label: "Avg Review Time", value: "22 min" },
    { label: "Active Players", value: "31" },
    { label: "This Month", value: "12" },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCoachPerformanceData() {
  return useData<CoachPerformanceData>({
    mockData: MOCK_COACH_PERFORMANCE,
    apiUrl: "/api/coach/performance",
  });
}
