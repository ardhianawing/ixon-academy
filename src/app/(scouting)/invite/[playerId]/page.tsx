"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Calendar,
  MapPin,
  MessageSquare,
  Target,
  Brain,
  Flame,
  Trophy,
  User,
} from "lucide-react";

import { GameBadge } from "@/components/ui/GameBadge";
import { TalentScoreCircle } from "@/components/ui/TalentScoreCircle";

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface PlayerProfile {
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
}

const playersData: Record<string, PlayerProfile> = {
  "phoenix-blade": {
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
  },
  tensai: {
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
  },
  "ixon-reaper": {
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
  },
  "shadow-ff": {
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
  },
  "ace-hunter": {
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
  },
};

// ─── Signal Stat Row ──────────────────────────────────────────────────────────

function StatRow({
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

  const textColor =
    value >= 85
      ? "text-emerald-400"
      : value >= 70
        ? "text-amber-400"
        : "text-red-400";

  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 text-muted-foreground shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span className={`font-bold ${textColor}`}>{value}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full ${color} transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function InviteTrialPage() {
  const params = useParams();
  const playerId = params.playerId as string;
  const player = playersData[playerId];

  const [message, setMessage] = useState("");
  const [trialDate, setTrialDate] = useState("");
  const [trialLocation, setTrialLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!player) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <User className="size-12 text-muted-foreground/50 mx-auto mb-4" />
        <h2 className="font-heading font-bold text-xl text-foreground mb-2">
          Pemain Tidak Ditemukan
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Pemain yang kamu cari tidak tersedia.
        </p>
        <Link
          href="/talent-board"
          className="text-[#D4A843] text-sm font-semibold hover:underline"
        >
          Kembali ke Talent Board
        </Link>
      </div>
    );
  }

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="size-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center mx-auto">
            <Send className="size-8 text-emerald-400" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-foreground">
            Undangan Terkirim!
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Undangan trial untuk{" "}
            <span className="text-[#D4A843] font-semibold">
              {player.nickname}
            </span>{" "}
            telah berhasil dikirim. Kamu akan mendapat notifikasi saat pemain
            merespon.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Link href="/talent-board">
              <button className="rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-semibold text-sm py-2.5 px-5 transition-colors">
                Kembali ke Talent Board
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-3xl mx-auto"
    >
      {/* Back Link */}
      <motion.div variants={item}>
        <Link
          href="/talent-board"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Talent Board
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading font-bold text-2xl text-foreground">
          Undang Trial
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kirim undangan trial untuk mengevaluasi pemain secara langsung.
        </p>
      </motion.div>

      {/* Player Summary Card */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-5 md:p-6"
      >
        <div className="flex flex-col md:flex-row gap-5">
          {/* Left: Avatar + Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="relative shrink-0">
              <div className="size-16 rounded-xl bg-gradient-to-br from-[#D4A843]/30 to-[#D4A843]/10 flex items-center justify-center text-lg font-bold text-[#D4A843]">
                {player.avatar}
              </div>
              {player.talentScore >= 85 && (
                <span className="absolute -top-1 -right-1 size-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Trophy className="size-3 text-black" />
                </span>
              )}
            </div>

            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-heading font-bold text-lg text-foreground">
                  {player.nickname}
                </span>
                <GameBadge game={player.game} size="sm" />
              </div>
              <div className="text-sm text-muted-foreground space-y-0.5">
                <p>Rank: {player.rank}</p>
                <p>Role: {player.role}</p>
              </div>
            </div>
          </div>

          {/* Right: Talent Score */}
          <div className="shrink-0 flex items-center justify-center">
            <TalentScoreCircle
              score={player.talentScore}
              size={100}
              strokeWidth={7}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 pt-5 border-t border-white/5 space-y-3">
          <StatRow value={player.skill} label="Skill" icon={Target} />
          <StatRow value={player.mindset} label="Mindset" icon={Brain} />
          <StatRow value={player.commitment} label="Commitment" icon={Flame} />
        </div>
      </motion.section>

      {/* Invite Form */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-5 md:p-6 space-y-5"
      >
        <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
          <Send className="size-5 text-[#D4A843]" />
          Detail Undangan
        </h2>

        <div className="space-y-4">
          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <MessageSquare className="size-4 text-muted-foreground" />
              Pesan
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan undangan untuk pemain..."
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843]/50 transition-colors resize-none"
            />
          </div>

          {/* Trial Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Calendar className="size-4 text-muted-foreground" />
              Tanggal Trial
            </label>
            <input
              type="date"
              value={trialDate}
              onChange={(e) => setTrialDate(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843]/50 transition-colors [color-scheme:dark]"
            />
          </div>

          {/* Trial Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <MapPin className="size-4 text-muted-foreground" />
              Lokasi Trial
            </label>
            <input
              type="text"
              value={trialLocation}
              onChange={(e) => setTrialLocation(e.target.value)}
              placeholder="Contoh: Discord Server IXON, Custom Room MLBB..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843]/50 transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-[#D4A843] hover:bg-[#C49A3A] text-black font-semibold text-sm py-3 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="size-4" />
          Kirim Undangan Trial
        </button>
      </motion.section>
    </motion.div>
  );
}
