"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  UserPlus,
  BarChart3,
  Award,
} from "lucide-react";

interface Coach {
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

interface Application {
  id: number;
  name: string;
  avatar: string;
  game: string;
  rank: string;
  experience: string;
  appliedDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const coaches: Coach[] = [
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
];

const applications: Application[] = [
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
];

function getCqsColor(score: number) {
  if (score >= 90) return "text-emerald-400 bg-emerald-500/20";
  if (score >= 75) return "text-[#D4A843] bg-[#D4A843]/20";
  if (score >= 60) return "text-yellow-400 bg-yellow-500/20";
  return "text-red-400 bg-red-500/20";
}

function getRatingStars(rating: number) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return { full, hasHalf };
}

export default function CoachesPage() {
  const [apps, setApps] = useState(applications);

  const handleApplication = (id: number, action: "Approved" | "Rejected") => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: action } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Coach Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kelola coach dan aplikasi baru
        </p>
      </div>

      {/* Coach List Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-[#1A2332] overflow-x-auto"
      >
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Award className="size-4 text-[#D4A843]" />
            Active Coaches
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-left">
              <th className="px-4 py-3 font-medium">Coach</th>
              <th className="px-4 py-3 font-medium">CQS Score</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">
                Total Reviews
              </th>
              <th className="px-4 py-3 font-medium">Avg Rating</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">
                Specialization
              </th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">
                Students
              </th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => {
              const { full } = getRatingStars(coach.avgRating);
              return (
                <tr
                  key={coach.id}
                  className="border-b border-border/50 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-[#D4A843]/20 flex items-center justify-center text-xs font-bold text-[#D4A843]">
                        {coach.avatar}
                      </div>
                      <span className="text-foreground font-medium">
                        {coach.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-lg text-sm font-bold tabular-nums ${getCqsColor(coach.cqsScore)}`}
                    >
                      {coach.cqsScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground tabular-nums hidden md:table-cell">
                    {coach.totalReviews}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: full }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-[#D4A843] text-[#D4A843]"
                        />
                      ))}
                      <span className="text-foreground ml-1 tabular-nums">
                        {coach.avgRating}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                    {coach.specialization}
                  </td>
                  <td className="px-4 py-3 text-foreground tabular-nums hidden lg:table-cell">
                    {coach.totalStudents}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        coach.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {coach.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Applications Queue */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-[#1A2332] p-5 space-y-4"
      >
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <UserPlus className="size-4 text-[#D4A843]" />
          Coach Applications
          <span className="ml-auto inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
            {apps.filter((a) => a.status === "Pending").length} Pending
          </span>
        </h3>

        {apps.map((app) => (
          <div
            key={app.id}
            className={`rounded-lg border p-4 space-y-3 ${
              app.status === "Approved"
                ? "border-emerald-500/20 bg-emerald-500/5"
                : app.status === "Rejected"
                  ? "border-red-500/20 bg-red-500/5 opacity-60"
                  : "border-border bg-[#0B1120]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-[#D4A843]/20 flex items-center justify-center text-sm font-bold text-[#D4A843]">
                  {app.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{app.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {app.game} - {app.rank}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {app.appliedDate}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">{app.experience}</p>

            {app.status === "Pending" ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleApplication(app.id, "Approved")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
                >
                  <CheckCircle className="size-3.5" />
                  Approve
                </button>
                <button
                  onClick={() => handleApplication(app.id, "Rejected")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                >
                  <XCircle className="size-3.5" />
                  Reject
                </button>
              </div>
            ) : (
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                  app.status === "Approved"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {app.status}
              </span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Capacity Planning */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-border bg-[#1A2332] p-5"
      >
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
          <BarChart3 className="size-4 text-[#D4A843]" />
          Capacity Planning
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-[#0B1120] p-4 space-y-1">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-[#D4A843]" />
              <p className="text-xs text-muted-foreground">Queue Size</p>
            </div>
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-xs text-yellow-400">2 high priority</p>
          </div>

          <div className="rounded-lg bg-[#0B1120] p-4 space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-[#D4A843]" />
              <p className="text-xs text-muted-foreground">Avg Turnaround</p>
            </div>
            <p className="text-2xl font-bold text-foreground">18h</p>
            <p className="text-xs text-emerald-400">Target: 24h</p>
          </div>

          <div className="rounded-lg bg-[#0B1120] p-4 space-y-1">
            <div className="flex items-center gap-2">
              <Star className="size-4 text-[#D4A843]" />
              <p className="text-xs text-muted-foreground">Avg CQS</p>
            </div>
            <p className="text-2xl font-bold text-foreground">88.5</p>
            <p className="text-xs text-emerald-400">Above threshold</p>
          </div>

          <div className="rounded-lg bg-[#0B1120] p-4 space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-[#D4A843]" />
              <p className="text-xs text-muted-foreground">Utilization</p>
            </div>
            <p className="text-2xl font-bold text-foreground">78%</p>
            <div className="w-full h-1.5 rounded-full bg-[#1A2332] mt-1">
              <div
                className="h-full rounded-full bg-[#D4A843]"
                style={{ width: "78%" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
