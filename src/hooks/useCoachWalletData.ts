"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WalletTransaction {
  id: number;
  type: "review" | "bonus" | "withdrawal";
  label: string;
  amount: number;
  date: string;
  status: string;
}

export interface MonthlyEarning {
  month: string;
  earning: number;
}

export interface CoachWalletData {
  balance: number;
  transactions: WalletTransaction[];
  monthlyEarnings: MonthlyEarning[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_COACH_WALLET: CoachWalletData = {
  balance: 2350000,
  transactions: [
    {
      id: 1,
      type: "review",
      label: "Review #045 - TENSAI (Hayabusa)",
      amount: 75000,
      date: "8 Mar 2026",
      status: "completed",
    },
    {
      id: 2,
      type: "review",
      label: "Review #044 - IXONReaper (Chou)",
      amount: 75000,
      date: "7 Mar 2026",
      status: "completed",
    },
    {
      id: 3,
      type: "bonus",
      label: "Bonus CQS > 4.0 (Februari)",
      amount: 200000,
      date: "1 Mar 2026",
      status: "completed",
    },
    {
      id: 4,
      type: "withdrawal",
      label: "Withdrawal ke BCA ****4521",
      amount: -1500000,
      date: "28 Feb 2026",
      status: "completed",
    },
    {
      id: 5,
      type: "review",
      label: "Review #043 - ShadowFF (Chrono)",
      amount: 75000,
      date: "27 Feb 2026",
      status: "completed",
    },
  ],
  monthlyEarnings: [
    { month: "Okt", earning: 1200000 },
    { month: "Nov", earning: 1450000 },
    { month: "Des", earning: 1800000 },
    { month: "Jan", earning: 2100000 },
    { month: "Feb", earning: 1950000 },
    { month: "Mar", earning: 2350000 },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCoachWalletData() {
  return useData<CoachWalletData>({
    mockData: MOCK_COACH_WALLET,
    apiUrl: "/api/coach/wallet",
  });
}
