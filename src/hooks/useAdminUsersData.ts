"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MockUser {
  id: number;
  avatar: string;
  nama: string;
  nickname: string;
  tier: "Free" | "Silver" | "Gold" | "Platinum";
  game: string;
  role: "Player" | "Coach" | "Admin" | "Parent";
  joinDate: string;
  status: "Active" | "Warned" | "Banned";
  email: string;
  totalMatches: number;
  winRate: string;
}

export interface AdminUsersData {
  users: MockUser[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_ADMIN_USERS: AdminUsersData = {
  users: [
    {
      id: 1,
      avatar: "RA",
      nama: "Rizky Aditya",
      nickname: "RizkyGG",
      tier: "Gold",
      game: "Mobile Legends",
      role: "Player",
      joinDate: "2025-08-15",
      status: "Active",
      email: "rizky@example.com",
      totalMatches: 342,
      winRate: "67%",
    },
    {
      id: 2,
      avatar: "SP",
      nama: "Siti Permata",
      nickname: "PermataMVP",
      tier: "Platinum",
      game: "Mobile Legends",
      role: "Player",
      joinDate: "2025-07-20",
      status: "Active",
      email: "siti@example.com",
      totalMatches: 580,
      winRate: "72%",
    },
    {
      id: 3,
      avatar: "AW",
      nama: "Alex Wijaya",
      nickname: "CoachAlex",
      tier: "Gold",
      game: "Mobile Legends",
      role: "Coach",
      joinDate: "2025-06-10",
      status: "Active",
      email: "alex@ixon.gg",
      totalMatches: 1200,
      winRate: "75%",
    },
    {
      id: 4,
      avatar: "BF",
      nama: "Budi Firmansyah",
      nickname: "BudiPro",
      tier: "Silver",
      game: "Mobile Legends",
      role: "Player",
      joinDate: "2025-09-01",
      status: "Active",
      email: "budi@example.com",
      totalMatches: 156,
      winRate: "55%",
    },
    {
      id: 5,
      avatar: "DK",
      nama: "Dewi Kusuma",
      nickname: "DewiML",
      tier: "Free",
      game: "Mobile Legends",
      role: "Player",
      joinDate: "2025-11-20",
      status: "Warned",
      email: "dewi@example.com",
      totalMatches: 45,
      winRate: "48%",
    },
    {
      id: 6,
      avatar: "FH",
      nama: "Farhan Hakim",
      nickname: "FarhanGG",
      tier: "Silver",
      game: "Mobile Legends",
      role: "Player",
      joinDate: "2025-10-05",
      status: "Active",
      email: "farhan@example.com",
      totalMatches: 210,
      winRate: "61%",
    },
    {
      id: 7,
      avatar: "AN",
      nama: "Admin Nanda",
      nickname: "NandaAdmin",
      tier: "Platinum",
      game: "Mobile Legends",
      role: "Admin",
      joinDate: "2025-05-01",
      status: "Active",
      email: "nanda@ixon.gg",
      totalMatches: 0,
      winRate: "-",
    },
    {
      id: 8,
      avatar: "IR",
      nama: "Ibu Ratna",
      nickname: "RatnaMom",
      tier: "Free",
      game: "Mobile Legends",
      role: "Parent",
      joinDate: "2025-12-01",
      status: "Active",
      email: "ratna@example.com",
      totalMatches: 0,
      winRate: "-",
    },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAdminUsersData() {
  return useData<AdminUsersData>({
    mockData: MOCK_ADMIN_USERS,
    apiUrl: "/api/admin/users",
  });
}
