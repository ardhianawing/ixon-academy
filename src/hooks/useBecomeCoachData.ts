"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Benefit {
  iconName: string;
  title: string;
  desc: string;
}

export interface MockGameplay {
  player: string;
  rank: string;
  hero: string;
  role: string;
  match: string;
  notes: string;
}

export interface BecomeCoachData {
  benefits: Benefit[];
  requirements: string[];
  steps: string[];
  mockGameplay: MockGameplay;
  rubric: string[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_BECOME_COACH: BecomeCoachData = {
  benefits: [
    {
      iconName: "DollarSign",
      title: "Penghasilan Fleksibel",
      desc: "Tetapkan tarif coaching sendiri dan terima pembayaran langsung.",
    },
    {
      iconName: "Users",
      title: "Jangkau Ribuan Pemain",
      desc: "Akses ke komunitas IXON Academy yang terus berkembang.",
    },
    {
      iconName: "Award",
      title: "Bangun Reputasi",
      desc: "Tingkatkan kredibilitas dengan badge Coach Verified.",
    },
  ],
  requirements: [
    "Minimal rank Mythic di MLBB atau setara di game lain",
    "Pengalaman bermain kompetitif atau coaching minimal 1 tahun",
    "Mampu berkomunikasi dengan baik dalam Bahasa Indonesia",
    "Bersedia menyelesaikan sample review sebagai bagian dari aplikasi",
    "Memiliki perangkat yang memadai untuk sesi coaching online",
  ],
  steps: ["Info Pribadi", "Keahlian Game", "Pengalaman", "Sample Review"],
  mockGameplay: {
    player: "SilverFox_ID",
    rank: "Legend II",
    hero: "Ling",
    role: "Jungler",
    match: "Ranked \u2014 Kalah 8-15 (25:32)",
    notes:
      "Early game farming lambat, missed 2 turtle, tidak join teamfight mid-game, build tidak optimal untuk lawan yang tanky.",
  },
  rubric: [
    "Mekanik (1-10): Skill usage, combo execution",
    "Game Sense (1-10): Map awareness, objective control",
    "Decision Making (1-10): Positioning, timing engage",
    "Saran Perbaikan: minimal 3 poin actionable",
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useBecomeCoachData() {
  return useData<BecomeCoachData>({
    mockData: MOCK_BECOME_COACH,
    apiUrl: "/api/coach/apply",
  });
}
