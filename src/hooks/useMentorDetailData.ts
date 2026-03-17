"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SessionType {
  emoji: string;
  title: string;
  duration: string;
  price: string;
  priceNum: number;
  desc: string;
  color: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface MentorDetailData {
  nickname: string;
  realName: string;
  exTeam: string;
  role: string;
  yearsExp: number;
  rating: number;
  totalReviews: number;
  available: boolean;
  initial: string;
  color: string;
  bio: string;
  career: string[];
  expertise: string[];
  sessionTypes: SessionType[];
  testimonials: Testimonial[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MENTOR_DB: Record<string, Omit<MentorDetailData, "sessionTypes" | "testimonials">> = {
  "rrq-lemon": {
    nickname: "RRQ Lemon",
    realName: "Muhammad Ikhsan",
    exTeam: "RRQ Hoshi",
    role: "Jungler",
    yearsExp: 5,
    rating: 4.8,
    totalReviews: 124,
    available: true,
    initial: "RL",
    color: "from-red-500 to-orange-500",
    bio: "Legenda Jungler Indonesia yang telah membawa RRQ Hoshi meraih juara MPL Indonesia berkali-kali. Dikenal dengan kecepatan farming dan timing rotasi yang presisi. Sekarang fokus membimbing generasi baru pemain Mobile Legends.",
    career: [
      "Juara MPL Indonesia Season 7 & 8 bersama RRQ Hoshi",
      "MVP M3 World Championship 2021 \u2014 Top Stats Jungler",
      "5 tahun pengalaman kompetitif di level tertinggi SEA",
    ],
    expertise: [
      "Jungling",
      "Rotasi Map",
      "Objektif Control",
      "Early Game",
      "Farming Efficiency",
      "Hero Pool: Ling, Lancelot, Fanny",
    ],
  },
  "evos-wannn": {
    nickname: "EVOS Wannn",
    realName: "Muhammad Ridwan",
    exTeam: "EVOS Legends",
    role: "Gold Laner",
    yearsExp: 4,
    rating: 4.6,
    totalReviews: 98,
    available: true,
    initial: "EW",
    color: "from-blue-500 to-cyan-500",
    bio: "Gold Laner andalan EVOS Legends yang terkenal dengan mekanik laning dan positioning team fight yang sempurna. Spesialis late game carry dengan win rate tinggi di turnamen besar.",
    career: [
      "Finalist MPL Indonesia Season 6 bersama EVOS Legends",
      "Top Gold Laner stats sepanjang MPL ID Season 5-7",
      "4 tahun pengalaman sebagai pro player dan analyst",
    ],
    expertise: [
      "Gold Lane",
      "Farming Pattern",
      "Late Game Carry",
      "Positioning",
      "Hero Pool: Claude, Wanwan, Brody",
      "Team Fight",
    ],
  },
  "onic-sanz": {
    nickname: "ONIC Sanz",
    realName: "Sanusi",
    exTeam: "ONIC Esports",
    role: "Mid Laner",
    yearsExp: 3,
    rating: 4.9,
    totalReviews: 156,
    available: false,
    initial: "OS",
    color: "from-purple-500 to-pink-500",
    bio: "Mid Laner terbaik Southeast Asia yang memimpin ONIC ke puncak kejayaan. Dikenal dengan hero pool yang luas dan kemampuan burst damage yang menghancurkan. Master of mage gameplay.",
    career: [
      "Juara M4 World Championship 2023 bersama ONIC Esports",
      "MVP MPL Indonesia Season 10 \u2014 Most Kills Mid Laner",
      "3 tahun menjadi backbone dari roster ONIC yang dominan",
    ],
    expertise: [
      "Mid Lane",
      "Mage Gameplay",
      "Burst Damage",
      "Roaming",
      "Hero Pool: Valentina, Yve, Pharsa",
      "Vision Control",
    ],
  },
};

const MOCK_SESSION_TYPES: SessionType[] = [
  {
    emoji: "\ud83c\udfaf",
    title: "1-on-1 Review",
    duration: "30 menit",
    price: "Rp 150.000",
    priceNum: 150000,
    desc: "Review gameplay personal dengan analisis mendalam dari mentor",
    color: "text-green-400",
  },
  {
    emoji: "\ud83d\udc65",
    title: "Group Session",
    duration: "60 menit",
    price: "Rp 75.000/orang",
    priceNum: 75000,
    desc: "Sesi bersama 3-5 pemain dengan topik spesifik",
    color: "text-blue-400",
  },
  {
    emoji: "\u2753",
    title: "AMA Session",
    duration: "45 menit",
    price: "Rp 50.000",
    priceNum: 50000,
    desc: "Ask Me Anything \u2014 tanya apa saja tentang pro scene & gameplay",
    color: "text-purple-400",
  },
  {
    emoji: "\ud83d\udc41\ufe0f",
    title: "Shadow Session",
    duration: "90 menit",
    price: "Rp 200.000",
    priceNum: 200000,
    desc: "Tonton mentor bermain live sambil penjelasan real-time",
    color: "text-orange-400",
  },
];

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    name: "XDragon99",
    rating: 5,
    text: "Setelah 3 sesi, gameplay jungler saya meningkat drastis. Lemon benar-benar menjelaskan detail yang tidak pernah saya perhatikan sebelumnya. Worth every rupiah!",
    date: "2 minggu lalu",
  },
  {
    name: "MidOrFeed_ID",
    rating: 5,
    text: "Coaching terbaik yang pernah saya dapat. Analisis replay sangat detail dan mentor sabar banget menjelaskan kesalahan saya. Highly recommended!",
    date: "1 bulan lalu",
  },
];

function buildMockData(mentorId: string): MentorDetailData {
  const mentor = MENTOR_DB[mentorId] || MENTOR_DB["rrq-lemon"];
  return {
    ...mentor,
    sessionTypes: MOCK_SESSION_TYPES,
    testimonials: MOCK_TESTIMONIALS,
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMentorDetailData(mentorId: string) {
  return useData<MentorDetailData>({
    mockData: buildMockData(mentorId),
    apiUrl: `/api/mentorship/${mentorId}`,
  });
}
