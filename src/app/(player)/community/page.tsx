"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Eye,
  Plus,
  TrendingUp,
  Clock,
  ThumbsUp,
  Lock,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TierBadge } from "@/components/ui/TierBadge";
import { GameBadge } from "@/components/ui/GameBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- Mock Data ---

const CATEGORIES = [
  { key: "all", label: "Semua" },
  { key: "mlbb", label: "MLBB" },
  { key: "ff", label: "Free Fire" },
  { key: "soft-skills", label: "Soft Skills" },
  { key: "mental", label: "Mental" },
  { key: "off-topic", label: "Off-Topic" },
] as const;

type SortMode = "terbaru" | "trending" | "most-liked";

const SORT_OPTIONS: { key: SortMode; label: string; icon: React.ElementType }[] = [
  { key: "terbaru", label: "Terbaru", icon: Clock },
  { key: "trending", label: "Trending", icon: TrendingUp },
  { key: "most-liked", label: "Most Liked", icon: ThumbsUp },
];

const categoryTagConfig: Record<string, { bg: string; text: string }> = {
  discussion: { bg: "bg-blue-500/15", text: "text-blue-400" },
  question: { bg: "bg-purple-500/15", text: "text-purple-400" },
  highlight: { bg: "bg-amber-500/15", text: "text-amber-400" },
  guide: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  mental: { bg: "bg-rose-500/15", text: "text-rose-400" },
  "off-topic": { bg: "bg-gray-500/15", text: "text-gray-400" },
};

const categoryLabels: Record<string, string> = {
  discussion: "Diskusi",
  question: "Pertanyaan",
  highlight: "Highlight",
  guide: "Guide",
  mental: "Mental",
  "off-topic": "Off-Topic",
};

interface Post {
  id: string;
  title: string;
  author: string;
  authorInitials: string;
  tier: string;
  game: string | null;
  category: string;
  comments: number;
  likes: number;
  views: number;
  timeAgo: string;
}

const POSTS: Post[] = [
  {
    id: "1",
    title: "Tips Jungler Season 35 - Sharing Pengalaman",
    author: "TENSAI",
    authorInitials: "TE",
    tier: "GOLD",
    game: "MLBB",
    category: "discussion",
    comments: 12,
    likes: 34,
    views: 128,
    timeAgo: "2 jam lalu",
  },
  {
    id: "2",
    title: "Review Hero Baru Chip - Worth Buy?",
    author: "PhoenixBlade",
    authorInitials: "PB",
    tier: "PLATINUM",
    game: "MLBB",
    category: "question",
    comments: 28,
    likes: 56,
    views: 312,
    timeAgo: "5 jam lalu",
  },
  {
    id: "3",
    title: "Cara Mengatasi Tilt Setelah Losing Streak",
    author: "IXONReaper",
    authorInitials: "IR",
    tier: "SILVER",
    game: null,
    category: "mental",
    comments: 8,
    likes: 42,
    views: 95,
    timeAgo: "kemarin",
  },
  {
    id: "4",
    title: "Highlight: Comeback Epic di Ranked",
    author: "TENSAI",
    authorInitials: "TE",
    tier: "GOLD",
    game: "MLBB",
    category: "highlight",
    comments: 15,
    likes: 67,
    views: 205,
    timeAgo: "2 hari lalu",
  },
  {
    id: "5",
    title: "Guide: Rotasi Gold Laner Early Game",
    author: "PhoenixBlade",
    authorInitials: "PB",
    tier: "PLATINUM",
    game: "MLBB",
    category: "guide",
    comments: 22,
    likes: 89,
    views: 445,
    timeAgo: "3 hari lalu",
  },
];

// Simulate current user tier — change to "FREE" to see the upgrade banner
const CURRENT_USER_TIER: string = "FREE";

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("terbaru");

  const isFreeUser = CURRENT_USER_TIER === "FREE";

  const filteredPosts = POSTS.filter((post) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "mlbb") return post.game === "MLBB";
    if (activeCategory === "ff") return post.game === "FF";
    return post.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Komunitas
          </h1>
          <p className="text-sm text-muted-foreground">
            Diskusi, sharing, dan belajar bareng sesama player
          </p>
        </div>

        {isFreeUser ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  disabled
                  className="bg-gold/40 text-[#0B1120] font-semibold cursor-not-allowed"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Buat Post
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#1A2332] border-white/10 text-foreground">
                <p>Upgrade ke Silver untuk membuat post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link href="/community/new">
            <Button className="bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors">
              <Plus className="mr-2 h-4 w-4" />
              Buat Post
            </Button>
          </Link>
        )}
      </div>

      {/* Free user upgrade banner */}
      {isFreeUser && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-gold/20 bg-gold/5 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-gold">
                  Ingin ikut berdiskusi?
                </p>
                <p className="text-xs text-muted-foreground">
                  Upgrade ke Silver untuk membuat post dan membalas diskusi.
                </p>
              </div>
              <Button
                size="sm"
                className="bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors"
              >
                Upgrade ke Silver
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? "bg-gold text-[#0B1120]"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex gap-2">
        {SORT_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.key}
              onClick={() => setSortMode(opt.key)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                sortMode === opt.key
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Post list */}
      <div className="space-y-3">
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link href={`/community/${post.id}`}>
              <Card className="border-white/5 bg-[#1A2332]/80 p-4 hover:border-white/10 hover:bg-[#1A2332] transition-colors cursor-pointer">
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-foreground">
                    {post.authorInitials}
                  </div>

                  <div className="min-w-0 flex-1 space-y-2">
                    {/* Title */}
                    <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Author + tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {post.author}
                      </span>
                      <TierBadge tier={post.tier} size="sm" />
                      {post.game && <GameBadge game={post.game} size="sm" />}
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          categoryTagConfig[post.category]?.bg ?? ""
                        } ${categoryTagConfig[post.category]?.text ?? ""}`}
                      >
                        {categoryLabels[post.category] ?? post.category}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comments}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views}
                      </span>
                      <span className="ml-auto">{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
