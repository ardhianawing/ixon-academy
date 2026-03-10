"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Star,
  User,
  Calendar,
  TrendingUp,
  CheckSquare,
  MessageSquare,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const reviewData = {
  hero: "Hayabusa",
  game: "MLBB",
  date: "8 Maret 2026",
  coachName: "Coach Alex",
  coachInitial: "A",
  overallScore: 3.6,
  scores: [
    { label: "Mechanical Skill", value: 4, max: 5, pct: 80, color: "#D4A843" },
    { label: "Game Sense", value: 3, max: 5, pct: 60, color: "#3B82F6" },
    { label: "Hero Mastery", value: 4, max: 5, pct: 80, color: "#8B5CF6" },
    { label: "Teamwork", value: 3, max: 5, pct: 60, color: "#10B981" },
    { label: "Mental", value: 4, max: 5, pct: 80, color: "#F59E0B" },
  ],
  feedback: `Secara keseluruhan, gameplay Hayabusa kamu sudah menunjukkan pemahaman yang baik tentang peran jungler. Timing retribution untuk Lithowanderer di early game cukup konsisten, dan kamu berhasil mengamankan buff pertama tanpa kehilangan banyak HP.

Namun, ada beberapa area yang perlu diperbaiki. Pertama, dari segi pathing jungle, kamu terlalu sering mengulang rute yang sama sehingga musuh bisa memprediksi posisi kamu. Cobalah variasikan pathing terutama setelah menit ke-5 ketika musuh sudah mulai membaca pola kamu.

Kedua, timing retribution untuk Turtle dan Lord masih perlu ditingkatkan. Di menit ke-8, kamu kehilangan Turtle karena retribution terlalu cepat - sebaiknya tunggu HP Turtle di bawah threshold damage retribution. Gunakan indikator HP bar sebagai referensi.

Dari sisi map awareness, kamu sudah cukup aktif melihat minimap, tapi rotasi ke lane yang sedang di-gank oleh musuh masih lambat sekitar 3-5 detik. Hal ini bisa diperbaiki dengan lebih sering mengecek minimap setiap 3 detik.

Komunikasi dengan roamer juga perlu ditingkatkan. Beberapa gank yang gagal terjadi karena kurangnya koordinasi - misalnya di menit ke-12 saat kamu mau gank midlane tapi roamer sedang di botlane. Gunakan quick chat atau voice lebih aktif.

Overall, kamu sudah di jalur yang benar. Dengan latihan yang konsisten terutama di area timing retribution dan rotasi, Talent Score kamu bisa naik signifikan dalam beberapa minggu ke depan.`,
  improvementPlan: [
    "Fokus latihan timing retribution saat Turtle/Lord spawn",
    "Review replay sendiri minimal 1x sebelum submit gameplay berikutnya",
    "Perbanyak komunikasi dengan roamer untuk setup gank",
  ],
};

const comparisonData = [
  { aspect: "Mechanical", current: 80, previous: 70 },
  { aspect: "Game Sense", current: 60, previous: 55 },
  { aspect: "Hero Mastery", current: 80, previous: 65 },
  { aspect: "Teamwork", current: 60, previous: 50 },
  { aspect: "Mental", current: 80, previous: 75 },
];

const ratingAspects = [
  "Clarity",
  "Relevance",
  "Actionability",
  "Satisfaction",
];

// ─── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Star Rating Component ───────────────────────────────────────────────────

function StarRating({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (v: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          onClick={() => onRate(v)}
          className="transition-colors"
        >
          <Star
            className={`size-5 ${
              v <= rating
                ? "text-[#D4A843] fill-[#D4A843]"
                : "text-white/10"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewDetailPage() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    reviewData.improvementPlan.map(() => false)
  );
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const setRating = (aspect: string, value: number) => {
    setRatings((prev) => ({ ...prev, [aspect]: value }));
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* ─── Header ────────────────────────────────────────────────────── */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Hero info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="size-14 rounded-xl bg-gradient-to-br from-[#D4A843]/20 to-[#D4A843]/5 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-[#D4A843]">
                {reviewData.hero[0]}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading font-bold text-xl text-foreground">
                  {reviewData.hero}
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                  {reviewData.game}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                  Completed
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {reviewData.date}
                </span>
              </div>
            </div>
          </div>

          {/* Coach info */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="size-10 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/10 flex items-center justify-center">
              <User className="size-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {reviewData.coachName}
              </p>
              <p className="text-xs text-muted-foreground">Reviewer</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── Score Bars ────────────────────────────────────────────────── */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6 space-y-5"
      >
        <h2 className="font-heading font-bold text-foreground">
          Evaluation Scores
        </h2>

        <div className="space-y-4">
          {reviewData.scores.map((s) => (
            <div key={s.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{s.label}</span>
                <span className="text-muted-foreground">
                  {s.value}/{s.max}
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: s.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Overall Score */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 p-4 mt-4">
          <span className="font-heading font-bold text-foreground">
            Overall Score
          </span>
          <span className="font-heading font-bold text-3xl text-[#D4A843]">
            {reviewData.overallScore}/5
          </span>
        </div>
      </motion.section>

      {/* ─── Coach Feedback ────────────────────────────────────────────── */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6 space-y-4"
      >
        <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="size-5 text-[#D4A843]" />
          Feedback Coach
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {reviewData.feedback}
        </div>
      </motion.section>

      {/* ─── Improvement Plan ──────────────────────────────────────────── */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6 space-y-4"
      >
        <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
          <CheckSquare className="size-5 text-emerald-400" />
          Improvement Plan
        </h2>
        <div className="space-y-3">
          {reviewData.improvementPlan.map((plan, idx) => (
            <label
              key={idx}
              className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                checkedItems[idx]
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10"
              }`}
            >
              <input
                type="checkbox"
                checked={checkedItems[idx]}
                onChange={() => toggleCheck(idx)}
                className="mt-0.5 size-4 rounded accent-emerald-500"
              />
              <span
                className={`text-sm ${
                  checkedItems[idx]
                    ? "text-emerald-400 line-through"
                    : "text-foreground"
                }`}
              >
                {plan}
              </span>
            </label>
          ))}
        </div>
      </motion.section>

      {/* ─── Rate This Review ──────────────────────────────────────────── */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6 space-y-4"
      >
        <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
          <Star className="size-5 text-[#D4A843]" />
          Rate This Review
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ratingAspects.map((aspect) => (
            <div
              key={aspect}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2"
            >
              <p className="text-sm font-medium text-foreground">{aspect}</p>
              <StarRating
                rating={ratings[aspect] || 0}
                onRate={(v) => setRating(aspect, v)}
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─── Comparison Chart ──────────────────────────────────────────── */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6 space-y-4 mb-8"
      >
        <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="size-5 text-emerald-400" />
          vs Review Sebelumnya
        </h2>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} barGap={4}>
              <XAxis
                dataKey="aspect"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A2332",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "rgba(255,255,255,0.5)" }}
              />
              <Bar
                dataKey="previous"
                name="Sebelumnya"
                fill="rgba(255,255,255,0.1)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="current"
                name="Sekarang"
                fill="#D4A843"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 justify-center text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-white/10" />
            Sebelumnya
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#D4A843]" />
            Sekarang
          </span>
        </div>
      </motion.section>
    </motion.div>
  );
}
