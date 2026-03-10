"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import {
  BookOpen,
  Upload,
  ClipboardList,
  MessageSquare,
  Star,
  Trophy,
  CheckCircle2,
  Clock,
  Flame,
  Users,
  Calendar,
  ChevronRight,
  Gamepad2,
  Zap,
  ArrowUpRight,
} from "lucide-react";

import { TierBadge } from "@/components/ui/TierBadge";
import { GameBadge } from "@/components/ui/GameBadge";
import { XPBar } from "@/components/ui/XPBar";
import { TalentScoreCircle } from "@/components/ui/TalentScoreCircle";

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
  {
    id: 1,
    emoji: "✅",
    title: "Login Hari Ini",
    xp: 10,
    status: "completed" as const,
    progress: "1/1",
  },
  {
    id: 2,
    emoji: "📚",
    title: "Selesaikan 1 Lesson",
    xp: 25,
    status: "in-progress" as const,
    progress: "0/1",
  },
  {
    id: 3,
    emoji: "💬",
    title: "Reply di Forum",
    xp: 15,
    status: "not-started" as const,
    progress: "0/1",
  },
];

const quickActions = [
  {
    label: "Lanjutkan Belajar",
    href: "/academy",
    icon: BookOpen,
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
  },
  {
    label: "Submit Gameplay",
    href: "/evaluation/submit",
    icon: Upload,
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
  },
  {
    label: "Review Terbaru",
    href: "/evaluation/history",
    icon: ClipboardList,
    color: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-400",
  },
  {
    label: "Forum Trending",
    href: "/community",
    icon: MessageSquare,
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
  },
];

const activityFeed = [
  {
    id: 1,
    icon: Star,
    iconColor: "text-amber-400",
    text: "Coach Alex memberikan review untuk gameplay #12",
    time: "2 jam lalu",
  },
  {
    id: 2,
    icon: Zap,
    iconColor: "text-emerald-400",
    text: "Kamu naik ke Level 14!",
    time: "5 jam lalu",
  },
  {
    id: 3,
    icon: CheckCircle2,
    iconColor: "text-blue-400",
    text: "Misi 'Login Harian' tercapai",
    time: "6 jam lalu",
  },
  {
    id: 4,
    icon: Trophy,
    iconColor: "text-purple-400",
    text: "Quiz 'Jungle Basics' selesai: 85%",
    time: "kemarin",
  },
  {
    id: 5,
    icon: MessageSquare,
    iconColor: "text-cyan-400",
    text: "Reply baru di thread 'Tips Jungler'",
    time: "kemarin",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "IXON Weekly Scrim #12",
    date: "15 Mar 2026",
    format: "5v5",
    slots: "24/32 slot",
    minTier: "SILVER",
    game: "MLBB",
  },
  {
    id: 2,
    title: "IXON Rookie Tournament S1",
    date: "22 Mar 2026",
    format: "Tournament",
    slots: "12/16 slot",
    minTier: "GOLD",
    game: "MLBB",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMidnightWIBCountdown() {
  // WIB = UTC+7
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

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Mission Status Badge ─────────────────────────────────────────────────────

function MissionStatusBadge({ status }: { status: "completed" | "in-progress" | "not-started" }) {
  const map = {
    completed: { label: "Selesai", cls: "bg-emerald-500/15 text-emerald-400" },
    "in-progress": { label: "Sedang Berjalan", cls: "bg-amber-500/15 text-amber-400" },
    "not-started": { label: "Belum Mulai", cls: "bg-white/5 text-muted-foreground" },
  };
  const cfg = map[status];
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [countdown, setCountdown] = useState(getMidnightWIBCountdown());

  useEffect(() => {
    const id = setInterval(() => setCountdown(getMidnightWIBCountdown()), 1_000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* ─── Section 1: Welcome Bar ──────────────────────────────────── */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-5 md:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative shrink-0">
              <div className="size-14 rounded-xl bg-gradient-to-br from-[#D4A843] to-[#B8922E] flex items-center justify-center text-2xl font-bold text-black">
                T
              </div>
              <span className="absolute -bottom-1 -right-1 size-5 rounded-md bg-card border border-white/10 flex items-center justify-center text-[10px] font-bold text-[#D4A843]">
                14
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading font-bold text-xl text-foreground truncate">
                  Selamat datang, TENSAI!
                </h1>
                <TierBadge tier="GOLD" size="sm" />
                <GameBadge game="MLBB" size="sm" />
              </div>
              <XPBar currentXP={2450} nextLevelXP={3000} level={14} className="mt-2 max-w-sm" />
            </div>
          </div>

          {/* Right: Talent Score */}
          <div className="flex items-center gap-3 shrink-0">
            <TalentScoreCircle score={78} size={72} strokeWidth={6} />
            <div className="text-sm">
              <p className="text-muted-foreground">Talent Score</p>
              <p className="font-heading font-bold text-foreground text-lg">78</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── Section 2: Daily Missions ───────────────────────────────── */}
      <motion.section variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-foreground">Misi Harian</h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Flame className="size-3.5 text-orange-400" />
              <span className="text-orange-400 font-semibold">7 hari berturut-turut!</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              Reset dalam {countdown}
            </span>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory -mx-1 px-1">
          {missions.map((m) => (
            <div
              key={m.id}
              className={`
                snap-start shrink-0 w-[220px] md:w-auto md:flex-1
                rounded-xl border bg-card p-4 space-y-3 transition-colors
                ${m.status === "completed" ? "border-emerald-500/20" : "border-white/5 hover:border-white/10"}
              `}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{m.emoji}</span>
                <MissionStatusBadge status={m.status} />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.progress}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#D4A843]">+{m.xp} XP</span>
                {m.status === "completed" && (
                  <CheckCircle2 className="size-4 text-emerald-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─── Section 3: Quick Actions ────────────────────────────────── */}
      <motion.section variants={item}>
        <h2 className="font-heading font-bold text-foreground mb-3">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <div
                className={`
                  group rounded-xl border border-white/5 bg-card p-4
                  hover:border-white/10 hover:bg-white/[0.02] transition-all
                  flex flex-col items-center text-center gap-3
                `}
              >
                <div
                  className={`
                    size-12 rounded-xl bg-gradient-to-br ${action.color}
                    flex items-center justify-center
                    group-hover:scale-110 transition-transform
                  `}
                >
                  <action.icon className={`size-5 ${action.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ─── Section 4: Progress Overview ────────────────────────────── */}
      <motion.section variants={item}>
        <h2 className="font-heading font-bold text-foreground mb-3">Progress Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Radar Chart */}
          <div className="rounded-xl border border-white/5 bg-card p-5">
            <p className="text-sm font-semibold text-foreground mb-1">Talent Radar</p>
            <p className="text-xs text-muted-foreground mb-4">
              Rank: Mythical Glory &middot; Talent Score: 78/100
            </p>
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis
                    dataKey="stat"
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Stats"
                    dataKey="value"
                    stroke="#D4A843"
                    fill="#D4A843"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sparkline */}
          <div className="rounded-xl border border-white/5 bg-card p-5 flex flex-col">
            <p className="text-sm font-semibold text-foreground mb-1">Talent Score Trend</p>
            <p className="text-xs text-muted-foreground mb-4">6 minggu terakhir</p>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4A843" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#D4A843" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2332",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                    itemStyle={{ color: "#D4A843" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#D4A843"
                    strokeWidth={2}
                    fill="url(#goldGrad)"
                    dot={{ r: 3, fill: "#D4A843", stroke: "#1A2332", strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: "#D4A843" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <ArrowUpRight className="size-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold">+16 poin</span>
              <span className="text-xs text-muted-foreground">dari 6 minggu lalu</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── Section 5: Recent Activity Feed ─────────────────────────── */}
      <motion.section variants={item}>
        <h2 className="font-heading font-bold text-foreground mb-3">Aktivitas Terbaru</h2>
        <div className="rounded-xl border border-white/5 bg-card divide-y divide-white/5">
          {activityFeed.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
            >
              <div className="shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center">
                <a.icon className={`size-4 ${a.iconColor}`} />
              </div>
              <p className="flex-1 text-sm text-foreground min-w-0 truncate">{a.text}</p>
              <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─── Section 6: Upcoming Events ──────────────────────────────── */}
      <motion.section variants={item} className="pb-4">
        <h2 className="font-heading font-bold text-foreground mb-3">Event Mendatang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              className="rounded-xl border border-white/5 bg-card p-5 space-y-4 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{ev.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {ev.date}
                  </div>
                </div>
                <GameBadge game={ev.game} size="sm" />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                  {ev.format}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">
                  <Users className="size-3 inline mr-1" />
                  {ev.slots}
                </span>
                <TierBadge tier={ev.minTier} size="sm" />
                <span className="text-[10px] text-muted-foreground">min. required</span>
              </div>

              <button className="w-full rounded-lg bg-[#D4A843]/10 hover:bg-[#D4A843]/20 text-[#D4A843] font-semibold text-sm py-2.5 transition-colors flex items-center justify-center gap-1.5">
                <Gamepad2 className="size-4" />
                Daftar
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
