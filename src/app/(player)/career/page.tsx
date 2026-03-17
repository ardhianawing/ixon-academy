"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  ChevronRight,
  Lock,
  Mic,
  BarChart3,
  Smartphone,
  Megaphone,
  Palette,
  Video,
  Loader2,
} from "lucide-react";
import { useCareerData, type CareerPathway } from "@/hooks/useCareerData";

// ── Icon Map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Mic,
  BarChart3,
  Smartphone,
  Megaphone,
  Palette,
  Video,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ── Animation Variants ───────────────────────────────────────────────────────

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

// ── Pathway Card ─────────────────────────────────────────────────────────────

function PathwayCard({
  pathway,
  index,
}: {
  pathway: CareerPathway;
  index: number;
}) {
  const CardWrapper = pathway.available ? Link : "div";
  const linkProps = pathway.available
    ? { href: `/career/${pathway.id}` }
    : {};
  const Icon = ICON_MAP[pathway.iconName] || Mic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" as const }}
    >
      {/* @ts-expect-error polymorphic wrapper */}
      <CardWrapper
        {...linkProps}
        className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
          pathway.available
            ? "border-white/8 bg-[#1A2332] hover:border-[#D4A843]/30 hover:shadow-[0_0_30px_-5px_rgba(212,168,67,0.12)] cursor-pointer"
            : "border-white/5 bg-[#1A2332]/40 opacity-50 cursor-not-allowed"
        }`}
      >
        {/* Header */}
        <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-[#0B1120] to-[#1A2332]">
          <span className="text-5xl">{pathway.emoji}</span>
          {!pathway.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-1.5">
                <Lock className="size-6 text-[#94A3B8]" />
                <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-[#94A3B8]">
                  Coming Soon
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Icon + Title */}
          <div className="flex items-start gap-3">
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${pathway.bgColor}`}
            >
              <Icon className={`size-4.5 ${pathway.iconColor}`} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-snug">
                {pathway.title}
              </h3>
              <div className="mt-1 flex items-center gap-3 text-xs text-[#64748B]">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {pathway.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed text-[#94A3B8]">
            {pathway.description}
          </p>

          {/* Outcomes */}
          <div className="space-y-1.5">
            {pathway.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-2 text-xs text-[#94A3B8]"
              >
                <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-emerald-400/60" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="mt-auto pt-3 space-y-3">
            <p className="text-lg font-bold text-[#D4A843]">
              {formatRupiah(pathway.price)}
            </p>
            {pathway.available && (
              <div className="flex items-center justify-center gap-1.5 rounded-xl bg-[#D4A843]/10 py-2.5 text-sm font-semibold text-[#D4A843] transition-all group-hover:bg-[#D4A843]/20">
                Pelajari Selengkapnya
                <ChevronRight className="size-4" />
              </div>
            )}
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
}

// ── Page Component ───────────────────────────────────────────────────────────

export default function CareerPage() {
  const { data: pathways, loading } = useCareerData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  const availablePathways = pathways.filter((p) => p.available);
  const comingSoonPathways = pathways.filter((p) => !p.available);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#D4A843]/10">
            <Briefcase className="size-5 text-[#D4A843]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Career Pathways
            </h1>
            <p className="text-sm text-[#94A3B8]">
              Bangun karir di industri esports
            </p>
          </div>
        </div>
      </motion.div>

      {/* Available Pathways */}
      <motion.section variants={item} className="space-y-3">
        <h2 className="font-bold text-white">Program Tersedia</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availablePathways.map((pathway, i) => (
            <PathwayCard key={pathway.id} pathway={pathway} index={i} />
          ))}
        </div>
      </motion.section>

      {/* Coming Soon */}
      <motion.section variants={item} className="space-y-3 pb-4">
        <h2 className="font-bold text-white">Segera Hadir</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoonPathways.map((pathway, i) => (
            <PathwayCard
              key={pathway.id}
              pathway={pathway}
              index={i + availablePathways.length}
            />
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
