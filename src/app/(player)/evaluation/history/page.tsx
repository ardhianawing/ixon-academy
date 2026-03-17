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
import { useEvalHistoryData } from "@/hooks/useEvalHistoryData";

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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ReviewHistoryPage() {
  const { data: submissions, loading } = useEvalHistoryData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

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
                <div className="rounded-xl border border-white/5 bg-card p-4 hover:border-white/10 hover:bg-white/[0.02] transition-all group">
                  <div className="flex items-center gap-3">
                    {/* Hero avatar */}
                    <div className="size-11 rounded-xl bg-gradient-to-br from-[#D4A843]/20 to-[#D4A843]/5 flex items-center justify-center shrink-0">
                      <span className="text-base font-bold text-[#D4A843]">
                        {sub.hero[0]}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-foreground truncate">
                          {sub.hero}
                        </h3>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 shrink-0">
                          {sub.game}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                        <span>{sub.date}</span>
                        {sub.coach && (
                          <>
                            <span className="text-white/10">·</span>
                            <span className="truncate">{sub.coach}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Status + chevron */}
                    <span
                      className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${st.cls}`}
                    >
                      <StatusIcon className={`size-3 ${sub.status === "in-review" ? "animate-spin" : ""}`} />
                      {st.label}
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
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
