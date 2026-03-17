"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, Tooltip,
} from "recharts";
import {
  BookOpen, Upload, ClipboardList, MessageSquare, Trophy,
  CheckCircle2, Clock, Flame, Users, Calendar, ChevronRight,
  Gamepad2, Zap, ArrowUpRight, Star, Target, Swords, Loader2,
} from "lucide-react";
import { TierBadge } from "@/components/ui/TierBadge";
import { XPBar } from "@/components/ui/XPBar";
import { useDashboardData } from "@/hooks/useDashboardData";

// ─── Static Config ───────────────────────────────────────────────────────────

const quickActions = [
  { label: "Belajar", href: "/academy", icon: BookOpen, from: "from-blue-500", to: "to-blue-700", glow: "shadow-blue-500/30" },
  { label: "Submit", href: "/evaluation/submit", icon: Upload, from: "from-emerald-500", to: "to-emerald-700", glow: "shadow-emerald-500/30" },
  { label: "Review", href: "/evaluation/history", icon: ClipboardList, from: "from-amber-500", to: "to-amber-700", glow: "shadow-amber-500/30" },
  { label: "Forum", href: "/community", icon: MessageSquare, from: "from-purple-500", to: "to-purple-700", glow: "shadow-purple-500/30" },
];

const MISSION_EMOJIS: Record<string, string> = {
  login: "✅",
  lesson: "📚",
  community: "💬",
  evaluation: "🎮",
  quiz: "🧠",
};

const NOTIF_CONFIG: Record<string, { icon: typeof Star; iconColor: string; bg: string }> = {
  review: { icon: Star, iconColor: "text-amber-400", bg: "bg-amber-500/10" },
  level_up: { icon: Zap, iconColor: "text-emerald-400", bg: "bg-emerald-500/10" },
  mission: { icon: CheckCircle2, iconColor: "text-blue-400", bg: "bg-blue-500/10" },
  quiz: { icon: Trophy, iconColor: "text-purple-400", bg: "bg-purple-500/10" },
};

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

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "baru saja";
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "kemarin";
  return `${days} hari lalu`;
}

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
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
  const { data, loading, error } = useDashboardData();
  const [countdown, setCountdown] = useState(getMidnightWIBCountdown());
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCountdown(getMidnightWIBCountdown()), 1_000);
    return () => clearInterval(id);
  }, []);

  // Build highlight cards from data
  const completedMissions = data.missions.filter((m) => m.status === "completed").length;
  const highlightCards = [
    {
      id: "mission",
      icon: Target,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/15",
      title: "Misi Harian",
      subtitle: `${completedMissions} dari ${data.missions.length} selesai`,
      accent: `Streak ${data.streak} hari`,
      accentColor: "text-orange-400",
      href: "/missions",
      gradient: "from-emerald-600/10 to-emerald-900/5",
    },
    ...(data.upcomingEvents.length > 0
      ? [{
          id: "event",
          icon: Trophy,
          iconColor: "text-blue-400",
          iconBg: "bg-blue-500/15",
          title: data.upcomingEvents[0].title,
          subtitle: `${formatEventDate(data.upcomingEvents[0].date)} · ${data.upcomingEvents[0].currentParticipants}/${data.upcomingEvents[0].maxParticipants} slot`,
          accent: "Daftar sekarang",
          accentColor: "text-[#D4A843]",
          href: "/events",
          gradient: "from-blue-600/10 to-blue-900/5",
        }]
      : []),
    ...(data.notifications.filter((n) => !n.isRead).length > 0
      ? [{
          id: "review",
          icon: Star,
          iconColor: "text-amber-400",
          iconBg: "bg-amber-500/15",
          title: "Notifikasi Baru",
          subtitle: data.notifications.find((n) => !n.isRead)?.body ?? "",
          accent: "Lihat",
          accentColor: "text-[#D4A843]",
          href: "/evaluation/history",
          gradient: "from-amber-600/10 to-amber-900/5",
        }]
      : []),
  ];

  // Fallback if no highlight cards (shouldn't happen, but safety)
  if (highlightCards.length === 0) {
    highlightCards.push({
      id: "welcome",
      icon: Star,
      iconColor: "text-[#D4A843]",
      iconBg: "bg-[#D4A843]/15",
      title: "Selamat Datang!",
      subtitle: "Mulai perjalanan esports-mu",
      accent: "Mulai belajar",
      accentColor: "text-[#D4A843]",
      href: "/academy",
      gradient: "from-[#D4A843]/10 to-[#D4A843]/5",
    });
  }

  // Auto-rotate highlight cards on mobile
  useEffect(() => {
    if (highlightCards.length <= 1) return;
    const id = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlightCards.length);
    }, 5_000);
    return () => clearInterval(id);
  }, [highlightCards.length]);

  const currentHighlight = highlightCards[highlightIndex % highlightCards.length];

  // Derived values
  const playerName = data.player?.nickname ?? data.user.name;
  const playerInitial = playerName.charAt(0).toUpperCase();
  const tier = data.user.tier;
  const rank = data.player?.rank ?? "—";
  const role = data.player?.roleIngame ?? "";
  const gameName = data.player?.game.slug === "mlbb" ? "MLBB" : data.player?.game.title ?? "";
  const talentScore = Math.round(data.talentScore);
  const radarData = data.radarData ?? [
    { stat: "Mechanical", value: 0 },
    { stat: "Game Sense", value: 0 },
    { stat: "Hero Mastery", value: 0 },
    { stat: "Teamwork", value: 0 },
    { stat: "Mental", value: 0 },
  ];
  const scoreTrend = data.scoreTrend;
  const scoreDiff = scoreTrend.length >= 2
    ? scoreTrend[scoreTrend.length - 1].score - scoreTrend[0].score
    : 0;

  // Activity feed from notifications
  const activityFeed = data.notifications.slice(0, 4).map((n) => {
    const config = NOTIF_CONFIG[n.type] ?? NOTIF_CONFIG.mission;
    return {
      id: n.id,
      icon: config.icon,
      iconColor: config.iconColor,
      bg: config.bg,
      text: n.body,
      time: formatTimeAgo(n.sentAt),
    };
  });

  // Events
  const upcomingEvents = data.upcomingEvents.map((e) => ({
    id: e.id,
    title: e.title,
    date: formatEventDate(e.date),
    format: e.format,
    slots: `${e.currentParticipants}/${e.maxParticipants}`,
    minTier: e.tierRequired,
    gradient: e.tierRequired === "GOLD" ? "from-[#D4A843]/20 to-[#D4A843]/5" : "from-blue-600/20 to-blue-900/10",
  }));

  // Missions
  const missions = data.missions.map((m) => ({
    id: m.id,
    emoji: MISSION_EMOJIS[m.type] ?? "🎯",
    title: m.title,
    xp: m.xp,
    status: m.status === "completed" ? "completed" as const : m.status === "assigned" ? "not-started" as const : "in-progress" as const,
    progress: m.status === "completed" ? 1 : 0,
    total: 1,
  }));

  // Loading state (only in real mode)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  // Error state (only in real mode, falls back to mock)
  if (error) {
    // Already falls back to mock data via useData, just show a subtle banner
  }

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
                    {playerInitial}
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-5 rounded-lg bg-[#1A2332] border border-white/10 flex items-center justify-center">
                    <span className="text-[9px] font-black text-[#D4A843]">{data.level}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-white/50 mb-0.5">Selamat datang kembali</p>
                  <h1 className="font-heading font-black text-xl text-white leading-tight">{playerName}</h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <TierBadge tier={tier} size="sm" />
                    {gameName && role && (
                      <span className="text-[10px] text-white/40 font-medium">{gameName} · {role}</span>
                    )}
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
                      strokeDasharray={`${(talentScore / 100) * 150.8} 150.8`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading font-black text-base text-[#D4A843]">{talentScore}</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/40 mt-0.5">Talent</span>
              </div>
            </div>

            {/* XP Bar */}
            <XPBar currentXP={data.xp} nextLevelXP={data.xpForNextLevel} level={data.level} />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { icon: Flame, label: "Streak", value: `${data.streak} hari`, color: "text-orange-400" },
                { icon: Swords, label: "Rank", value: rank, color: "text-purple-400" },
                { icon: Target, label: "Misi", value: `${completedMissions}/${data.missions.length}`, color: "text-emerald-400" },
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

      {/* ── Mobile: Highlight Card (rotating) ─────────────────────────── */}
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="md:hidden">
        <Link href={currentHighlight.href}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHighlight.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl bg-gradient-to-br ${currentHighlight.gradient} border border-white/10 p-4`}
            >
              <div className="flex items-center gap-3">
                <div className={`shrink-0 size-10 rounded-xl ${currentHighlight.iconBg} flex items-center justify-center`}>
                  <currentHighlight.icon className={`size-5 ${currentHighlight.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{currentHighlight.title}</p>
                  <p className="text-[11px] text-white/50 mt-0.5">{currentHighlight.subtitle}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`text-[11px] font-semibold ${currentHighlight.accentColor}`}>
                    {currentHighlight.accent}
                  </span>
                  <ChevronRight className="size-4 text-white/30 ml-auto mt-0.5" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Link>
        {/* Dot indicators */}
        {highlightCards.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {highlightCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => setHighlightIndex(i)}
                className={`rounded-full transition-all ${
                  i === (highlightIndex % highlightCards.length)
                    ? "w-5 h-1.5 bg-[#D4A843]"
                    : "w-1.5 h-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Desktop: Daily Missions (hidden on mobile) ────────────────── */}
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="hidden md:block">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-white text-base flex items-center gap-2">
            <Target className="size-4 text-[#D4A843]" />
            Misi Harian
          </h2>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1 text-orange-400 font-semibold">
              <Flame className="size-3" /> {data.streak} hari
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

      {/* ── Desktop: Talent Radar (hidden on mobile) ──────────────────── */}
      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="hidden md:block">
        <div className="rounded-2xl bg-[#1A2332] border border-white/[0.06] p-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-heading font-bold text-white text-base">Skill Radar</h2>
            <span className="text-[11px] font-semibold text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5 rounded-full">
              Score: {talentScore}
            </span>
          </div>
          <p className="text-[11px] text-white/40 mb-3">{rank} · Update minggu ini</p>
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

      {/* ── Desktop: Score Trend (hidden on mobile) ───────────────────── */}
      {scoreTrend.length > 0 && (
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="hidden md:block">
          <div className="rounded-2xl bg-[#1A2332] border border-white/[0.06] p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-heading font-bold text-white text-base">Talent Score Trend</h2>
                <p className="text-[11px] text-white/40">{scoreTrend.length} minggu terakhir</p>
              </div>
              <div className={`flex items-center gap-1 ${scoreDiff >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                <ArrowUpRight className="size-4" />
                <span className="text-sm font-bold">{scoreDiff >= 0 ? "+" : ""}{scoreDiff}</span>
              </div>
            </div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreTrend}>
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
      )}

      {/* ── Desktop: Events (hidden on mobile) ────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="hidden md:block">
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
      )}

      {/* ── Desktop: Recent Activity (hidden on mobile) ────────────────── */}
      {activityFeed.length > 0 && (
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="hidden md:block pb-2">
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
      )}

    </div>
  );
}
