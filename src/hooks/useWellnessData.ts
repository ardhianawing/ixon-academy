"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SleepEntry {
  day: string;
  hours: number;
  mood: number;
}

export interface WellnessTip {
  title: string;
  description: string;
}

export interface WellnessData {
  sleepHistory: SleepEntry[];
  tips: WellnessTip[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_WELLNESS: WellnessData = {
  sleepHistory: [
    { day: "Sen", hours: 7, mood: 4 },
    { day: "Sel", hours: 6, mood: 3 },
    { day: "Rab", hours: 8, mood: 5 },
    { day: "Kam", hours: 5, mood: 2 },
    { day: "Jum", hours: 7, mood: 4 },
    { day: "Sab", hours: 9, mood: 5 },
    { day: "Min", hours: 7, mood: 4 },
  ],
  tips: [
    {
      title: "Ergonomi Gaming",
      description:
        "Pastikan monitor sejajar mata, kursi menopang punggung bawah, dan siku membentuk sudut 90 derajat. Gunakan wrist rest untuk mouse dan keyboard.",
    },
    {
      title: "Sleep Hygiene",
      description:
        "Hindari layar 30 menit sebelum tidur. Tidur 7-9 jam per malam. Suhu ruangan ideal 18-22\u00B0C untuk tidur berkualitas.",
    },
    {
      title: "Eye Care",
      description:
        "Terapkan aturan 20-20-20: setiap 20 menit, lihat objek 20 feet jauhnya selama 20 detik. Gunakan blue light filter saat malam.",
    },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useWellnessData() {
  return useData<WellnessData>({
    mockData: MOCK_WELLNESS,
    apiUrl: "/api/wellness/history",
  });
}
