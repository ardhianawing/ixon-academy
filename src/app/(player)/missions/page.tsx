"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Flame,
  Trophy,
  Sparkles,
  Target,
  BookOpen,
  MessageCircle,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface Mission {
  id: number;
  emoji: string;
  title: string;
  xp: number;
  status: "completed" | "in-progress" | "not-started";
  progress: string;
  icon: React.ElementType;
}

const dailyMissions: Mission[] = [
  {
    id: 1,
    emoji: "🎯",
    title: "Login Hari Ini",
    xp: 10,
    status: "completed",
    progress: "1/1",
    icon: Target,
  },
  {
    id: 2,
    emoji: "📚",
    title: "Selesaikan 1 Lesson",
    xp: 25,
    status: "in-progress",
    progress: "0/1",
    icon: BookOpen,
  },
  {
    id: 3,
    emoji: "💬",
    title: "Reply di Forum",
    xp: 15,
    status: "not-started",
    progress: "0/1",
    icon: MessageCircle,
  },
];

const STREAK_DAYS = 7;

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Status Badge ─────────────────────────────────────────────────────────────

function MissionStatusBadge({
  status,
}: {
  status: "completed" | "in-progress" | "not-started";
}) {
  const map = {
    completed: { label: "Selesai", cls: "bg-emerald-500/15 text-emerald-400" },
    "in-progress": {
      label: "Sedang Berjalan",
      cls: "bg-amber-500/15 text-amber-400",
    },
    "not-started": {
      label: "Belum Mulai",
      cls: "bg-white/5 text-muted-foreground",
    },
  };
  const cfg = map[status];
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}
    >
      {cfg.label}
    </span>
  );
}

// ─── XP Pop Animation ─────────────────────────────────────────────────────────

function XPPop({ xp }: { xp: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="inline-flex items-center gap-1 text-xs font-bold text-[#D4A843]"
    >
      <Sparkles className="size-3" />+{xp} XP
    </motion.span>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function MissionProgressBar({ status }: { status: Mission["status"] }) {
  const widthMap = {
    completed: "100%",
    "in-progress": "40%",
    "not-started": "0%",
  };
  const colorMap = {
    completed: "bg-emerald-500",
    "in-progress": "bg-amber-500",
    "not-started": "bg-white/10",
  };

  return (
    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: widthMap[status] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${colorMap[status]}`}
      />
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function MissionsPage() {
  const [countdown, setCountdown] = useState(getMidnightWIBCountdown());
  const [claimedIds, setClaimedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const id = setInterval(() => setCountdown(getMidnightWIBCountdown()), 1_000);
    return () => clearInterval(id);
  }, []);

  const completedCount = dailyMissions.filter(
    (m) => m.status === "completed"
  ).length;
  const totalMissions = dailyMissions.length;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <motion.section variants={item}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Misi Harian
            </h1>
            <p className="text-sm text-muted-foreground">
              Selesaikan misi untuk mendapatkan XP dan mempertahankan streak
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
              <Flame className="size-4" />
              {STREAK_DAYS} hari berturut-turut!
            </span>
          </div>
        </div>
      </motion.section>

      {/* ─── Streak + Countdown Bar ──────────────────────────────────── */}
      <motion.section variants={item}>
        <div className="rounded-2xl border border-white/5 bg-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Streak */}
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 flex items-center justify-center">
                <Flame className="size-6 text-orange-400" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-lg">
                  {STREAK_DAYS} Hari Streak
                </p>
                <p className="text-xs text-muted-foreground">
                  Jangan putus! Login besok untuk lanjutkan.
                </p>
              </div>
            </div>

            {/* Streak dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`size-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    i < STREAK_DAYS
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      : "bg-white/5 text-muted-foreground border border-white/5"
                  }`}
                >
                  {i < STREAK_DAYS ? (
                    <Flame className="size-3.5" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-2 shrink-0">
              <Clock className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Reset dalam</p>
                <p className="font-mono font-bold text-foreground tabular-nums text-lg">
                  {countdown}
                </p>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">
                Progress hari ini: {completedCount}/{totalMissions} misi
              </span>
              <span className="text-[#D4A843] font-semibold">
                +{dailyMissions
                  .filter((m) => m.status === "completed")
                  .reduce((sum, m) => sum + m.xp, 0)}{" "}
                XP diraih
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(completedCount / totalMissions) * 100}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#B8922E]"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── Daily Missions Cards ────────────────────────────────────── */}
      <motion.section variants={item} className="space-y-3">
        <h2 className="font-heading font-bold text-foreground">
          Misi Hari Ini
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-1 px-1">
          {dailyMissions.map((m) => {
            const isClaimed = claimedIds.has(m.id);
            return (
              <motion.div
                key={m.id}
                whileHover={{ scale: 1.02 }}
                className={`
                  snap-start shrink-0 w-[260px] md:w-auto md:flex-1
                  rounded-xl border bg-card p-5 space-y-4 transition-all relative overflow-hidden
                  ${
                    m.status === "completed"
                      ? "border-emerald-500/20"
                      : "border-white/5 hover:border-white/10"
                  }
                `}
              >
                {/* Completed glow */}
                {m.status === "completed" && (
                  <div className="absolute inset-0 bg-emerald-500/[0.03] pointer-events-none" />
                )}

                <div className="flex items-start justify-between relative">
                  <span className="text-3xl">{m.emoji}</span>
                  <MissionStatusBadge status={m.status} />
                </div>

                <div className="relative">
                  <p className="font-semibold text-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Progress: {m.progress}
                  </p>
                </div>

                <MissionProgressBar status={m.status} />

                <div className="flex items-center justify-between relative">
                  {m.status === "completed" ? (
                    <AnimatePresence>
                      {isClaimed ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-emerald-400 font-semibold flex items-center gap-1"
                        >
                          <CheckCircle2 className="size-3.5" />
                          Diklaim
                        </motion.span>
                      ) : (
                        <XPPop xp={m.xp} />
                      )}
                    </AnimatePresence>
                  ) : (
                    <span className="text-xs font-semibold text-[#D4A843]">
                      +{m.xp} XP
                    </span>
                  )}

                  {m.status === "completed" && !isClaimed && (
                    <button
                      onClick={() =>
                        setClaimedIds((prev) => new Set([...prev, m.id]))
                      }
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors"
                    >
                      Klaim XP
                    </button>
                  )}

                  {m.status === "completed" && isClaimed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <CheckCircle2 className="size-6 text-emerald-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Weekly Challenge ────────────────────────────────────────── */}
      <motion.section variants={item}>
        <h2 className="font-heading font-bold text-foreground mb-3">
          Tantangan Mingguan
        </h2>
        <div className="rounded-2xl border border-[#D4A843]/20 bg-gradient-to-br from-[#D4A843]/5 to-transparent p-5 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A843]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative">
            <div className="size-14 rounded-xl bg-[#D4A843]/15 flex items-center justify-center shrink-0">
              <Trophy className="size-7 text-[#D4A843]" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <p className="font-heading font-bold text-foreground text-lg">
                    Selesaikan 5 Lesson dalam Seminggu
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Progress: 2/5 lesson selesai
                  </p>
                </div>
                <span className="text-sm font-bold text-[#D4A843] bg-[#D4A843]/10 px-3 py-1 rounded-lg">
                  +100 XP Bonus
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#B8922E]"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>2 dari 5 selesai</span>
                <span>Berakhir dalam 4 hari</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── XP Summary ──────────────────────────────────────────────── */}
      <motion.section variants={item} className="pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "XP Hari Ini",
              value: "+10",
              icon: Sparkles,
              color: "text-[#D4A843]",
              bg: "from-[#D4A843]/20 to-[#D4A843]/5",
            },
            {
              label: "XP Minggu Ini",
              value: "+185",
              icon: Target,
              color: "text-blue-400",
              bg: "from-blue-500/20 to-blue-600/5",
            },
            {
              label: "Misi Selesai",
              value: "23",
              icon: CheckCircle2,
              color: "text-emerald-400",
              bg: "from-emerald-500/20 to-emerald-600/5",
            },
            {
              label: "Streak Terbaik",
              value: "12",
              icon: Flame,
              color: "text-orange-400",
              bg: "from-orange-500/20 to-orange-600/5",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/5 bg-card p-4 space-y-3"
            >
              <div
                className={`size-10 rounded-lg bg-gradient-to-br ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <div>
                <p className={`font-heading font-bold text-lg ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
