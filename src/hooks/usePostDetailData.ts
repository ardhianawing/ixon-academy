"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Reply {
  id: string;
  author: string;
  authorInitials: string;
  tier: string;
  content: string;
  timeAgo: string;
  children?: Reply[];
}

export interface Reaction {
  key: string;
  icon: string;
  label: string;
  count: number;
}

export interface PostDetailData {
  post: {
    id: string;
    title: string;
    author: string;
    authorInitials: string;
    tier: string;
    game: string;
    category: string;
    comments: number;
    likes: number;
    views: number;
    timeAgo: string;
    content: string[];
  };
  reactions: Reaction[];
  replies: Reply[];
  currentUserTier: string;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_POST_DETAIL: PostDetailData = {
  post: {
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
      "Pertama, soal pathing. Di season ini, meta jungler lebih mengarah ke hyper-aggressive early game. Setelah ambil buff pertama, langsung cek lane terdekat untuk gank. Jangan terlalu fokus farming di awal karena exp jungle udah di-nerf di patch terbaru. Timing invade juga penting \u2014 kalau enemy jungler mulai dari buff bawah, kamu bisa ambil buff atas mereka di menit 1:30.",
      "Kedua, soal hero pick. Jungler yang lagi strong sekarang adalah hero-hero dengan mobility tinggi dan burst damage. Ling masih solid, Fanny untuk yang jago, dan Hayabusa buat safe pick. Tapi yang paling penting itu adaptasi sama draft lawan \u2014 kalau mereka banyak CC, mending pilih jungler yang punya immune atau purify built-in.",
      "Ketiga, komunikasi sama team. Ini sering di-skip tapi penting banget. Sebelum gank, ping dulu ke lane yang mau di-gank. Koordinasi sama roamer buat setup. Dan yang paling penting, jangan toxic kalau lanernya gagal follow-up. Tetap positif dan fokus ke objective berikutnya.",
    ],
  },
  reactions: [
    { key: "like", icon: "ThumbsUp", label: "Like", count: 34 },
    { key: "insightful", icon: "Lightbulb", label: "Insightful", count: 12 },
    { key: "fire", icon: "Flame", label: "Fire", count: 8 },
  ],
  replies: [
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
  ],
  currentUserTier: "FREE",
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function usePostDetailData(postId: string) {
  return useData<PostDetailData>({
    mockData: MOCK_POST_DETAIL,
    apiUrl: `/api/posts/${postId}`,
  });
}
