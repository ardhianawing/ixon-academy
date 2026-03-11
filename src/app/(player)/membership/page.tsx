"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Crown,
  Sparkles,
  GraduationCap,
  Star,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TierPlan {
  key: string;
  name: string;
  price: string;
  priceNote: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgGlow: string;
  features: { label: string; included: boolean }[];
  isPopular: boolean;
  isCurrent: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  "Komunitas Read-Only",
  "React/Vote di Post",
  "Weekly Digest Email",
  "1 Quiz/Minggu",
  "LMS Full Access",
  "Post di Komunitas",
  "Leaderboard",
  "Evaluasi dari Coach",
  "Review History Lengkap",
  "Improvement Plan",
  "Scrim & Turnamen",
  "Environment Pro",
  "Priority Scouting",
];

const TIERS: TierPlan[] = [
  {
    key: "free",
    name: "Free",
    price: "Rp 0",
    priceNote: "Gratis selamanya",
    icon: Shield,
    color: "text-gray-400",
    borderColor: "border-white/5",
    bgGlow: "",
    isPopular: false,
    isCurrent: false,
    features: [
      { label: "Komunitas Read-Only", included: true },
      { label: "React/Vote di Post", included: true },
      { label: "Weekly Digest Email", included: true },
      { label: "1 Quiz/Minggu", included: true },
      { label: "LMS Full Access", included: false },
      { label: "Post di Komunitas", included: false },
      { label: "Leaderboard", included: false },
      { label: "Evaluasi dari Coach", included: false },
      { label: "Review History Lengkap", included: false },
      { label: "Improvement Plan", included: false },
      { label: "Scrim & Turnamen", included: false },
      { label: "Environment Pro", included: false },
      { label: "Priority Scouting", included: false },
    ],
  },
  {
    key: "silver",
    name: "Silver",
    price: "Rp 49.000",
    priceNote: "/bulan",
    icon: Star,
    color: "text-[var(--color-tier-silver)]",
    borderColor: "border-[var(--color-tier-silver)]/20",
    bgGlow: "",
    isPopular: false,
    isCurrent: false,
    features: [
      { label: "Komunitas Read-Only", included: true },
      { label: "React/Vote di Post", included: true },
      { label: "Weekly Digest Email", included: true },
      { label: "1 Quiz/Minggu", included: true },
      { label: "LMS Full Access", included: true },
      { label: "Post di Komunitas", included: true },
      { label: "Leaderboard", included: true },
      { label: "Evaluasi dari Coach", included: false },
      { label: "Review History Lengkap", included: false },
      { label: "Improvement Plan", included: false },
      { label: "Scrim & Turnamen", included: false },
      { label: "Environment Pro", included: false },
      { label: "Priority Scouting", included: false },
    ],
  },
  {
    key: "gold",
    name: "Gold",
    price: "Rp 99.000",
    priceNote: "/bulan",
    icon: Crown,
    color: "text-[#D4A843]",
    borderColor: "border-[#D4A843]/30",
    bgGlow: "shadow-[0_0_40px_rgba(212,168,67,0.08)]",
    isPopular: true,
    isCurrent: true,
    features: [
      { label: "Komunitas Read-Only", included: true },
      { label: "React/Vote di Post", included: true },
      { label: "Weekly Digest Email", included: true },
      { label: "1 Quiz/Minggu", included: true },
      { label: "LMS Full Access", included: true },
      { label: "Post di Komunitas", included: true },
      { label: "Leaderboard", included: true },
      { label: "Evaluasi dari Coach", included: true },
      { label: "Review History Lengkap", included: true },
      { label: "Improvement Plan", included: true },
      { label: "Scrim & Turnamen", included: false },
      { label: "Environment Pro", included: false },
      { label: "Priority Scouting", included: false },
    ],
  },
  {
    key: "platinum",
    name: "Platinum",
    price: "Rp 199.000",
    priceNote: "/bulan",
    icon: Zap,
    color: "text-[var(--color-tier-platinum)]",
    borderColor: "border-[var(--color-tier-platinum)]/20",
    bgGlow: "",
    isPopular: false,
    isCurrent: false,
    features: [
      { label: "Komunitas Read-Only", included: true },
      { label: "React/Vote di Post", included: true },
      { label: "Weekly Digest Email", included: true },
      { label: "1 Quiz/Minggu", included: true },
      { label: "LMS Full Access", included: true },
      { label: "Post di Komunitas", included: true },
      { label: "Leaderboard", included: true },
      { label: "Evaluasi dari Coach", included: true },
      { label: "Review History Lengkap", included: true },
      { label: "Improvement Plan", included: true },
      { label: "Scrim & Turnamen", included: true },
      { label: "Environment Pro", included: true },
      { label: "Priority Scouting", included: true },
    ],
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const handleUpgrade = (tierName: string) => {
    toast("Payment integration coming soon", {
      description: `Upgrade ke ${tierName} akan segera tersedia.`,
    });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-6xl mx-auto"
    >
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <motion.section variants={item} className="text-center space-y-3">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Pilih Plan yang Tepat
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Mulai dari gratis dan upgrade kapan saja untuk membuka fitur premium
          dan meningkatkan skill gaming kamu.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-colors ${
              billingCycle === "monthly"
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bulanan
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-colors ${
              billingCycle === "yearly"
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tahunan
            <span className="ml-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-full">
              -20%
            </span>
          </button>
        </div>
      </motion.section>

      {/* ─── Pricing Cards ───────────────────────────────────────────── */}
      <motion.section variants={item}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className={`
                  relative rounded-2xl border bg-card p-5 flex flex-col transition-all
                  ${tier.borderColor} ${tier.bgGlow}
                  ${tier.isPopular ? "lg:-mt-2 lg:mb-2" : ""}
                `}
              >
                {/* Popular badge */}
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-black bg-gradient-to-r from-[#D4A843] to-[#B8922E] px-3 py-1 rounded-full">
                      <Sparkles className="size-3" />
                      Paling Populer
                    </span>
                  </div>
                )}

                {/* Current tier badge */}
                {tier.isCurrent && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold text-[#D4A843] bg-[#D4A843]/15 px-2 py-0.5 rounded-full">
                      Tier Kamu Saat Ini
                    </span>
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div
                    className={`size-10 rounded-xl flex items-center justify-center ${
                      tier.isPopular
                        ? "bg-[#D4A843]/15"
                        : "bg-white/5"
                    }`}
                  >
                    <Icon className={`size-5 ${tier.color}`} />
                  </div>
                  <h3
                    className={`font-heading font-bold text-lg ${tier.color}`}
                  >
                    {tier.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-bold text-2xl text-foreground">
                      {billingCycle === "yearly" && tier.key !== "free"
                        ? tier.price.replace(
                            /[\d.]+/,
                            (m) =>
                              Math.round(
                                parseInt(m.replace(/\./g, "")) * 0.8
                              ).toLocaleString("id-ID")
                          )
                        : tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {tier.priceNote}
                    </span>
                  </div>
                  {billingCycle === "yearly" && tier.key !== "free" && (
                    <p className="text-[11px] text-emerald-400 mt-1">
                      Hemat 20% dengan pembayaran tahunan
                    </p>
                  )}
                </div>

                {/* Feature list */}
                <div className="flex-1 space-y-2.5 mb-5">
                  {tier.features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-2"
                    >
                      {feature.included ? (
                        <Check className="size-4 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="size-4 text-white/15 shrink-0" />
                      )}
                      <span
                        className={`text-xs ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {tier.isCurrent ? (
                  <button
                    disabled
                    className="w-full rounded-xl py-2.5 text-sm font-semibold bg-[#D4A843]/10 text-[#D4A843] border border-[#D4A843]/20 cursor-default"
                  >
                    Plan Aktif
                  </button>
                ) : tier.key === "free" ? (
                  <button
                    disabled
                    className="w-full rounded-xl py-2.5 text-sm font-semibold bg-white/5 text-muted-foreground cursor-default"
                  >
                    Paket Dasar
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(tier.name)}
                    className={`
                      w-full rounded-xl py-2.5 text-sm font-semibold transition-all
                      flex items-center justify-center gap-1.5
                      ${
                        tier.isPopular
                          ? "bg-gradient-to-r from-[#D4A843] to-[#B8922E] text-black hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]"
                          : "bg-white/5 text-foreground hover:bg-white/10 border border-white/10"
                      }
                    `}
                  >
                    {tier.key === "platinum" ? "Upgrade" : "Upgrade"}
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Student Discount ────────────────────────────────────────── */}
      <motion.section variants={item}>
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="size-12 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
            <GraduationCap className="size-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-foreground">
              Pelajar? Dapatkan Diskon 30%
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Verifikasi status pelajar kamu dan dapatkan diskon khusus untuk
              semua plan berbayar. Berlaku untuk SMA, SMK, dan Mahasiswa.
            </p>
          </div>
          <button
            onClick={() =>
              toast("Verifikasi pelajar akan segera tersedia", {
                description:
                  "Fitur ini sedang dalam pengembangan.",
              })
            }
            className="shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 transition-colors"
          >
            Verifikasi Sekarang
          </button>
        </div>
      </motion.section>

      {/* ─── Feature Comparison Table (Desktop) ──────────────────────── */}
      <motion.section variants={item} className="hidden lg:block pb-6">
        <h2 className="font-heading font-bold text-foreground text-xl mb-4 text-center">
          Perbandingan Fitur Lengkap
        </h2>
        <div className="rounded-2xl border border-white/5 bg-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-5 gap-0">
            <div className="p-4 border-b border-r border-white/5">
              <span className="text-sm font-semibold text-muted-foreground">
                Fitur
              </span>
            </div>
            {TIERS.map((tier) => (
              <div
                key={tier.key}
                className={`p-4 border-b border-r border-white/5 text-center last:border-r-0 ${
                  tier.isPopular ? "bg-[#D4A843]/5" : ""
                }`}
              >
                <span className={`text-sm font-bold ${tier.color}`}>
                  {tier.name}
                </span>
                {tier.isCurrent && (
                  <span className="block text-[10px] text-[#D4A843] mt-0.5">
                    Aktif
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {FEATURES.map((feature, fIdx) => (
            <div
              key={feature}
              className={`grid grid-cols-5 gap-0 ${
                fIdx < FEATURES.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="p-3 border-r border-white/5 flex items-center">
                <span className="text-xs text-foreground">{feature}</span>
              </div>
              {TIERS.map((tier) => {
                const feat = tier.features.find((f) => f.label === feature);
                const included = feat?.included ?? false;
                return (
                  <div
                    key={tier.key}
                    className={`p-3 border-r border-white/5 last:border-r-0 flex items-center justify-center ${
                      tier.isPopular ? "bg-[#D4A843]/5" : ""
                    }`}
                  >
                    {included ? (
                      <Check className="size-4 text-emerald-400" />
                    ) : (
                      <X className="size-4 text-white/10" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
