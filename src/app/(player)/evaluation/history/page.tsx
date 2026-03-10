"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ClipboardList,
  ChevronRight,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";

const statusMap = {
  completed: {
    label: "Completed",
    cls: "bg-emerald-500/15 text-emerald-400",
    icon: CheckCircle2,
  },
  "in-review": {
    label: "In Review",
    cls: "bg-blue-500/15 text-blue-400",
    icon: Loader2,
  },
  queued: {
    label: "Queued",
    cls: "bg-amber-500/15 text-amber-400",
    icon: Clock,
  },
} as const;

const submissions = [
  {
    id: "rev-001",
    hero: "Hayabusa",
    game: "MLBB",
    date: "8 Mar 2026",
    status: "completed" as const,
    coach: "Coach Alex",
  },
  {
    id: "rev-002",
    hero: "Ling",
    game: "MLBB",
    date: "5 Mar 2026",
    status: "in-review" as const,
    coach: "Coach Mira",
  },
  {
    id: "rev-003",
    hero: "Fanny",
    game: "MLBB",
    date: "1 Mar 2026",
    status: "queued" as const,
    coach: null,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ReviewHistoryPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading font-bold text-2xl text-foreground flex items-center gap-2">
          <ClipboardList className="size-6 text-[#D4A843]" />
          Review History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Riwayat submission gameplay dan status review kamu
        </p>
      </motion.div>

      {/* Submissions List */}
      <div className="space-y-3">
        {submissions.map((sub) => {
          const st = statusMap[sub.status];
          const StatusIcon = st.icon;

          return (
            <motion.div key={sub.id} variants={item}>
              <Link href={`/evaluation/${sub.id}`}>
                <div className="rounded-xl border border-white/5 bg-card p-5 hover:border-white/10 hover:bg-white/[0.02] transition-all group">
                  <div className="flex items-center justify-between">
                    {/* Left info */}
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Hero avatar placeholder */}
                      <div className="size-12 rounded-xl bg-gradient-to-br from-[#D4A843]/20 to-[#D4A843]/5 flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-[#D4A843]">
                          {sub.hero[0]}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">
                            {sub.hero}
                          </h3>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                            {sub.game}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{sub.date}</span>
                          {sub.coach && (
                            <>
                              <span className="text-white/10">|</span>
                              <span>{sub.coach}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: status + chevron */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${st.cls}`}
                      >
                        <StatusIcon className={`size-3 ${sub.status === "in-review" ? "animate-spin" : ""}`} />
                        {st.label}
                      </span>
                      <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
