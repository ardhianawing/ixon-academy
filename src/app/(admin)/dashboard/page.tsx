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

const userGrowthData = [
  { month: "Sep", users: 50 },
  { month: "Okt", users: 120 },
  { month: "Nov", users: 250 },
  { month: "Des", users: 420 },
  { month: "Jan", users: 650 },
  { month: "Feb", users: 847 },
];

const revenueData = [
  { month: "Sep", revenue: 2.1 },
  { month: "Okt", revenue: 4.8 },
  { month: "Nov", revenue: 7.2 },
  { month: "Des", revenue: 9.5 },
  { month: "Jan", revenue: 11.3 },
  { month: "Feb", revenue: 12.5 },
];

const alerts = [
  { label: "SLA Breaches", count: 3, color: "bg-red-500/20 text-red-400 border-red-500/30" },
  { label: "Flagged Reviews", count: 2, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { label: "Pending Reports", count: 5, color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
];

const quickStats = [
  { icon: UserCheck, label: "Active Coaches", value: 4 },
  { icon: Star, label: "Reviews Today", value: 12 },
  { icon: MessageSquare, label: "Posts Today", value: 28 },
];

export default function AdminDashboardPage() {
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
          value="847"
          label="Total Users"
          trend={{ direction: "up", value: "+30%" }}
        />
        <StatCard
          value="156"
          label="DAU"
          trend={{ direction: "up", value: "+12%" }}
        />
        <StatCard
          value="623"
          label="MAU"
          trend={{ direction: "up", value: "+18%" }}
        />
        <StatCard
          value="Rp 12.5jt"
          label="MRR"
          trend={{ direction: "up", value: "+22%" }}
        />
        <StatCard
          value="8.2%"
          label="Conversion Rate"
          trend={{ direction: "up", value: "+1.4%" }}
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
            <LineChart data={userGrowthData}>
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
            <BarChart data={revenueData}>
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
                formatter={(value: number) => [`Rp ${value}jt`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#D4A843" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alerts.map((alert) => (
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
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-[#1A2332] p-4 flex items-center gap-4"
          >
            <div className="size-10 rounded-lg bg-[#D4A843]/10 flex items-center justify-center">
              <stat.icon className="size-5 text-[#D4A843]" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
