"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Report {
  id: number;
  type: string;
  content: string;
  author: string;
  authorAvatar: string;
  reporter: string;
  reason: string;
  timestamp: string;
  status: "Pending" | "Resolved";
}

export interface AdminModerationData {
  reports: Report[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_ADMIN_MODERATION: AdminModerationData = {
  reports: [
    {
      id: 1,
      type: "Toxic comment",
      content:
        "Lu noob banget sih, uninstall aja dah game-nya. Gak guna main rank segitu doang...",
      author: "DewiML",
      authorAvatar: "DK",
      reporter: "RizkyGG",
      reason: "Bahasa kasar",
      timestamp: "2026-03-10 14:32",
      status: "Pending",
    },
    {
      id: 2,
      type: "Spam promotion",
      content:
        "JOIN server discord gue buat joki murah! Mythic cuma 50rb! DM sekarang buat promo spesial...",
      author: "SpammerZ",
      authorAvatar: "SZ",
      reporter: "PermataMVP",
      reason: "Promosi tidak relevan",
      timestamp: "2026-03-10 12:15",
      status: "Pending",
    },
    {
      id: 3,
      type: "Offensive content",
      content:
        "Post berisi konten menyinggung suku dan agama tertentu. [Konten disembunyikan untuk moderasi]",
      author: "ToxicUser99",
      authorAvatar: "TU",
      reporter: "CoachAlex",
      reason: "SARA",
      timestamp: "2026-03-10 09:48",
      status: "Pending",
    },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAdminModerationData() {
  return useData<AdminModerationData>({
    mockData: MOCK_ADMIN_MODERATION,
    apiUrl: "/api/admin/moderation/queue",
  });
}
