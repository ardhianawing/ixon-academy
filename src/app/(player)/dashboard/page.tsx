"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, Tooltip,
} from "recharts";
import {
  BookOpen, Upload, ClipboardList, MessageSquare, Trophy,
  CheckCircle2, Clock, Flame, Users, Calendar, ChevronRight,
  Gamepad2, Zap, ArrowUpRight, Star, Target, Swords,
} from "lucide-react";
import { TierBadge } from "@/components/ui/TierBadge";
import { XPBar } from "@/components/ui/XPBar";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const radarData = [
  { stat: "Mechanical", value: 80 },
  { stat: "Game Sense", value: 65 },
  { stat: "Hero Mastery", value: 75 },
  { stat: "Teamwork", value: 60 },
  { stat: "Mental", value: 70 },
];

const sparklineData = [
  { day: "W1", score: 62 },
  { day: "W2", score: 65 },
  { day: "W3", score: 68 },
  { day: "W4", score: 72 },
  { day: "W5", score: 75 },
  { day: "W6", score: 78 },
];

const missions = [
  { id: 1, emoji: "✅", title: "Login Harian", xp: 10, status: "completed" as const, progress: 1, total: 1 },
  { id: 2, emoji: "📚", title: "Selesaikan 1 Lesson", xp: 25, status: "in-progress" as const, progress: 0, total: 1 },
  { id: 3, emoji: "💬", title: "Reply di Forum", xp: 15, status: "not-started" as const, progress: 0, total: 1 },
];

const quickActions = [
  { label: "Lanjut Belajar", href: "/academy", icon: BookOpen, from: "from-blue-500", to: "to-blue-700", glow: "shadow-blue-500/30" },
  { label: "Submit Gameplay", href: "/evaluation/submit", icon: Upload, from: "from-emerald-500", to: "to-emerald-700", glow: "shadow-emerald-500/30" },
  { label: "Lihat Review", href: "/evaluation/history", icon: ClipboardList, from: "from-amber-500", to: "to-amber-700", glow: "shadow-amber-500/30" },
  { label: "Forum", href: "/community", icon: MessageSquare, from: "from-purple-500", to: "to-purple-700", glow: "shadow-purple-500/30" },
];

const activityFeed = [
  { id: 1, icon: Star, iconColor: "text-amber-400", bg: "bg-amber-500/10", text: "Coach Alex review gameplay #12 kamu", time: "2 jam lalu" },
  { id: 2, icon: Zap, iconColor: "text-emerald-400", bg: "bg-emerald-500/10", text: "Kamu naik ke Level 14!", time: "5 jam lalu" },
  { id: 3, icon: CheckCircle2, iconColor: "text-blue-400", bg: "bg-blue-500/10", text: "Misi 'Login Harian' tercapai", time: "6 jam lalu" },
  { id: 4, icon: Trophy, iconColor: "text-purple-400", bg: "bg-purple-500/10", text: "Quiz 'Jungle Basics': 85%", time: "kemarin" },
];

const upcomingEvents = [
  { id: 1, title: "IXON Weekly Scrim #12", date: "15 Mar", format: "5v5", slots: "24/32", minTier: "SILVER", gradient: "from-blue-600/20 to-blue-900/10" },
  { id: 2, title: "IXON Rookie Tournament S1", date: "22 Mar", format: "Tournament", slots: "12/16", minTier: "GOLD", gradient: "from-[#D4A843]/20 to-[#D4A843]/5" },
];

function getMidnightWIBCountdown() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const wibMs = utcMs + 7 * 3600_000;
  const wibNow = new Date(wibMs);
  const midnightWIB = new Date(wibNow);
  midnightWIB.setHours(24, 0, 0, 0);
  const diff = midnightWIB.getTime() - wibNow.getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [countdown, setCountdown] = useState(getMidnightWIBCountdown());

  useEffect(() => {
    const id = setInterval(() => setCountdown(getMidnightWIBCountdown()), 1_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-5">

      {/* ── Hero Card ─────────────────────────────────────────────────── */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A2D4A] to-[#0F1E35] border border-white/10">
          {/* Glow orb */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#D4A843]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative p-5">
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-[#D4A843] to-[#A07D2E] flex items-center justify-center text-2xl font-black text-[#0B1120] shadow-[0_0_20px_rgba(212,168,67,0.4)]">
                    T
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-5 rounded-lg bg-[#1A2332] border border-white/10 flex items-center justify-center">
                    <span className="text-[9px] font-black text-[#D4A843]">14</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-white/50 mb-0.5">Selamat datang kembali 👋</p>
                  <h1 className="font-heading font-black text-xl text-white leading-tight">TENSAI</h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <TierBadge tier="GOLD" size="sm" />
                    <span className="text-[10px] text-white/40 font-medium">MLBB · Jungler</span>
                  </div>
                </div>
              </div>

              {/* Talent Score */}
              <div className="flex flex-col items-center">
                <div className="relative size-16">
                  <svg className="size-16 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                    <circle
                      cx="28" cy="28" r="24" fill="none"
                      stroke="#D4A843" strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(78 / 100) * 150.8} 150.8`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading font-black text-base text-[#D4A843]">78</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/40 mt-0.5">Talent</span>
              </div>
            </div>

            {/* XP Bar */}
            <XPBar currentXP={2450} nextLevelXP={3000} level={14} />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { icon: Flame, label: "Streak", value: "7 hari", color: "text-orange-400" },
                { icon: Swords, label: "Rank", value: "Mythic", color: "text-purple-400" },
                { icon: Target, label: "Misi", value: "1/3", color: "text-emerald-400" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/[0.05] p-2.5 text-center">
                  <stat.icon className={`size-4 mx-auto mb-1 ${stat.color}`} />
                  <p className="text-xs font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Quick Actions ─────────────────────────────────────────────── */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <motion.div
                whileTap={{ scale: 0.94 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`
                  size-14 rounded-2xl bg-gradient-to-br ${action.from} ${action.to}
                  flex items-center justify-center shadow-lg ${action.glow}
                  group-active:scale-95 transition-transform
                `}>
                  <action.icon className="size-6 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] font-medium text-white/60 text-center leading-tight">
                  {action.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Daily Missions ────────────────────────────────────────────── */}
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-white text-base flex items-center gap-2">
            <Target className="size-4 text-[#D4A843]" />
            Misi Harian
          </h2>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1 text-orange-400 font-semibold">
              <Flame className="size-3" /> 7 hari
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-1 text-white/40">
              <Clock className="size-3" /> {countdown}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {missions.map((m) => (
            <div
              key={m.id}
              className={`
                flex items-center gap-3 p-3.5 rounded-2xl border transition-all
                ${m.status === "completed"
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white/[0.03] border-white/[0.06]"
                }
              `}
            >
              <span className="text-2xl">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{m.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all ${
                        m.status === "completed" ? "bg-emerald-400" : "bg-[#D4A843]"
                      }`}
                      style={{ width: `${(m.progress / m.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/40">{m.progress}/{m.total}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                {m.status === "completed" ? (
                  <CheckCircle2 className="size-5 text-emerald-400" />
                ) : (
                  <span className="text-xs font-bold text-[#D4A843]">+{m.xp} XP</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Talent Radar ─────────────────────────────────────────────── */}
      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-2xl bg-[#1A2332] border border-white/[0.06] p-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-heading font-bold text-white text-base">Skill Radar</h2>
            <span className="text-[11px] font-semibold text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5 rounded-full">
              Score: 78
            </span>
          </div>
          <p className="text-[11px] text-white/40 mb-3">Mythical Glory · Update minggu ini</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="stat" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Stats" dataKey="value" stroke="#D4A843" fill="#D4A843" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* ── Score Trend ──────────────────────────────────────────────── */}
      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-2xl bg-[#1A2332] border border-white/[0.06] p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-heading font-bold text-white text-base">Talent Score Trend</h2>
              <p className="text-[11px] text-white/40">6 minggu terakhir</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <ArrowUpRight className="size-4" />
              <span className="text-sm font-bold">+16</span>
            </div>
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4A843" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#D4A843" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0B1120", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "12px" }}
                  labelStyle={{ color: "rgba(255,255,255,0.4)" }}
                  itemStyle={{ color: "#D4A843" }}
                />
                <Area type="monotone" dataKey="score" stroke="#D4A843" strokeWidth={2.5} fill="url(#goldGrad)"
                  dot={{ r: 3, fill: "#D4A843", stroke: "#0B1120", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: "#D4A843" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* ── Events ────────────────────────────────────────────────────── */}
      <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-white text-base flex items-center gap-2">
            <Trophy className="size-4 text-[#D4A843]" />
            Event Mendatang
          </h2>
          <Link href="/events" className="text-[11px] text-[#D4A843] font-medium flex items-center gap-0.5">
            Lihat semua <ChevronRight className="size-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {upcomingEvents.map((ev) => (
            <div key={ev.id} className={`rounded-2xl bg-gradient-to-br ${ev.gradient} border border-white/10 p-4`}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm truncate">{ev.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-white/50">
                    <span className="flex items-center gap-1"><Calendar className="size-3" />{ev.date}</span>
                    <span className="flex items-center gap-1"><Users className="size-3" />{ev.slots} slot</span>
                  </div>
                </div>
                <TierBadge tier={ev.minTier} size="sm" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                  {ev.format}
                </span>
                <button className="flex items-center gap-1 text-xs font-bold text-[#D4A843] bg-[#D4A843]/10 hover:bg-[#D4A843]/20 px-3 py-1.5 rounded-xl transition-colors">
                  <Gamepad2 className="size-3.5" /> Daftar
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Recent Activity ───────────────────────────────────────────── */}
      <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="pb-2">
        <h2 className="font-heading font-bold text-white text-base mb-3 flex items-center gap-2">
          <Zap className="size-4 text-[#D4A843]" />
          Aktivitas Terbaru
        </h2>
        <div className="rounded-2xl bg-[#1A2332] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.05]">
          {activityFeed.map((a) => (
            <div key={a.id} className="flex items-center gap-3 px-4 py-3">
              <div className={`shrink-0 size-8 rounded-xl ${a.bg} flex items-center justify-center`}>
                <a.icon className={`size-4 ${a.iconColor}`} />
              </div>
              <p className="flex-1 text-[13px] text-white/70 min-w-0 line-clamp-1">{a.text}</p>
              <span className="text-[10px] text-white/30 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
