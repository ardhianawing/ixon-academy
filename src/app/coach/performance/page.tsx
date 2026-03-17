"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Award,
  Star,
  Clock,
  FileCheck,
  TrendingUp,
  Users,
  Loader2,
} from "lucide-react";

import { useCoachPerformanceData } from "@/hooks/useCoachPerformanceData";

// ─── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const statIcons = [FileCheck, Clock, Users, TrendingUp];
const statColors = [
  { color: "text-blue-400", bg: "bg-blue-500/10" },
  { color: "text-amber-400", bg: "bg-amber-500/10" },
  { color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { color: "text-purple-400", bg: "bg-purple-500/10" },
];

function getCQSColor(score: number) {
  if (score >= 4.0) return "text-emerald-400";
  if (score >= 3.0) return "text-amber-400";
  return "text-red-400";
}

export default function CoachPerformancePage() {
  const { data, loading } = useCoachPerformanceData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading font-bold text-2xl text-foreground flex items-center gap-2">
          <Award className="size-6 text-[#D4A843]" />
          Coach Performance
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor CQS Score dan statistik review kamu
        </p>
      </motion.div>

      {/* CQS Score Card */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Main Score */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="size-24 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 border border-emerald-500/20 flex items-center justify-center">
              <span className={`font-heading font-bold text-4xl ${getCQSColor(data.cqsScore)}`}>
                {data.cqsScore}
              </span>
            </div>
            <div>
              <p className="font-heading font-bold text-lg text-foreground">
                CQS Score
              </p>
              <p className="text-xs text-muted-foreground">
                Coach Quality Score
              </p>
              <p className="text-xs text-emerald-400 font-semibold mt-1">
                Excellent
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="flex-1 space-y-3">
            {data.breakdown.map((b) => (
              <div key={b.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{b.label}</span>
                  <span className="text-muted-foreground">
                    {b.score} x {b.weight} ={" "}
                    <span className="text-[#D4A843] font-semibold">
                      {b.weighted.toFixed(2)}
                    </span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.score / 5) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
                    className="h-full rounded-full bg-[#D4A843]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.stats.map((st, idx) => {
          const Icon = statIcons[idx] ?? FileCheck;
          const colors = statColors[idx] ?? statColors[0];
          return (
            <div
              key={st.label}
              className="rounded-xl border border-white/5 bg-card p-4 flex flex-col items-center text-center gap-2"
            >
              <div
                className={`size-10 rounded-xl ${colors.bg} flex items-center justify-center`}
              >
                <Icon className={`size-5 ${colors.color}`} />
              </div>
              <p className="font-heading font-bold text-xl text-foreground">
                {st.value}
              </p>
              <p className="text-xs text-muted-foreground">{st.label}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Rating Distribution Chart */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6 space-y-4"
      >
        <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
          <Star className="size-5 text-[#D4A843]" />
          Rating Distribution
        </h2>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.ratingDistribution} layout="vertical">
              <XAxis
                type="number"
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="rating"
                type="category"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A2332",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "rgba(255,255,255,0.5)" }}
              />
              <Bar
                dataKey="count"
                fill="#D4A843"
                radius={[0, 6, 6, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary row */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 p-4">
          <div className="flex items-center gap-2">
            <Star className="size-4 text-[#D4A843] fill-[#D4A843]" />
            <span className="text-sm font-medium text-foreground">
              Average Player Rating
            </span>
          </div>
          <span className="font-heading font-bold text-xl text-[#D4A843]">
            4.5 / 5.0
          </span>
        </div>
      </motion.section>
    </motion.div>
  );
}
