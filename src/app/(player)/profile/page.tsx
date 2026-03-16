"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Star,
  BookOpen,
  MessageCircle,
  Trophy,
  Award,
  Calendar,
  Shield,
  Target,
  Flame,
  Lock,
  Swords,
  Brain,
  Heart,
  Zap,
} from "lucide-react";

import { TierBadge } from "@/components/ui/TierBadge";
import { GameBadge } from "@/components/ui/GameBadge";
import { XPBar } from "@/components/ui/XPBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const radarData = [
  { stat: "Mechanical", value: 82 },
  { stat: "Game Sense", value: 78 },
  { stat: "Hero Mastery", value: 80 },
  { stat: "Teamwork", value: 70 },
  { stat: "Mental", value: 75 },
];

const talentBreakdown = [
  { label: "Skill", score: 82, color: "from-blue-500 to-blue-400" },
  { label: "Mindset", score: 75, color: "from-purple-500 to-purple-400" },
  { label: "Commitment", score: 72, color: "from-emerald-500 to-emerald-400" },
];

const reviews = [
  {
    id: 1,
    hero: "Hayabusa",
    rating: 4,
    maxRating: 5,
    coach: "Coach Alex",
    date: "5 Mar 2026",
    breakdown: [
      { label: "Mechanics", score: 85 },
      { label: "Decision Making", score: 75 },
      { label: "Map Awareness", score: 80 },
    ],
    summary: "Hayabusa splitpush dan timing shadow sangat baik. Perlu improve rotasi teamfight.",
  },
  {
    id: 2,
    hero: "Ling",
    rating: 3.5,
    maxRating: 5,
    coach: "Coach Riku",
    date: "28 Feb 2026",
    breakdown: [
      { label: "Mechanics", score: 78 },
      { label: "Decision Making", score: 65 },
      { label: "Map Awareness", score: 70 },
    ],
    summary: "Ling wall movement sudah smooth. Perlu lebih sabar menunggu timing engage.",
  },
];

const courses = [
  {
    id: 1,
    title: "Jungle Pathing Masterclass",
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
    category: "MLBB",
  },
  {
    id: 2,
    title: "Mental Fortitude for Gamers",
    progress: 30,
    totalLessons: 8,
    completedLessons: 2,
    category: "Soft Skills",
  },
];

const communityStats = {
  postCount: 8,
  replyCount: 23,
  reputation: 156,
  recentPosts: [
    {
      id: "1",
      title: "Tips Jungler Season 35 - Sharing Pengalaman",
      likes: 34,
      comments: 12,
      timeAgo: "2 jam lalu",
    },
    {
      id: "2",
      title: "Highlight: Comeback Epic di Ranked",
      likes: 67,
      comments: 15,
      timeAgo: "2 hari lalu",
    },
    {
      id: "3",
      title: "Cara Rotate Jungler di Late Game",
      likes: 22,
      comments: 8,
      timeAgo: "5 hari lalu",
    },
  ],
};

const tournaments = [
  {
    id: 1,
    title: "1v1 Showdown IXON S1",
    placement: 3,
    date: "20 Feb 2026",
    game: "MLBB",
    prize: "Badge + 500 XP",
  },
];

interface Badge {
  id: number;
  emoji: string;
  label: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
}

const badges: Badge[] = [
  {
    id: 1,
    emoji: "\uD83C\uDF93",
    label: "First Course",
    description: "Selesaikan kursus pertama",
    earned: true,
    earnedDate: "Jan 2026",
  },
  {
    id: 2,
    emoji: "\uD83D\uDD25",
    label: "7-Day Streak",
    description: "Login 7 hari berturut-turut",
    earned: true,
    earnedDate: "Feb 2026",
  },
  {
    id: 3,
    emoji: "\u2B50",
    label: "Clean Player",
    description: "Tidak ada report selama 30 hari",
    earned: true,
    earnedDate: "Feb 2026",
  },
  {
    id: 4,
    emoji: "\uD83C\uDFC6",
    label: "Tournament Top 3",
    description: "Finish top 3 di turnamen",
    earned: true,
    earnedDate: "Feb 2026",
  },
  {
    id: 5,
    emoji: "\uD83D\uDCAC",
    label: "Forum Active",
    description: "Buat 10 post di forum",
    earned: false,
  },
  {
    id: 6,
    emoji: "\uD83C\uDFAF",
    label: "Sharpshooter",
    description: "Skor 90+ di quiz",
    earned: false,
  },
  {
    id: 7,
    emoji: "\uD83D\uDC51",
    label: "Platinum Member",
    description: "Upgrade ke Platinum",
    earned: false,
  },
  {
    id: 8,
    emoji: "\uD83C\uDF1F",
    label: "Talent 90+",
    description: "Capai Talent Score 90+",
    earned: false,
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

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

// ─── Sub-Components ───────────────────────────────────────────────────────────

function ScoreBar({
  label,
  score,
  maxScore = 100,
  colorClass,
}: {
  label: string;
  score: number;
  maxScore?: number;
  colorClass?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{score}</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(score / maxScore) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className={`h-full rounded-full bg-gradient-to-r ${colorClass || "from-[#D4A843] to-[#B8922E]"}`}
        />
      </div>
    </div>
  );
}

function StarRating({ rating, max }: { rating: number; max: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < Math.floor(rating)
              ? "text-[#D4A843] fill-[#D4A843]"
              : i < rating
                ? "text-[#D4A843] fill-[#D4A843]/50"
                : "text-white/10"
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm font-semibold text-foreground">
        {rating}/{max}
      </span>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* ─── Profile Header (Mobile: compact card) ─────────────────────── */}
      <motion.section variants={item}>
        {/* Mobile header */}
        <div className="md:hidden rounded-2xl border border-white/5 bg-card p-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="size-14 rounded-xl bg-gradient-to-br from-[#D4A843] to-[#B8922E] flex items-center justify-center text-2xl font-bold text-black">
                T
              </div>
              <span className="absolute -bottom-1 -right-1 size-5 rounded-md bg-card border border-white/10 flex items-center justify-center text-[9px] font-bold text-[#D4A843]">
                14
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-heading font-bold text-lg text-foreground truncate">TENSAI</h1>
                <TierBadge tier="GOLD" size="sm" />
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                <GameBadge game="MLBB" size="sm" />
                <span>Jungler · Lv.14</span>
              </div>
            </div>

            {/* Talent Score ring */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative size-12">
                <svg className="size-12 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#D4A843" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(78 / 100) * 138.2} 138.2`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading font-black text-sm text-[#D4A843]">78</span>
                </div>
              </div>
              <span className="text-[9px] text-muted-foreground mt-0.5">Talent</span>
            </div>
          </div>

          {/* XP + stats row */}
          <div className="mt-3">
            <XPBar currentXP={2450} nextLevelXP={3000} level={14} />
          </div>
          <div className="flex items-center justify-around mt-3 pt-3 border-t border-white/5">
            {[
              { value: "78", label: "Talent", color: "text-[#D4A843]" },
              { value: "7d", label: "Streak", color: "text-orange-400" },
              { value: "4/8", label: "Badges", color: "text-purple-400" },
              { value: "Mythic", label: "Rank", color: "text-blue-400" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop header (unchanged) */}
        <div className="hidden md:block rounded-2xl border border-white/5 bg-card p-6">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              <div className="size-24 rounded-2xl bg-gradient-to-br from-[#D4A843] to-[#B8922E] flex items-center justify-center text-5xl font-bold text-black">
                T
              </div>
              <span className="absolute -bottom-1.5 -right-1.5 size-7 rounded-lg bg-card border border-white/10 flex items-center justify-center text-xs font-bold text-[#D4A843]">
                14
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-heading font-bold text-2xl text-foreground">TENSAI</h1>
                  <TierBadge tier="GOLD" size="md" />
                  <GameBadge game="MLBB" size="sm" />
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Shield className="size-3.5" />Level 14</span>
                  <span className="flex items-center gap-1"><Calendar className="size-3.5" />Member sejak Jan 2026</span>
                </div>
              </div>

              <XPBar currentXP={2450} nextLevelXP={3000} level={14} className="max-w-md" />

              <div className="flex items-center gap-4 flex-wrap">
                {[
                  { label: "Talent Score", value: "78", icon: Target, color: "text-[#D4A843]" },
                  { label: "Streak", value: "7 hari", icon: Flame, color: "text-orange-400" },
                  { label: "Badges", value: "4/8", icon: Award, color: "text-purple-400" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2 text-sm">
                    <stat.icon className={`size-4 ${stat.color}`} />
                    <span className="text-muted-foreground">{stat.label}:</span>
                    <span className="font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── Tabs ────────────────────────────────────────────────────── */}
      <motion.section variants={item} className="pb-4">
        <Tabs defaultValue="overview">
          <TabsList
            variant="line"
            className="w-full overflow-x-auto flex-nowrap scrollbar-hide"
          >
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="evaluasi">Evaluasi</TabsTrigger>
            <TabsTrigger value="academy">Academy</TabsTrigger>
            <TabsTrigger value="komunitas">Komunitas</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          {/* ── Overview Tab ─────────────────────────────────────────── */}
          <TabsContent value="overview" className="mt-4 md:mt-6 space-y-4 md:space-y-6">
            {/* Mobile: compact single column */}
            <div className="md:hidden space-y-4">
              {/* Radar + Score inline */}
              <div className="rounded-xl border border-white/5 bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">Skill Radar</h3>
                  <span className="text-[11px] font-semibold text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5 rounded-full">78/100</span>
                </div>
                <div className="w-full h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.06)" />
                      <PolarAngleAxis dataKey="stat" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Stats" dataKey="value" stroke="#D4A843" fill="#D4A843" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Talent breakdown compact */}
              <div className="rounded-xl border border-white/5 bg-card p-4 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Talent Breakdown</h3>
                <div className="space-y-2.5">
                  {talentBreakdown.map((item) => (
                    <ScoreBar key={item.label} label={item.label} score={item.score} colorClass={item.color} />
                  ))}
                </div>
                {/* Scouting threshold — compact on mobile */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <Target className="size-3.5 text-[#D4A843] shrink-0" />
                  <span className="text-[11px] text-muted-foreground">
                    Scouting threshold: 85 — butuh <span className="text-[#D4A843] font-semibold">7 poin lagi</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop: original 2-column grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-4">
              {/* Radar Chart */}
              <div className="rounded-xl border border-white/5 bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-1">Talent Radar</h3>
                <p className="text-xs text-muted-foreground mb-4">5 area skill utama</p>
                <div className="w-full h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.06)" />
                      <PolarAngleAxis dataKey="stat" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Stats" dataKey="value" stroke="#D4A843" fill="#D4A843" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Talent Score Breakdown */}
              <div className="rounded-xl border border-white/5 bg-card p-5 space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Talent Score</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-bold text-4xl text-[#D4A843]">78</span>
                    <span className="text-sm text-muted-foreground">/ 100</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {talentBreakdown.map((item) => (
                    <ScoreBar key={item.label} label={item.label} score={item.score} colorClass={item.color} />
                  ))}
                </div>

                {/* Scouting threshold */}
                <div className="rounded-lg border border-[#D4A843]/20 bg-[#D4A843]/5 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="size-4 text-[#D4A843]" />
                    <span className="text-sm font-semibold text-foreground">Scouting Threshold: 85</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Kamu butuh <span className="text-[#D4A843] font-semibold">7 poin lagi</span> untuk masuk radar scouting pro team.
                  </p>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1, ease: "easeOut" as const }}
                      className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#B8922E]" />
                    <div className="absolute top-0 h-full w-0.5 bg-white/40" style={{ left: "85%" }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>0</span>
                    <span className="text-white/40">85 (threshold)</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Evaluasi Tab ─────────────────────────────────────────── */}
          <TabsContent value="evaluasi" className="mt-6 space-y-4">
            <h3 className="font-heading font-bold text-foreground">
              Review Terbaru
            </h3>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-white/5 bg-card p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Swords className="size-4 text-[#D4A843]" />
                      <h4 className="font-semibold text-foreground">
                        {review.hero}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        oleh {review.coach}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {review.date}
                    </p>
                  </div>
                  <StarRating rating={review.rating} max={review.maxRating} />
                </div>

                <p className="text-sm text-muted-foreground">
                  {review.summary}
                </p>

                <div className="space-y-2">
                  {review.breakdown.map((b) => (
                    <ScoreBar key={b.label} label={b.label} score={b.score} />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* ── Academy Tab ──────────────────────────────────────────── */}
          <TabsContent value="academy" className="mt-6 space-y-4">
            <h3 className="font-heading font-bold text-foreground">
              Kursus Sedang Diikuti
            </h3>
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-white/5 bg-card p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {course.title}
                    </h4>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 mt-1 inline-block">
                      {course.category}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#D4A843] shrink-0">
                    {course.progress}%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" as const }}
                      className="h-full rounded-full bg-gradient-to-r from-[#D4A843] to-[#B8922E]"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {course.completedLessons} dari {course.totalLessons} lesson
                    selesai
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* ── Komunitas Tab ────────────────────────────────────────── */}
          <TabsContent value="komunitas" className="mt-6 space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Post",
                  value: communityStats.postCount,
                  icon: BookOpen,
                  color: "text-blue-400",
                },
                {
                  label: "Reply",
                  value: communityStats.replyCount,
                  icon: MessageCircle,
                  color: "text-emerald-400",
                },
                {
                  label: "Reputation",
                  value: communityStats.reputation,
                  icon: Star,
                  color: "text-[#D4A843]",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/5 bg-card p-4 text-center"
                >
                  <stat.icon
                    className={`size-5 mx-auto ${stat.color} mb-2`}
                  />
                  <p className="font-heading font-bold text-lg text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent posts */}
            <h3 className="font-heading font-bold text-foreground">
              Post Terbaru
            </h3>
            <div className="rounded-xl border border-white/5 bg-card divide-y divide-white/5">
              {communityStats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="size-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-3" />
                      {post.comments}
                    </span>
                    <span className="ml-auto">{post.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Events Tab ───────────────────────────────────────────── */}
          <TabsContent value="events" className="mt-6 space-y-4">
            <h3 className="font-heading font-bold text-foreground">
              Hasil Turnamen
            </h3>
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-white/5 bg-card p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Trophy className="size-4 text-[#D4A843]" />
                      <h4 className="font-semibold text-foreground">
                        {t.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{t.date}</span>
                      <GameBadge game={t.game} size="sm" />
                    </div>
                  </div>
                  <div className="text-center shrink-0">
                    <div className="text-2xl">{"\uD83E\uDD49"}</div>
                    <p className="text-xs font-bold text-foreground">
                      #{t.placement}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Zap className="size-3.5 text-[#D4A843]" />
                  <span className="text-muted-foreground">Hadiah:</span>
                  <span className="font-semibold text-foreground">
                    {t.prize}
                  </span>
                </div>
              </div>
            ))}

            {tournaments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Trophy className="size-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Belum ada hasil turnamen.</p>
              </div>
            )}
          </TabsContent>

          {/* ── Badges Tab ───────────────────────────────────────────── */}
          <TabsContent value="badges" className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-foreground">
                Koleksi Badge
              </h3>
              <span className="text-sm text-muted-foreground">
                {badges.filter((b) => b.earned).length}/{badges.length}{" "}
                terkumpul
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {badges.map((badge, idx) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`
                    rounded-xl border p-4 text-center space-y-2 transition-all
                    ${
                      badge.earned
                        ? "border-white/10 bg-card hover:border-white/20"
                        : "border-white/5 bg-card/50 opacity-50"
                    }
                  `}
                >
                  <div className="relative inline-block">
                    <span
                      className={`text-3xl ${badge.earned ? "" : "grayscale"}`}
                    >
                      {badge.emoji}
                    </span>
                    {!badge.earned && (
                      <Lock className="absolute -bottom-1 -right-1 size-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        badge.earned ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {badge.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {badge.description}
                    </p>
                    {badge.earned && badge.earnedDate && (
                      <p className="text-[10px] text-[#D4A843] mt-1 font-semibold">
                        Diraih {badge.earnedDate}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.section>
    </motion.div>
  );
}
