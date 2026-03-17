"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ReviewScore {
  label: string;
  value: number;
  max: number;
  pct: number;
  color: string;
}

export interface ComparisonEntry {
  aspect: string;
  current: number;
  previous: number;
}

export interface ReviewDetailData {
  hero: string;
  game: string;
  date: string;
  coach: {
    name: string;
    avatar: string | null;
    initials: string;
  };
  scores: ReviewScore[];
  overallScore: number;
  feedback: string;
  improvementPlan: string[];
  comparisonData: ComparisonEntry[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_REVIEW_DETAIL: ReviewDetailData = {
  hero: "Hayabusa",
  game: "MLBB",
  date: "8 Maret 2026",
  coach: {
    name: "Coach Alex",
    avatar: null,
    initials: "A",
  },
  scores: [
    { label: "Mechanical Skill", value: 4, max: 5, pct: 80, color: "#D4A843" },
    { label: "Game Sense", value: 3, max: 5, pct: 60, color: "#3B82F6" },
    { label: "Hero Mastery", value: 4, max: 5, pct: 80, color: "#8B5CF6" },
    { label: "Teamwork", value: 3, max: 5, pct: 60, color: "#10B981" },
    { label: "Mental", value: 4, max: 5, pct: 80, color: "#F59E0B" },
  ],
  overallScore: 3.6,
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
  comparisonData: [
    { aspect: "Mechanical", current: 80, previous: 70 },
    { aspect: "Game Sense", current: 60, previous: 55 },
    { aspect: "Hero Mastery", current: 80, previous: 65 },
    { aspect: "Teamwork", current: 60, previous: 50 },
    { aspect: "Mental", current: 80, previous: 75 },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useReviewDetailData(reviewId: string) {
  return useData<ReviewDetailData>({
    mockData: MOCK_REVIEW_DETAIL,
    apiUrl: `/api/evaluations/${reviewId}`,
  });
}
