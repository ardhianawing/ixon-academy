"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MentorListItem {
  id: string;
  nickname: string;
  realName: string;
  exTeam: string;
  role: string;
  yearsExp: number;
  rating: number;
  totalReviews: number;
  available: boolean;
  bio: string;
  specializations: string[];
  initial: string;
  color: string;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_MENTORS: MentorListItem[] = [
  {
    id: "rrq-lemon",
    nickname: "RRQ Lemon",
    realName: "Muhammad Ikhsan",
    exTeam: "RRQ Hoshi",
    role: "Jungler",
    yearsExp: 5,
    rating: 4.8,
    totalReviews: 124,
    available: true,
    bio: "Legenda Jungler Indonesia. Spesialis rotasi dan timing objektif.",
    specializations: ["Jungling", "Rotasi Map", "Objektif"],
    initial: "RL",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "evos-wannn",
    nickname: "EVOS Wannn",
    realName: "Muhammad Ridwan",
    exTeam: "EVOS Legends",
    role: "Gold Laner",
    yearsExp: 4,
    rating: 4.6,
    totalReviews: 98,
    available: true,
    bio: "Gold Laner andalan EVOS. Ahli farming dan late game carry.",
    specializations: ["Gold Lane", "Farming", "Late Game"],
    initial: "EW",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "onic-sanz",
    nickname: "ONIC Sanz",
    realName: "Sanusi",
    exTeam: "ONIC Esports",
    role: "Mid Laner",
    yearsExp: 3,
    rating: 4.9,
    totalReviews: 156,
    available: false,
    bio: "Mid Laner terbaik Southeast Asia. Master of mage dan burst damage.",
    specializations: ["Mid Lane", "Mage", "Team Fight"],
    initial: "OS",
    color: "from-purple-500 to-pink-500",
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMentorshipData() {
  return useData<MentorListItem[]>({
    mockData: MOCK_MENTORS,
    apiUrl: "/api/mentorship/mentors",
  });
}
