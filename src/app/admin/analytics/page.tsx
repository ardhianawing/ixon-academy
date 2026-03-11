"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown, Users, MessageSquare, BookOpen, ArrowRight } from "lucide-react";

const funnelSteps = [
  { label: "Guest", value: 2000, color: "#64748b" },
  { label: "Free", value: 847, color: "#3b82f6" },
  { label: "Silver", value: 245, color: "#94a3b8" },
  { label: "Gold", value: 89, color: "#D4A843" },
  { label: "Platinum", value: 12, color: "#22d3ee" },
];

const retentionData = [
  { day: "D0", rate: 100 },
  { day: "D1", rate: 72 },
  { day: "D3", rate: 58 },
  { day: "D7", rate: 45 },
  { day: "D14", rate: 34 },
  { day: "D30", rate: 28 },
  { day: "D60", rate: 22 },
  { day: "D90", rate: 18 },
];

const popularCourses = [
  {
    title: "Mastering Jungler Role",
    enrollments: 234,
    completionRate: 78,
  },
  {
    title: "Gold to Mythic: Midlane Guide",
    enrollments: 189,
    completionRate: 65,
  },
  {
    title: "Map Awareness & Rotation",
    enrollments: 156,
    completionRate: 82,
  },
  {
    title: "Draft Pick Strategy",
    enrollments: 132,
    completionRate: 71,
  },
  {
    title: "EXP Lane Domination",
    enrollments: 98,
    completionRate: 59,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Insights mendalam performa platform
        </p>
      </div>

      {/* Funnel Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-[#1A2332] p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-5">
          Conversion Funnel
        </h3>
        <div className="space-y-3">
          {funnelSteps.map((step, i) => {
            const widthPercent = (step.value / funnelSteps[0].value) * 100;
            const prevValue = i > 0 ? funnelSteps[i - 1].value : null;
            const convRate = prevValue
              ? ((step.value / prevValue) * 100).toFixed(1)
              : null;

            return (
              <div key={step.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium">
                      {step.label}
                    </span>
                    {convRate && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingDown className="size-3" />
                        {convRate}% dari {funnelSteps[i - 1].label}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-foreground tabular-nums">
                    {step.value.toLocaleString()}
                  </span>
                </div>
                <div className="h-8 rounded-lg bg-[#0B1120] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="h-full rounded-lg flex items-center pl-3"
                    style={{ backgroundColor: step.color + "40" }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: step.color }}
                    >
                      {widthPercent.toFixed(0)}%
                    </span>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conversion arrows summary */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-border/50">
          {funnelSteps.slice(0, -1).map((step, i) => {
            const next = funnelSteps[i + 1];
            const rate = ((next.value / step.value) * 100).toFixed(1);
            return (
              <div
                key={step.label}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span>{step.label}</span>
                <ArrowRight className="size-3" />
                <span>{next.label}</span>
                <span className="font-semibold text-[#D4A843]">{rate}%</span>
                {i < funnelSteps.length - 2 && (
                  <span className="mx-1 text-border">|</span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Retention Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-[#1A2332] p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">
          User Retention Curve
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={retentionData}>
            <defs>
              <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A843" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D4A843" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4e" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A2332",
                border: "1px solid #2a3a4e",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}%`, "Retention"]}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#D4A843"
              strokeWidth={2}
              fill="url(#retentionGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom Row: LMS + Community */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Popular Courses Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-xl border border-border bg-[#1A2332] p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="size-4 text-[#D4A843]" />
            <h3 className="text-sm font-semibold text-foreground">
              Popular Courses
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="pb-2 font-medium">Course</th>
                  <th className="pb-2 font-medium text-right">Enrollments</th>
                  <th className="pb-2 font-medium text-right">Completion</th>
                </tr>
              </thead>
              <tbody>
                {popularCourses.map((course, i) => (
                  <tr
                    key={course.title}
                    className="border-b border-border/30"
                  >
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-4">
                          {i + 1}.
                        </span>
                        <span className="text-foreground">{course.title}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right text-foreground font-medium tabular-nums">
                      {course.enrollments}
                    </td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-[#0B1120] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#D4A843]"
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                        <span className="text-foreground font-medium tabular-nums w-8 text-right">
                          {course.completionRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-[#1A2332] p-5 space-y-5"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-[#D4A843]" />
            <h3 className="text-sm font-semibold text-foreground">
              Community Stats
            </h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-[#0B1120] p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Posts per Hari</p>
              <p className="text-2xl font-bold text-foreground">28</p>
              <p className="text-xs text-emerald-400">+12% dari minggu lalu</p>
            </div>

            <div className="rounded-lg bg-[#0B1120] p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Toxicity Rate</p>
              <p className="text-2xl font-bold text-foreground">2.1%</p>
              <div className="w-full h-1.5 rounded-full bg-[#1A2332] mt-2">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: "2.1%" }}
                />
              </div>
              <p className="text-xs text-emerald-400">Di bawah threshold 5%</p>
            </div>

            <div className="rounded-lg bg-[#0B1120] p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Active Threads</p>
              <p className="text-2xl font-bold text-foreground">47</p>
              <p className="text-xs text-muted-foreground">
                12 dengan 10+ replies
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
