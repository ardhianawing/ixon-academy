"use client";

import { StatCard } from "@/components/ui/StatCard";
import {
  Users,
  Activity,
  CalendarDays,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Flag,
  FileText,
  UserCheck,
  Star,
  MessageSquare,
  Loader2,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useAdminDashboardData } from "@/hooks/useAdminDashboardData";

const quickStatIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  UserCheck,
  Star,
  MessageSquare,
};

export default function AdminDashboardPage() {
  const { data, loading } = useAdminDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview platform IXON Academy
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          value={data.metrics.totalUsers}
          label="Total Users"
          trend={{ direction: "up", value: data.metrics.totalUsersTrend }}
        />
        <StatCard
          value={data.metrics.dau}
          label="DAU"
          trend={{ direction: "up", value: data.metrics.dauTrend }}
        />
        <StatCard
          value={data.metrics.mau}
          label="MAU"
          trend={{ direction: "up", value: data.metrics.mauTrend }}
        />
        <StatCard
          value={data.metrics.mrr}
          label="MRR"
          trend={{ direction: "up", value: data.metrics.mrrTrend }}
        />
        <StatCard
          value={data.metrics.conversionRate}
          label="Conversion Rate"
          trend={{ direction: "up", value: data.metrics.conversionRateTrend }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-[#1A2332] p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">
            User Growth (6 Bulan)
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data.userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4e" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A2332",
                  border: "1px solid #2a3a4e",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#D4A843"
                strokeWidth={2}
                dot={{ fill: "#D4A843", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-[#1A2332] p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Revenue (Juta Rp)
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4e" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A2332",
                  border: "1px solid #2a3a4e",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value) => [`Rp ${value}jt`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#D4A843" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.alerts.map((alert) => (
          <motion.div
            key={alert.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl border p-4 flex items-center justify-between ${alert.color}`}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="size-5" />
              <span className="text-sm font-medium">{alert.label}</span>
            </div>
            <span className="text-lg font-bold">{alert.count}</span>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.quickStats.map((stat) => {
          const Icon = quickStatIcons[stat.iconName] || UserCheck;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-[#1A2332] p-4 flex items-center gap-4"
            >
              <div className="size-10 rounded-lg bg-[#D4A843]/10 flex items-center justify-center">
                <Icon className="size-5 text-[#D4A843]" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
