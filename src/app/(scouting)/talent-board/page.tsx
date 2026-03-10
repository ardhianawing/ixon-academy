"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  Eye,
  UserPlus,
  Trophy,
  Target,
  Brain,
  Flame,
} from "lucide-react";

import { GameBadge } from "@/components/ui/GameBadge";
import { TalentScoreCircle } from "@/components/ui/TalentScoreCircle";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Player {
  id: string;
  nickname: string;
  avatar: string;
  game: string;
  rank: string;
  role: string;
  talentScore: number;
  skill: number;
  mindset: number;
  commitment: number;
  shortlisted: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const initialPlayers: Player[] = [
  {
    id: "phoenix-blade",
    nickname: "PhoenixBlade",
    avatar: "PB",
    game: "MLBB",
    rank: "Mythical Honor",
    role: "Gold Laner",
    talentScore: 87,
    skill: 90,
    mindset: 85,
    commitment: 82,
    shortlisted: true,
  },
  {
    id: "tensai",
    nickname: "TENSAI",
    avatar: "TS",
    game: "MLBB",
    rank: "Mythical Glory",
    role: "Jungler",
    talentScore: 78,
    skill: 82,
    mindset: 75,
    commitment: 72,
    shortlisted: false,
  },
  {
    id: "ixon-reaper",
    nickname: "IXONReaper",
    avatar: "IR",
    game: "MLBB",
    rank: "Mythic",
    role: "EXP Laner",
    talentScore: 72,
    skill: 70,
    mindset: 78,
    commitment: 68,
    shortlisted: false,
  },
  {
    id: "shadow-ff",
    nickname: "ShadowFF",
    avatar: "SF",
    game: "FF",
    rank: "Grandmaster",
    role: "Rusher",
    talentScore: 65,
    skill: 60,
    mindset: 70,
    commitment: 65,
    shortlisted: false,
  },
  {
    id: "ace-hunter",
    nickname: "AceHunter",
    avatar: "AH",
    game: "MLBB",
    rank: "Legend",
    role: "Roamer",
    talentScore: 45,
    skill: 40,
    mindset: 55,
    commitment: 42,
    shortlisted: false,
  },
];

const SCOUTING_THRESHOLD = 85;

// ─── Signal Bar ───────────────────────────────────────────────────────────────

function SignalBar({
  value,
  label,
  icon: Icon,
}: {
  value: number;
  label: string;
  icon: React.ElementType;
}) {
  const color =
    value >= 85
      ? "bg-emerald-400"
      : value >= 70
        ? "bg-amber-400"
        : "bg-red-400";

  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <Icon className="size-3.5 text-muted-foreground shrink-0" />
      <div className="flex-1 space-y-0.5">
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">{label}</span>
          <span className="text-foreground font-semibold">{value}</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full ${color} transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Score Color ──────────────────────────────────────────────────────────────

function getScoreColor(score: number) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-400";
  return "text-red-400";
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function TalentBoardPage() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [activeTab, setActiveTab] = useState<"all" | "shortlist">("all");
  const [gameFilter, setGameFilter] = useState<string>("All");
  const [rankFilter, setRankFilter] = useState<string>("All");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [scoreRange, setScoreRange] = useState<number>(0);

  const toggleShortlist = (id: string) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, shortlisted: !p.shortlisted } : p
      )
    );
  };

  const filteredPlayers = useMemo(() => {
    let result = [...players];

    if (activeTab === "shortlist") {
      result = result.filter((p) => p.shortlisted);
    }

    if (gameFilter !== "All") {
      result = result.filter((p) => p.game === gameFilter);
    }
    if (rankFilter !== "All") {
      result = result.filter((p) => p.rank === rankFilter);
    }
    if (roleFilter !== "All") {
      result = result.filter((p) => p.role === roleFilter);
    }
    if (scoreRange > 0) {
      result = result.filter((p) => p.talentScore >= scoreRange);
    }

    return result.sort((a, b) => b.talentScore - a.talentScore);
  }, [players, activeTab, gameFilter, rankFilter, roleFilter, scoreRange]);

  const uniqueRanks = [...new Set(initialPlayers.map((p) => p.rank))];
  const uniqueRoles = [...new Set(initialPlayers.map((p) => p.role))];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading font-bold text-2xl text-foreground">
          Talent Board
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Temukan dan rekrut talenta terbaik untuk tim esports kamu.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        variants={item}
        className="flex gap-1 bg-card rounded-xl p-1 border border-white/5 max-w-xs"
      >
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
            activeTab === "all"
              ? "bg-[#D4A843]/15 text-[#D4A843]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          }`}
        >
          <Search className="size-4 inline mr-1.5" />
          Semua Pemain
        </button>
        <button
          onClick={() => setActiveTab("shortlist")}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
            activeTab === "shortlist"
              ? "bg-[#D4A843]/15 text-[#D4A843]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          }`}
        >
          <Star className="size-4 inline mr-1.5" />
          Shortlist
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={item}
        className="rounded-xl border border-white/5 bg-card p-4 space-y-4"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Filter className="size-4 text-[#D4A843]" />
          Filter
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Game Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Game
            </label>
            <select
              value={gameFilter}
              onChange={(e) => setGameFilter(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50"
            >
              <option value="All">All</option>
              <option value="MLBB">MLBB</option>
              <option value="FF">Free Fire</option>
            </select>
          </div>

          {/* Rank Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Rank
            </label>
            <select
              value={rankFilter}
              onChange={(e) => setRankFilter(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50"
            >
              <option value="All">All</option>
              {uniqueRanks.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Role Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50"
            >
              <option value="All">All</option>
              {uniqueRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Score Range Slider */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Min Score: {scoreRange}
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={scoreRange}
              onChange={(e) => setScoreRange(Number(e.target.value))}
              className="w-full accent-[#D4A843] h-2"
            />
          </div>
        </div>
      </motion.div>

      {/* Scouting Threshold Indicator */}
      <motion.div
        variants={item}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5"
      >
        <Trophy className="size-4 text-emerald-400" />
        <span className="text-xs text-emerald-400 font-semibold">
          Scouting Threshold: {SCOUTING_THRESHOLD}+
        </span>
        <span className="text-xs text-muted-foreground">
          Pemain dengan score di atas threshold ditandai sebagai top talent.
        </span>
      </motion.div>

      {/* Player Grid */}
      <motion.div variants={item} className="space-y-3">
        {filteredPlayers.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-card p-12 text-center">
            <Search className="size-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {activeTab === "shortlist"
                ? "Belum ada pemain di shortlist."
                : "Tidak ada pemain yang cocok dengan filter."}
            </p>
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <div
              key={player.id}
              className={`rounded-xl border bg-card p-4 md:p-5 transition-colors ${
                player.talentScore >= SCOUTING_THRESHOLD
                  ? "border-emerald-500/20 hover:border-emerald-500/30"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Avatar + Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative shrink-0">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-[#D4A843]/30 to-[#D4A843]/10 flex items-center justify-center text-sm font-bold text-[#D4A843]">
                      {player.avatar}
                    </div>
                    {player.talentScore >= SCOUTING_THRESHOLD && (
                      <span className="absolute -top-1 -right-1 size-4 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Trophy className="size-2.5 text-black" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-foreground">
                        {player.nickname}
                      </span>
                      <GameBadge game={player.game} size="sm" />
                      {player.shortlisted && (
                        <Star className="size-3.5 text-[#D4A843] fill-[#D4A843]" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{player.rank}</span>
                      <span className="text-white/10">|</span>
                      <span>{player.role}</span>
                    </div>
                  </div>
                </div>

                {/* Talent Score (large) */}
                <div className="shrink-0">
                  <TalentScoreCircle
                    score={player.talentScore}
                    size={64}
                    strokeWidth={5}
                  />
                </div>

                {/* Signal Bars */}
                <div className="flex flex-col gap-1.5 min-w-[140px]">
                  <SignalBar
                    value={player.skill}
                    label="Skill"
                    icon={Target}
                  />
                  <SignalBar
                    value={player.mindset}
                    label="Mindset"
                    icon={Brain}
                  />
                  <SignalBar
                    value={player.commitment}
                    label="Commit"
                    icon={Flame}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex md:flex-col gap-2 shrink-0">
                  <Link href={`/invite/${player.id}`} className="flex-1 md:flex-none">
                    <button className="w-full rounded-lg bg-[#D4A843]/10 hover:bg-[#D4A843]/20 text-[#D4A843] font-semibold text-xs py-2 px-3 transition-colors flex items-center justify-center gap-1.5">
                      <UserPlus className="size-3.5" />
                      Undang Trial
                    </button>
                  </Link>
                  <button
                    onClick={() => toggleShortlist(player.id)}
                    className={`flex-1 md:flex-none rounded-lg font-semibold text-xs py-2 px-3 transition-colors flex items-center justify-center gap-1.5 ${
                      player.shortlisted
                        ? "bg-[#D4A843]/15 text-[#D4A843]"
                        : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                    }`}
                  >
                    <Star
                      className={`size-3.5 ${player.shortlisted ? "fill-[#D4A843]" : ""}`}
                    />
                    Shortlist
                  </button>
                  <Link
                    href={`/dashboard`}
                    className="flex-1 md:flex-none"
                  >
                    <button className="w-full rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-semibold text-xs py-2 px-3 transition-colors flex items-center justify-center gap-1.5">
                      <Eye className="size-3.5" />
                      Lihat Profil
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
