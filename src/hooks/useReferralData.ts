"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ReferralEntry {
  nama: string;
  tanggal: string;
  status: string;
}

export interface ReferralData {
  referralCode: string;
  referralLink: string;
  referralList: ReferralEntry[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_REFERRAL: ReferralData = {
  referralCode: "TENSAI2026",
  referralLink: "https://ixon.academy/ref/TENSAI2026",
  referralList: [
    { nama: "JungleBeast99", tanggal: "5 Mar 2026", status: "Aktif" },
    { nama: "MiiyaQueen", tanggal: "28 Feb 2026", status: "Aktif" },
    { nama: "ProTankID", tanggal: "20 Feb 2026", status: "Pending" },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useReferralData() {
  return useData<ReferralData>({
    mockData: MOCK_REFERRAL,
    apiUrl: "/api/referral",
  });
}
