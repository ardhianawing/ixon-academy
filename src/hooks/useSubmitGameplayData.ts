"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SubmitGameplayData {
  userTier: string;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_SUBMIT_DATA: SubmitGameplayData = {
  userTier: "GOLD",
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSubmitGameplayData() {
  return useData<SubmitGameplayData>({
    mockData: MOCK_SUBMIT_DATA,
    apiUrl: "/api/player/tier",
  });
}
