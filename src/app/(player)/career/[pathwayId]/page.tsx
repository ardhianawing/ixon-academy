"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Users,
  CheckCircle2,
  Award,
  ShieldCheck,
  BookOpen,
  Target,
  Star,
  Mic,
  BarChart3,
  Smartphone,
  Loader2,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useCareerDetailData, isValidPathway } from "@/hooks/useCareerDetailData";

// ── Icon Map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Mic,
  BarChart3,
  Smartphone,
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ── Page Component ───────────────────────────────────────────────────────────

export default function PathwayDetailPage({
  params,
}: {
  params: Promise<{ pathwayId: string }>;
}) {
  const { pathwayId } = use(params);
  const { data: pathway, loading } = useCareerDetailData(pathwayId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  if (!isValidPathway(pathwayId)) {
    return (
      <div className="mx-auto max-w-4xl py-20 text-center">
        <p className="text-lg text-[#94A3B8]">Pathway tidak ditemukan.</p>
        <Link
          href="/career"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#D4A843] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Career
        </Link>
      </div>
    );
  }

  const Icon = ICON_MAP[pathway.iconName] || Mic;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-4xl space-y-6"
    >
      {/* Back Link */}
      <motion.div variants={itemVariant}>
        <Link
          href="/career"
          className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Career Pathways
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.section variants={itemVariant}>
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#1A2332]">
          {/* Banner */}
          <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#0B1120] via-[#1A2332] to-[#0B1120]">
            <span className="text-7xl">{pathway.emoji}</span>
          </div>

          {/* Info */}
          <div className="p-5 md:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${pathway.bgColor}`}
              >
                <Icon className={`size-5 ${pathway.iconColor}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white sm:text-2xl">
                  {pathway.title}
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {pathway.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5" />
                    {pathway.totalStudents} siswa
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5 text-[#D4A843]" />
                    <span className="text-[#D4A843] font-semibold">
                      {pathway.rating}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Overview */}
      <motion.section variants={itemVariant}>
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-white">
            <BookOpen className="size-4 text-[#D4A843]" />
            Tentang Program
          </h2>
          <div className="space-y-3">
            {pathway.description.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-[#94A3B8]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Suitable For + Prerequisites */}
      <motion.section variants={itemVariant}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Suitable For */}
          <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <Target className="size-4 text-emerald-400" />
              Siapa yang Cocok?
            </h3>
            <div className="space-y-2">
              {pathway.suitableFor.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-xs text-[#94A3B8]"
                >
                  <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-emerald-400/60" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <ShieldCheck className="size-4 text-amber-400" />
              Prasyarat
            </h3>
            <div className="space-y-2">
              {pathway.prerequisites.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-xs text-[#94A3B8]"
                >
                  <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-amber-400/60" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Curriculum */}
      <motion.section variants={itemVariant}>
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-white">
            <BookOpen className="size-4 text-blue-400" />
            Kurikulum
          </h2>
          <Accordion>
            {pathway.modules.map((mod, i) => (
              <AccordionItem key={i} className="border-white/5">
                <AccordionTrigger className="text-white hover:no-underline">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-semibold">{mod.title}</span>
                    <span className="text-[10px] font-medium text-[#64748B]">
                      {mod.weeks}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-1">
                    {mod.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-start gap-2 text-xs text-[#94A3B8]"
                      >
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#D4A843]/50" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Outcomes */}
      <motion.section variants={itemVariant}>
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-white">
            <Target className="size-4 text-emerald-400" />
            Setelah Lulus, Kamu Bisa...
          </h2>
          <div className="space-y-2.5">
            {pathway.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 text-sm text-[#94A3B8]"
              >
                <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certification Badge */}
      <motion.section variants={itemVariant}>
        <div className="relative overflow-hidden rounded-2xl border border-[#D4A843]/20 bg-gradient-to-r from-[#D4A843]/5 via-[#1A2332] to-[#1A2332] p-5 md:p-6">
          <div className="absolute top-0 right-0 size-40 rounded-full bg-[#D4A843]/5 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-center gap-5">
            {/* Badge Visual */}
            <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border border-[#D4A843]/30 bg-[#D4A843]/10">
              <Award className="size-12 text-[#D4A843]" />
            </div>

            <div className="text-center sm:text-left space-y-2">
              <h3 className="text-lg font-bold text-white">
                IXON Academy Certificate
              </h3>
              <p className="text-sm text-[#94A3B8]">
                Sertifikat digital yang bisa diverifikasi. Tambahkan ke
                LinkedIn, CV, atau portofolio profesionalmu.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <ShieldCheck className="size-3" />
                  Verified by ESI
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#D4A843]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#D4A843]">
                  <Award className="size-3" />
                  IXON Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Price + CTA */}
      <motion.section variants={itemVariant} className="pb-6">
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-[#64748B] uppercase tracking-wider font-medium">
                Investasi Program
              </p>
              <p className="text-2xl font-bold text-[#D4A843]">
                {formatRupiah(pathway.price)}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Termasuk sertifikasi, akses materi selamanya, dan komunitas
              </p>
            </div>
            <button className="w-full sm:w-auto rounded-xl bg-[#D4A843] px-8 py-3.5 text-sm font-bold text-[#0B1120] transition-all hover:bg-[#E0B84E] hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
