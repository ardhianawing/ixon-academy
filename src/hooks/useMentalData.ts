"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MentalResource {
  id: number;
  emoji: string;
  title: string;
  type: "article" | "video";
  readTime: string;
  description: string;
  tags: string[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_RESOURCES: MentalResource[] = [
  {
    id: 1,
    emoji: "\ud83e\uddd8",
    title: "Mengatasi Tilt Setelah Losing Streak",
    type: "article",
    readTime: "8 min",
    description:
      "Strategi mental untuk kembali fokus setelah kekalahan beruntun. Pelajari teknik grounding dan reset mindset.",
    tags: ["Tilt", "Mental Reset"],
  },
  {
    id: 2,
    emoji: "\ud83c\udfaf",
    title: "Fokus & Konsentrasi Saat Match Penting",
    type: "video",
    readTime: "12 min",
    description:
      "Video panduan teknik konsentrasi dari sport psychologist. Termasuk breathing exercise dan visualization.",
    tags: ["Fokus", "Big Match"],
  },
  {
    id: 3,
    emoji: "\ud83d\ude24",
    title: "Performance Anxiety: Cara Mengatasinya",
    type: "article",
    readTime: "10 min",
    description:
      "Kenali gejala performance anxiety dan pelajari cara mengatasinya agar performa tetap optimal.",
    tags: ["Anxiety", "Performa"],
  },
  {
    id: 4,
    emoji: "\ud83d\udd25",
    title: "Menghindari Burnout sebagai Gamer Kompetitif",
    type: "article",
    readTime: "7 min",
    description:
      "Cara menjaga semangat bermain tanpa mengorbankan kesehatan mental. Tips dari pro player.",
    tags: ["Burnout", "Self-care"],
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMentalData() {
  return useData<MentalResource[]>({
    mockData: MOCK_RESOURCES,
    apiUrl: "/api/mental/resources",
  });
}
