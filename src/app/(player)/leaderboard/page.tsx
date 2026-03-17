"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Medal,
  Trophy,
  Filter,
  ChevronDown,
  Gamepad2,
  Star,
  MessageCircle,
  TrendingUp,
  Loader2,
} from "lucide-react";

import { TierBadge } from "@/components/ui/TierBadge";
import { GameBadge } from "@/components/ui/GameBadge";
import { useLeaderboardData, type Player } from "@/hooks/useLeaderboardData";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "talent" | "xp" | "reputation";
type GameFilter = "all" | "mlbb" | "ff";
type TimeFilter = "week" | "month" | "all-time";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "talent", label: "Talent Score", icon: Star },
  { key: "xp", label: "XP", icon: TrendingUp },
  { key: "reputation", label: "Community Reputation", icon: MessageCircle },
];

const GAME_FILTERS: { key: GameFilter; label: string }[] = [
  { key: "all", label: "All Games" },
  { key: "mlbb", label: "MLBB" },
  { key: "ff", label: "Free Fire" },
];

const TIME_FILTERS: { key: TimeFilter; label: string }[] = [
  { key: "week", label: "Minggu Ini" },
  { key: "month", label: "Bulan Ini" },
  { key: "all-time", label: "Sepanjang Waktu" },
];

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
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreForTab(player: Player, tab: TabKey): number {
  switch (tab) {
    case "talent":
      return player.talentScore;
    case "xp":
      return player.xp;
    case "reputation":
      return player.reputation;
  }
}

function formatScore(value: number, tab: TabKey): string {
  if (tab === "xp") return value.toLocaleString() + " XP";
  if (tab === "reputation") return value.toLocaleString() + " Rep";
  return value.toString();
}

const rankMedals = ["", "\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49"];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const { data: players, loading } = useLeaderboardData();
  const [activeTab, setActiveTab] = useState<TabKey>("talent");
  const [gameFilter, setGameFilter] = useState<GameFilter>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("week");
  const [showFilters, setShowFilters] = useState(false);

  const currentUser = players.find((p) => p.isCurrentUser);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="size-8 animate-spin text-[#D4A843]" />
      </div>
    );
  }

  const filtered = players.filter((p) => {
    if (gameFilter === "mlbb") return p.game === "MLBB";
    if (gameFilter === "ff") return p.game === "FF";
    return true;
  }).sort((a, b) => getScoreForTab(b, activeTab) - getScoreForTab(a, activeTab));

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

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
              Leaderboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Lihat ranking pemain terbaik di IXON Academy
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors sm:hidden"
          >
            <Filter className="size-4" />
            Filter
            <ChevronDown
              className={`size-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </motion.section>

      {/* ─── Tabs ────────────────────────────────────────────────────── */}
      <motion.section variants={item}>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#D4A843]/15 text-[#D4A843] border border-[#D4A843]/30"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-transparent"
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Filters ─────────────────────────────────────────────────── */}
      <motion.section
        variants={item}
        className={`flex flex-wrap gap-2 ${showFilters ? "" : "hidden sm:flex"}`}
      >
        <div className="flex gap-1.5 rounded-lg bg-white/5 p-1">
          {GAME_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setGameFilter(f.key)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                gameFilter === f.key
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 rounded-lg bg-white/5 p-1">
          {TIME_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setTimeFilter(f.key)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                timeFilter === f.key
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.section>

      {/* ─── Top 3 Podium ────────────────────────────────────────────── */}
      <motion.section variants={item}>
        <div className="grid grid-cols-3 gap-3">
          {/* Reorder: 2nd, 1st, 3rd for podium layout */}
          {[top3[1], top3[0], top3[2]].map((player, visualIdx) => {
            if (!player) return <div key={visualIdx} />;
            const actualRank = visualIdx === 0 ? 2 : visualIdx === 1 ? 1 : 3;
            const isFirst = actualRank === 1;
            const medalEmoji = rankMedals[actualRank];

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + visualIdx * 0.1 }}
                className={`
                  rounded-2xl border bg-card p-4 text-center space-y-3 transition-all
                  ${
                    isFirst
                      ? "border-[#D4A843]/30 shadow-[0_0_30px_rgba(212,168,67,0.1)] -mt-2 md:-mt-4"
                      : "border-white/5 mt-2 md:mt-4"
                  }
                  ${player.isCurrentUser ? "ring-1 ring-[#D4A843]/40" : ""}
                `}
              >
                {/* Medal */}
                <div className="text-3xl md:text-4xl">{medalEmoji}</div>

                {/* Avatar */}
                <div
                  className={`
                    mx-auto rounded-full flex items-center justify-center font-bold text-black
                    ${
                      isFirst
                        ? "size-16 md:size-20 text-xl md:text-2xl bg-gradient-to-br from-[#D4A843] to-[#B8922E]"
                        : "size-12 md:size-16 text-base md:text-lg bg-gradient-to-br from-white/20 to-white/10 text-foreground"
                    }
                  `}
                >
                  {player.initials}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <p
                    className={`font-heading font-bold truncate ${
                      isFirst ? "text-base md:text-lg" : "text-sm"
                    } ${player.isCurrentUser ? "text-[#D4A843]" : "text-foreground"}`}
                  >
                    {player.nickname}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    <TierBadge tier={player.tier} size="sm" />
                    <GameBadge game={player.game} size="sm" />
                  </div>
                </div>

                {/* Score */}
                <p
                  className={`font-heading font-bold ${
                    isFirst ? "text-xl md:text-2xl text-[#D4A843]" : "text-lg text-foreground"
                  }`}
                >
                  {formatScore(getScoreForTab(player, activeTab), activeTab)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Rest of the Table ────────────────────────────────────────── */}
      {rest.length > 0 && (
        <motion.section variants={item}>
          <div className="rounded-2xl border border-white/5 bg-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[32px_1fr_auto] md:grid-cols-[50px_1fr_100px_100px_120px] gap-2 px-4 py-3 border-b border-white/5 text-xs font-semibold text-muted-foreground">
              <span>#</span>
              <span>Player</span>
              <span className="hidden md:block">Rank</span>
              <span className="hidden md:block">Role</span>
              <span className="text-right">Score</span>
            </div>

            {/* Rows */}
            {rest.map((player, idx) => {
              const rank = idx + 4;
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className={`
                    grid grid-cols-[32px_1fr_auto] md:grid-cols-[50px_1fr_100px_100px_120px] gap-2 px-4 py-3 items-center
                    hover:bg-white/[0.02] transition-colors
                    ${player.isCurrentUser ? "bg-[#D4A843]/5 border-l-2 border-l-[#D4A843]" : ""}
                    ${idx < rest.length - 1 ? "border-b border-white/5" : ""}
                  `}
                >
                  {/* Rank */}
                  <span className="text-sm font-bold text-muted-foreground">
                    {rank}
                  </span>

                  {/* Player info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`size-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        player.isCurrentUser
                          ? "bg-gradient-to-br from-[#D4A843] to-[#B8922E] text-black"
                          : "bg-white/10 text-foreground"
                      }`}
                    >
                      {player.initials}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold truncate ${
                          player.isCurrentUser ? "text-[#D4A843]" : "text-foreground"
                        }`}
                      >
                        {player.nickname}
                        {player.isCurrentUser && (
                          <span className="text-[10px] ml-1.5 text-[#D4A843]/70">
                            (Kamu)
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-1.5 md:hidden">
                        <TierBadge tier={player.tier} size="sm" />
                      </div>
                    </div>
                  </div>

                  {/* Tier */}
                  <div className="hidden md:block">
                    <TierBadge tier={player.tier} size="sm" />
                  </div>

                  {/* Role */}
                  <span className="hidden md:block text-xs text-muted-foreground truncate">
                    {player.role}
                  </span>

                  {/* Score */}
                  <p
                    className={`text-right text-sm font-bold ${
                      player.isCurrentUser ? "text-[#D4A843]" : "text-foreground"
                    }`}
                  >
                    {formatScore(getScoreForTab(player, activeTab), activeTab)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* ─── Current User Position (if not in top visible) ───────────── */}
      {currentUser && (() => {
        const currentUserRank = filtered.findIndex((p) => p.isCurrentUser) + 1;
        const topScore = filtered.length > 0 ? getScoreForTab(filtered[0], activeTab) : 0;
        const myScore = getScoreForTab(currentUser, activeTab);
        const gap = topScore - myScore;
        const gapLabel =
          activeTab === "xp"
            ? `${gap.toLocaleString()} XP ke #1`
            : activeTab === "reputation"
              ? `${gap.toLocaleString()} Rep ke #1`
              : `${gap} poin ke #1`;

        return (
          <motion.section variants={item} className="pb-4">
            <div className="rounded-xl border border-[#D4A843]/20 bg-[#D4A843]/5 p-4 flex items-center gap-4">
              <div className="size-10 rounded-full bg-gradient-to-br from-[#D4A843] to-[#B8922E] flex items-center justify-center text-sm font-bold text-black shrink-0">
                {currentUser.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#D4A843]">Posisi Kamu</p>
                <p className="text-xs text-muted-foreground">
                  Rank #{currentUserRank} dari {filtered.length} pemain
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-heading font-bold text-[#D4A843] text-lg">
                  {formatScore(myScore, activeTab)}
                </p>
                {currentUserRank > 1 && (
                  <p className="text-[10px] text-muted-foreground">
                    {gapLabel}
                  </p>
                )}
              </div>
            </div>
          </motion.section>
        );
      })()}
    </motion.div>
  );
}
