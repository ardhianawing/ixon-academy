"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  ChevronRight,
  Gamepad2,
  Trophy,
  Zap,
  Clock,
  CheckCircle2,
  Eye,
} from "lucide-react";

import { TierBadge } from "@/components/ui/TierBadge";
import { GameBadge } from "@/components/ui/GameBadge";

// ─── Mock Data ────────────────────────────────────────────────────────────────

type EventStatus = "upcoming" | "live" | "completed";

interface EventItem {
  id: string;
  title: string;
  status: EventStatus;
  date: string;
  format: string;
  game: string;
  minTier: string;
  slots: string;
  slotsTotal: number;
  slotsFilled: number;
}

const events: EventItem[] = [
  {
    id: "weekly-scrim-12",
    title: "IXON Weekly Scrim #12",
    status: "upcoming",
    date: "15 Mar 2026",
    format: "5v5",
    game: "MLBB",
    minTier: "SILVER",
    slots: "24/32 slot",
    slotsTotal: 32,
    slotsFilled: 24,
  },
  {
    id: "rookie-tournament-s1",
    title: "IXON Rookie Tournament S1",
    status: "upcoming",
    date: "22 Mar 2026",
    format: "Tournament 5v5",
    game: "MLBB",
    minTier: "GOLD",
    slots: "12/16 slot",
    slotsTotal: 16,
    slotsFilled: 12,
  },
  {
    id: "solo-showdown-1",
    title: "1v1 Solo Showdown",
    status: "completed",
    date: "1 Mar 2026",
    format: "1v1",
    game: "MLBB",
    minTier: "FREE",
    slots: "32/32 slot",
    slotsTotal: 32,
    slotsFilled: 32,
  },
];

const tabs: { key: EventStatus; label: string; icon: React.ElementType }[] = [
  { key: "upcoming", label: "Upcoming", icon: Clock },
  { key: "live", label: "Live", icon: Zap },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: EventStatus }) {
  const map = {
    upcoming: {
      label: "Pendaftaran Dibuka",
      cls: "bg-blue-500/15 text-blue-400",
    },
    live: { label: "Sedang Berlangsung", cls: "bg-emerald-500/15 text-emerald-400" },
    completed: { label: "Selesai", cls: "bg-white/10 text-muted-foreground" },
  };
  const cfg = map[status];
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${cfg.cls}`}
    >
      {cfg.label}
    </span>
  );
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<EventStatus>("upcoming");

  const filtered = events.filter((e) => e.status === activeTab);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading font-bold text-2xl text-foreground">
          Events
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ikuti turnamen, scrim, dan event kompetitif IXON Academy.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item} className="flex gap-1 bg-card rounded-xl p-1 border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all
              ${
                activeTab === tab.key
                  ? "bg-[#D4A843]/15 text-[#D4A843]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }
            `}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Event Cards */}
      <motion.div variants={item} className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-card p-12 text-center">
            <Trophy className="size-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Belum ada event di kategori ini.
            </p>
          </div>
        ) : (
          filtered.map((ev) => (
            <div
              key={ev.id}
              className="rounded-xl border border-white/5 bg-card p-5 md:p-6 space-y-4 hover:border-white/10 transition-colors"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {ev.title}
                    </h3>
                    <StatusBadge status={ev.status} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {ev.date}
                  </div>
                </div>
                <GameBadge game={ev.game} />
              </div>

              {/* Meta Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400">
                  {ev.format}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground flex items-center gap-1">
                  <Users className="size-3" />
                  {ev.slots}
                </span>
                <TierBadge tier={ev.minTier} size="sm" />
                <span className="text-[10px] text-muted-foreground">
                  min. required
                </span>
              </div>

              {/* Slot Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Slot terisi</span>
                  <span className="text-foreground font-medium">
                    {ev.slotsFilled}/{ev.slotsTotal}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#D4A843] transition-all duration-500"
                    style={{
                      width: `${(ev.slotsFilled / ev.slotsTotal) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/events/${ev.id}`}>
                {ev.status === "completed" ? (
                  <button className="w-full rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-semibold text-sm py-2.5 transition-colors flex items-center justify-center gap-1.5">
                    <Eye className="size-4" />
                    Lihat Hasil
                    <ChevronRight className="size-3.5" />
                  </button>
                ) : (
                  <button className="w-full rounded-lg bg-[#D4A843]/10 hover:bg-[#D4A843]/20 text-[#D4A843] font-semibold text-sm py-2.5 transition-colors flex items-center justify-center gap-1.5">
                    <Gamepad2 className="size-4" />
                    Daftar
                    <ChevronRight className="size-3.5" />
                  </button>
                )}
              </Link>
            </div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
