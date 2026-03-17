"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AdminDashboardData {
  userGrowthData: { month: string; users: number }[];
  revenueData: { month: string; revenue: number }[];
  alerts: { label: string; count: number; color: string }[];
  quickStats: { iconName: string; label: string; value: number }[];
  metrics: {
    totalUsers: string;
    totalUsersTrend: string;
    dau: string;
    dauTrend: string;
    mau: string;
    mauTrend: string;
    mrr: string;
    mrrTrend: string;
    conversionRate: string;
    conversionRateTrend: string;
  };
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_ADMIN_DASHBOARD: AdminDashboardData = {
  userGrowthData: [
    { month: "Sep", users: 50 },
    { month: "Okt", users: 120 },
    { month: "Nov", users: 250 },
    { month: "Des", users: 420 },
    { month: "Jan", users: 650 },
    { month: "Feb", users: 847 },
  ],
  revenueData: [
    { month: "Sep", revenue: 2.1 },
    { month: "Okt", revenue: 4.8 },
    { month: "Nov", revenue: 7.2 },
    { month: "Des", revenue: 9.5 },
    { month: "Jan", revenue: 11.3 },
    { month: "Feb", revenue: 12.5 },
  ],
  alerts: [
    { label: "SLA Breaches", count: 3, color: "bg-red-500/20 text-red-400 border-red-500/30" },
    { label: "Flagged Reviews", count: 2, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    { label: "Pending Reports", count: 5, color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  ],
  quickStats: [
    { iconName: "UserCheck", label: "Active Coaches", value: 4 },
    { iconName: "Star", label: "Reviews Today", value: 12 },
    { iconName: "MessageSquare", label: "Posts Today", value: 28 },
  ],
  metrics: {
    totalUsers: "847",
    totalUsersTrend: "+30%",
    dau: "156",
    dauTrend: "+12%",
    mau: "623",
    mauTrend: "+18%",
    mrr: "Rp 12.5jt",
    mrrTrend: "+22%",
    conversionRate: "8.2%",
    conversionRateTrend: "+1.4%",
  },
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAdminDashboardData() {
  return useData<AdminDashboardData>({
    mockData: MOCK_ADMIN_DASHBOARD,
    apiUrl: "/api/admin/dashboard-stats",
  });
}
