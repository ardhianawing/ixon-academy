"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ThumbsUp,
  Lightbulb,
  Flame,
  Flag,
  MessageCircle,
  Eye,
  Heart,
  Send,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { TierBadge } from "@/components/ui/TierBadge";
import { GameBadge } from "@/components/ui/GameBadge";

// --- Mock Data ---

const POST = {
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
  content: [
    "Halo semua! Sebagai jungler main di Mythic Glory, gw mau share beberapa tips yang udah gw pakai selama Season 35 ini. Semoga bisa membantu kalian yang lagi grinding rank.",
    "Pertama, soal pathing. Di season ini, meta jungler lebih mengarah ke hyper-aggressive early game. Setelah ambil buff pertama, langsung cek lane terdekat untuk gank. Jangan terlalu fokus farming di awal karena exp jungle udah di-nerf di patch terbaru. Timing invade juga penting — kalau enemy jungler mulai dari buff bawah, kamu bisa ambil buff atas mereka di menit 1:30.",
    "Kedua, soal hero pick. Jungler yang lagi strong sekarang adalah hero-hero dengan mobility tinggi dan burst damage. Ling masih solid, Fanny untuk yang jago, dan Hayabusa buat safe pick. Tapi yang paling penting itu adaptasi sama draft lawan — kalau mereka banyak CC, mending pilih jungler yang punya immune atau purify built-in.",
    "Ketiga, komunikasi sama team. Ini sering di-skip tapi penting banget. Sebelum gank, ping dulu ke lane yang mau di-gank. Koordinasi sama roamer buat setup. Dan yang paling penting, jangan toxic kalau lanernya gagal follow-up. Tetap positif dan fokus ke objective berikutnya.",
  ],
};

interface Reaction {
  key: string;
  icon: React.ElementType;
  label: string;
  count: number;
}

const INITIAL_REACTIONS: Reaction[] = [
  { key: "like", icon: ThumbsUp, label: "Like", count: 34 },
  { key: "insightful", icon: Lightbulb, label: "Insightful", count: 12 },
  { key: "fire", icon: Flame, label: "Fire", count: 8 },
];

interface Reply {
  id: string;
  author: string;
  authorInitials: string;
  tier: string;
  content: string;
  timeAgo: string;
  children?: Reply[];
}

const REPLIES: Reply[] = [
  {
    id: "r1",
    author: "PhoenixBlade",
    authorInitials: "PB",
    tier: "PLATINUM",
    content:
      "Setuju banget soal pathing aggressive early game. Gw juga ngerasa di season ini kalau terlalu lambat farming, enemy jungler udah snowball duluan. Apalagi kalau lawannya Ling yang bisa invade buff cepet banget.",
    timeAgo: "1 jam lalu",
    children: [
      {
        id: "r1-1",
        author: "TENSAI",
        authorInitials: "TE",
        tier: "GOLD",
        content:
          "Thanks bro, iya emang Ling jadi nightmare buat jungler yang lambat start. Makanya gw selalu minta roamer jaga buff awal biar ga kena invade.",
        timeAgo: "45 menit lalu",
      },
    ],
  },
  {
    id: "r2",
    author: "IXONReaper",
    authorInitials: "IR",
    tier: "SILVER",
    content:
      "Mau tanya dong, kalau di Epic rank mending fokus hero jungler apa ya? Soalnya di Epic kan koordinasi tim masih agak susah, jadi butuh hero yang bisa carry sendiri.",
    timeAgo: "30 menit lalu",
  },
];

// Simulate current user tier
const CURRENT_USER_TIER = "FREE";

function ReplyCard({ reply, depth = 0 }: { reply: Reply; depth?: number }) {
  return (
    <div className={depth > 0 ? "ml-8 mt-3" : ""}>
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-foreground">
          {reply.authorInitials}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">
              {reply.author}
            </span>
            <TierBadge tier={reply.tier} size="sm" />
            <span className="text-[10px] text-muted-foreground">
              {reply.timeAgo}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            {reply.content}
          </p>
        </div>
      </div>

      {reply.children?.map((child) => (
        <ReplyCard key={child.id} reply={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function PostDetailPage() {
  const [reactions, setReactions] = useState(INITIAL_REACTIONS);
  const [activeReactions, setActiveReactions] = useState<Set<string>>(
    new Set()
  );
  const [replyText, setReplyText] = useState("");

  const isFreeUser = CURRENT_USER_TIER === "FREE";

  const toggleReaction = (key: string) => {
    setActiveReactions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });

    setReactions((prev) =>
      prev.map((r) =>
        r.key === key
          ? {
              ...r,
              count: activeReactions.has(key) ? r.count - 1 : r.count + 1,
            }
          : r
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Komunitas
      </Link>

      {/* Post */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-white/5 bg-[#1A2332]/80 p-5 space-y-5">
          {/* Header */}
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-foreground">
              {POST.authorInitials}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {POST.author}
                </span>
                <TierBadge tier={POST.tier} size="sm" />
                {POST.game && <GameBadge game={POST.game} size="sm" />}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {POST.timeAgo}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-lg font-heading font-bold text-foreground leading-snug">
            {POST.title}
          </h1>

          {/* Content */}
          <div className="space-y-3 text-sm leading-relaxed text-foreground/80">
            {POST.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {POST.comments} balasan
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {POST.likes}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {POST.views}
            </span>
          </div>

          <Separator className="bg-white/5" />

          {/* Reactions */}
          <div className="flex flex-wrap items-center gap-2">
            {reactions.map((reaction) => {
              const Icon = reaction.icon;
              const isActive = activeReactions.has(reaction.key);
              return (
                <button
                  key={reaction.key}
                  onClick={() => toggleReaction(reaction.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-gold/15 text-gold"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {reaction.label}
                  <span className="font-semibold">{reaction.count}</span>
                </button>
              );
            })}

            {/* Report */}
            <button className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] text-muted-foreground hover:text-red-400 transition-colors">
              <Flag className="h-3 w-3" />
              Laporkan
            </button>
          </div>
        </Card>
      </motion.div>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground">
          Balasan ({POST.comments})
        </h2>

        <div className="space-y-4">
          {REPLIES.map((reply) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-white/5 bg-[#1A2332]/80 p-4">
                <ReplyCard reply={reply} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reply input */}
      <Card className="border-white/5 bg-[#1A2332]/80 p-4 space-y-3">
        {isFreeUser ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Upgrade ke Silver untuk membalas diskusi
            </p>
            <Button
              size="sm"
              className="bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors"
            >
              Upgrade Sekarang
            </Button>
          </div>
        ) : (
          <>
            <Textarea
              placeholder="Tulis balasan..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[80px] resize-none bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
            />
            <div className="flex justify-end">
              <Button
                disabled={!replyText.trim()}
                className="bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                <Send className="mr-2 h-4 w-4" />
                Kirim Balasan
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
