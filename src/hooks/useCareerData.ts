"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CareerPathway {
  id: string;
  emoji: string;
  iconName: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  outcomes: string[];
  available: boolean;
  iconColor: string;
  bgColor: string;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_PATHWAYS: CareerPathway[] = [
  {
    id: "certified-coach",
    emoji: "\ud83c\udfa4",
    iconName: "Mic",
    title: "IXON Certified Coach",
    duration: "12 minggu",
    price: 3500000,
    description:
      "Jadilah coach bersertifikat IXON dan mulai menghasilkan dari kemampuanmu.",
    outcomes: [
      "Sertifikasi resmi",
      "Akses dashboard coach",
      "Mulai menghasilkan dari review",
    ],
    available: true,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "esports-analyst",
    emoji: "\ud83d\udcca",
    iconName: "BarChart3",
    title: "Esports Analyst Program",
    duration: "12 minggu",
    price: 3000000,
    description:
      "Kuasai analisis drafting, meta, dan data pertandingan esports.",
    outcomes: [
      "Analisis drafting & meta",
      "Membaca data pertandingan",
      "Portfolio analyst",
    ],
    available: true,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "content-creator",
    emoji: "\ud83d\udcf1",
    iconName: "Smartphone",
    title: "Content Creator Bootcamp",
    duration: "8 minggu",
    price: 2500000,
    description:
      "Pelajari cara membuat konten gaming yang menarik dan menghasilkan.",
    outcomes: [
      "Video editing skill",
      "Personal branding",
      "Monetisasi konten",
    ],
    available: true,
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "digital-marketing",
    emoji: "\ud83d\udce3",
    iconName: "Megaphone",
    title: "Digital Marketing for Esports",
    duration: "10 minggu",
    price: 2800000,
    description: "Pelajari strategi digital marketing khusus industri esports.",
    outcomes: [
      "Social media strategy",
      "Community management",
      "Campaign analytics",
    ],
    available: false,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "graphic-design",
    emoji: "\ud83c\udfa8",
    iconName: "Palette",
    title: "Graphic Design for Gaming",
    duration: "8 minggu",
    price: 2500000,
    description: "Desain visual untuk tim esports, streaming, dan konten gaming.",
    outcomes: [
      "Logo & branding design",
      "Stream overlay design",
      "Social media assets",
    ],
    available: false,
    iconColor: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    id: "video-production",
    emoji: "\ud83c\udfac",
    iconName: "Video",
    title: "Video Production",
    duration: "10 minggu",
    price: 3000000,
    description:
      "Produksi video profesional untuk highlight, documentary, dan konten esports.",
    outcomes: [
      "Cinematography basics",
      "Post-production workflow",
      "Storytelling technique",
    ],
    available: false,
    iconColor: "text-red-400",
    bgColor: "bg-red-500/10",
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCareerData() {
  return useData<CareerPathway[]>({
    mockData: MOCK_PATHWAYS,
    apiUrl: "/api/career/pathways",
  });
}
