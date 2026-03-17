"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Coach {
  id: number;
  name: string;
  avatar: string;
  cqsScore: number;
  totalReviews: number;
  avgRating: number;
  status: "Active" | "Inactive";
  specialization: string;
  totalStudents: number;
}

export interface Application {
  id: number;
  name: string;
  avatar: string;
  game: string;
  rank: string;
  experience: string;
  appliedDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface AdminCoachesData {
  coaches: Coach[];
  applications: Application[];
  capacity: {
    queueSize: number;
    highPriority: number;
    avgTurnaround: string;
    turnaroundTarget: string;
    avgCqs: number;
    utilization: number;
  };
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_ADMIN_COACHES: AdminCoachesData = {
  coaches: [
    {
      id: 1,
      name: "Coach Alex Wijaya",
      avatar: "AW",
      cqsScore: 92,
      totalReviews: 187,
      avgRating: 4.8,
      status: "Active",
      specialization: "Jungler / Assassin",
      totalStudents: 45,
    },
    {
      id: 2,
      name: "Coach Maria Santos",
      avatar: "MS",
      cqsScore: 85,
      totalReviews: 124,
      avgRating: 4.6,
      status: "Active",
      specialization: "Midlane / Mage",
      totalStudents: 32,
    },
  ],
  applications: [
    {
      id: 1,
      name: "Dani Pratama",
      avatar: "DP",
      game: "Mobile Legends",
      rank: "Mythical Glory 1200+",
      experience: "3 tahun coaching, ex-pro player MDL Season 4",
      appliedDate: "2026-03-08",
      status: "Pending",
    },
  ],
  capacity: {
    queueSize: 5,
    highPriority: 2,
    avgTurnaround: "18h",
    turnaroundTarget: "24h",
    avgCqs: 88.5,
    utilization: 78,
  },
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAdminCoachesData() {
  return useData<AdminCoachesData>({
    mockData: MOCK_ADMIN_COACHES,
    apiUrl: "/api/admin/coaches",
  });
}
