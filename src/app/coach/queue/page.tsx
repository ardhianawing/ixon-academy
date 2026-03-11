"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Inbox,
  Loader2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Gamepad2,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const stats = [
  { label: "Total Queue", value: 5, icon: Inbox, color: "text-[#D4A843]", bg: "bg-[#D4A843]/10" },
  { label: "In Review", value: 1, icon: Loader2, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Completed Today", value: 3, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const initialQueue = [
  {
    id: "sub-001",
    player: "TENSAI",
    game: "MLBB",
    hero: "Hayabusa",
    timeAgo: "2 jam lalu",
    slaSeconds: 78300, // 21:45:00
    urgent: false,
  },
  {
    id: "sub-002",
    player: "IXONReaper",
    game: "MLBB",
    hero: "Chou",
    timeAgo: "5 jam lalu",
    slaSeconds: 66600, // 18:30:00
    urgent: false,
  },
  {
    id: "sub-003",
    player: "ShadowFF",
    game: "FF",
    hero: "Chrono",
    timeAgo: "1 hari lalu",
    slaSeconds: 8100, // 02:15:00
    urgent: true,
  },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function formatSLA(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function CoachQueuePage() {
  const [queue, setQueue] = useState(initialQueue);

  useEffect(() => {
    const id = setInterval(() => {
      setQueue((prev) =>
        prev.map((q) => ({
          ...q,
          slaSeconds: Math.max(0, q.slaSeconds - 1),
          urgent: q.slaSeconds - 1 <= 10800, // < 3 hours
        }))
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading font-bold text-2xl text-foreground flex items-center gap-2">
          <Inbox className="size-6 text-[#D4A843]" />
          Review Queue
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola submission yang masuk dan mulai review
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        {stats.map((st) => (
          <div
            key={st.label}
            className="rounded-xl border border-white/5 bg-card p-4 flex items-center gap-3"
          >
            <div className={`size-10 rounded-xl ${st.bg} flex items-center justify-center shrink-0`}>
              <st.icon className={`size-5 ${st.color}`} />
            </div>
            <div>
              <p className="font-heading font-bold text-xl text-foreground">
                {st.value}
              </p>
              <p className="text-xs text-muted-foreground">{st.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Queue List */}
      <div className="space-y-3">
        {queue.map((q) => (
          <motion.div key={q.id} variants={item}>
            <div
              className={`rounded-xl border bg-card p-5 transition-all ${
                q.urgent
                  ? "border-red-500/30 hover:border-red-500/50"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-foreground">
                      {q.player[0]}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">
                        {q.player}
                      </h3>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                        {q.game}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {q.hero}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{q.timeAgo}</span>
                      <span className="text-white/10">|</span>
                      <span
                        className={`flex items-center gap-1 font-mono font-semibold ${
                          q.urgent ? "text-red-400" : "text-muted-foreground"
                        }`}
                      >
                        {q.urgent && <AlertTriangle className="size-3" />}
                        <Clock className="size-3" />
                        SLA: {formatSLA(q.slaSeconds)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <Link href={`/review/${q.id}`}>
                  <button className="rounded-xl bg-[#D4A843]/10 hover:bg-[#D4A843]/20 text-[#D4A843] font-semibold text-sm px-4 py-2.5 transition-colors flex items-center gap-1.5 shrink-0">
                    <Gamepad2 className="size-4" />
                    Mulai Review
                    <ChevronRight className="size-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
