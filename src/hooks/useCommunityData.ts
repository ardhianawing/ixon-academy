"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PostListItem {
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

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_POSTS: PostListItem[] = [
  {
    id: "1",
    title: "Tips Jungler Season 35",
    author: "TENSAI",
    authorInitials: "TE",
    tier: "GOLD",
    game: "MLBB",
    category: "discussion",
    comments: 24,
    likes: 45,
    views: 320,
    timeAgo: "2 jam lalu",
  },
  {
    id: "2",
    title: "Review Hero Baru Chip",
    author: "PhoenixBlade",
    authorInitials: "PB",
    tier: "PLATINUM",
    game: "MLBB",
    category: "question",
    comments: 18,
    likes: 32,
    views: 210,
    timeAgo: "4 jam lalu",
  },
  {
    id: "3",
    title: "Cara Mengatasi Tilt",
    author: "IXONReaper",
    authorInitials: "IR",
    tier: "SILVER",
    game: null,
    category: "mental",
    comments: 31,
    likes: 67,
    views: 480,
    timeAgo: "6 jam lalu",
  },
  {
    id: "4",
    title: "Highlight: Comeback Epic",
    author: "TENSAI",
    authorInitials: "TE",
    tier: "GOLD",
    game: "MLBB",
    category: "highlight",
    comments: 12,
    likes: 89,
    views: 560,
    timeAgo: "1 hari lalu",
  },
  {
    id: "5",
    title: "Guide: Rotasi Gold Laner",
    author: "PhoenixBlade",
    authorInitials: "PB",
    tier: "PLATINUM",
    game: "MLBB",
    category: "guide",
    comments: 42,
    likes: 78,
    views: 720,
    timeAgo: "2 hari lalu",
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCommunityData() {
  return useData<PostListItem[]>({
    mockData: MOCK_POSTS,
    apiUrl: "/api/posts",
  });
}
