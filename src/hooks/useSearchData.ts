"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ResultCategory = "course" | "post" | "player" | "event";

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: ResultCategory;
  href: string;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_RESULTS: SearchResult[] = [
  {
    id: "c1",
    title: "Jungle Mastery",
    subtitle: "Kuasai peran jungler dari dasar hingga mahir \u2014 12 modul",
    category: "course",
    href: "/academy/jungle-mastery",
  },
  {
    id: "c2",
    title: "Advanced Jungle Pathing",
    subtitle: "Optimalisasi rute jungle untuk efisiensi farm & gank",
    category: "course",
    href: "/academy/jungle-pathing",
  },
  {
    id: "p1",
    title: "Tips Jungler Season 35",
    subtitle: "Strategi terbaru untuk jungler di meta Season 35",
    category: "post",
    href: "/community/tips-jungler-s35",
  },
  {
    id: "p2",
    title: "Guide Jungle Rotation",
    subtitle: "Pola rotasi jungle yang efektif untuk ranked game",
    category: "post",
    href: "/community/jungle-rotation",
  },
  {
    id: "u1",
    title: "TENSAI (Jungler)",
    subtitle: "Mythical Glory \u00b7 78 Talent Score \u00b7 47 reviews",
    category: "player",
    href: "/profile/tensai",
  },
  {
    id: "e1",
    title: "Jungle 1v1 Challenge",
    subtitle: "Event mingguan \u2014 Buktikan skill jungler-mu! 15 Mar 2026",
    category: "event",
    href: "/events/jungle-1v1",
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSearchData() {
  return useData<SearchResult[]>({
    mockData: MOCK_RESULTS,
    apiUrl: "/api/search",
  });
}
