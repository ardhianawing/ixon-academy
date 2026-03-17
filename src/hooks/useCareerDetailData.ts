"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Module {
  title: string;
  weeks: string;
  topics: string[];
}

export interface CareerDetailData {
  id: string;
  emoji: string;
  iconName: string;
  title: string;
  duration: string;
  price: number;
  iconColor: string;
  bgColor: string;
  description: string[];
  suitableFor: string[];
  prerequisites: string[];
  modules: Module[];
  outcomes: string[];
  totalStudents: number;
  rating: number;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const PATHWAY_DB: Record<string, CareerDetailData> = {
  "certified-coach": {
    id: "certified-coach",
    emoji: "\ud83c\udfa4",
    iconName: "Mic",
    title: "IXON Certified Coach",
    duration: "12 minggu",
    price: 3500000,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    description: [
      "Program IXON Certified Coach dirancang untuk pemain berpengalaman yang ingin mentransformasi skill gaming mereka menjadi karir coaching profesional. Kamu akan mempelajari metodologi coaching yang telah terbukti efektif di dunia esports.",
      "Selama 12 minggu, kamu akan dilatih langsung oleh coach berpengalaman dengan kurikulum yang mencakup analisis gameplay, teknik komunikasi, pembuatan materi pembelajaran, dan manajemen siswa. Setiap minggu ada praktik langsung dengan real students.",
      "Setelah lulus, kamu mendapatkan sertifikasi resmi IXON Academy yang diverifikasi oleh ESI (Esports Indonesia) dan langsung mendapat akses ke dashboard coach untuk mulai menerima klien dan menghasilkan pendapatan.",
    ],
    suitableFor: [
      "Pemain dengan rank Mythic+ di MLBB",
      "Yang ingin berbagi pengetahuan gaming",
      "Yang mencari penghasilan dari skill gaming",
      "Mantan pro player atau semi-pro",
      "Pemain dengan pengalaman kompetitif 2+ tahun",
    ],
    prerequisites: [
      "Minimal rank Mythic di game terkait",
      "Pengalaman bermain kompetitif minimal 1 tahun",
      "Kemampuan komunikasi bahasa Indonesia yang baik",
      "Memiliki perangkat untuk recording/streaming",
    ],
    modules: [
      {
        title: "Modul 1: Foundations of Coaching",
        weeks: "Minggu 1-3",
        topics: [
          "Prinsip dasar coaching esports",
          "Psikologi pemain dan motivasi",
          "Etika dan profesionalisme coach",
          "Membangun rapport dengan siswa",
        ],
      },
      {
        title: "Modul 2: Gameplay Analysis",
        weeks: "Minggu 4-6",
        topics: [
          "Framework analisis gameplay",
          "Menggunakan tools review (replay, VOD)",
          "Identifikasi pola kesalahan umum",
          "Membuat action plan improvement",
        ],
      },
      {
        title: "Modul 3: Teaching & Communication",
        weeks: "Minggu 7-9",
        topics: [
          "Teknik penyampaian materi efektif",
          "Membuat kurikulum pembelajaran",
          "Memberikan feedback yang konstruktif",
          "Handling berbagai tipe siswa",
        ],
      },
      {
        title: "Modul 4: Business & Platform",
        weeks: "Minggu 10-12",
        topics: [
          "Menggunakan IXON Coach Dashboard",
          "Pricing dan packaging jasa coaching",
          "Personal branding sebagai coach",
          "Final assessment & sertifikasi",
        ],
      },
    ],
    outcomes: [
      "Sertifikasi resmi IXON Certified Coach",
      "Akses penuh ke IXON Coach Dashboard",
      "Mulai menerima klien dan menghasilkan pendapatan",
      "Tergabung di komunitas coach IXON",
      "Mendapat prioritas untuk event coaching IXON",
    ],
    totalStudents: 234,
    rating: 4.8,
  },
  "esports-analyst": {
    id: "esports-analyst",
    emoji: "\ud83d\udcca",
    iconName: "BarChart3",
    title: "Esports Analyst Program",
    duration: "12 minggu",
    price: 3000000,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    description: [
      "Program Esports Analyst dirancang untuk kamu yang memiliki passion dalam data dan strategi game. Kamu akan belajar menganalisis drafting, meta game, dan data pertandingan menggunakan tools profesional.",
      "Kurikulum mencakup statistical analysis, pattern recognition dalam gameplay, dan pembuatan report yang actionable. Kamu akan bekerja dengan data real dari turnamen profesional dan mendapat mentoring dari analyst berpengalaman.",
      "Lulusan program ini akan memiliki portfolio analyst yang siap digunakan untuk melamar posisi di tim esports profesional atau menjadi freelance analyst.",
    ],
    suitableFor: [
      "Yang tertarik dengan data dan statistik",
      "Pemain yang suka menganalisis meta game",
      "Yang ingin berkarir di balik layar esports",
      "Penggemar strategi dan drafting",
      "Yang memiliki analytical thinking kuat",
    ],
    prerequisites: [
      "Pemahaman mendalam tentang minimal 1 game esports",
      "Kemampuan dasar spreadsheet (Excel/Google Sheets)",
      "Familiar dengan konsep win rate, pick rate, ban rate",
      "Rajin menonton pertandingan kompetitif",
    ],
    modules: [
      {
        title: "Modul 1: Fundamentals of Esports Analysis",
        weeks: "Minggu 1-3",
        topics: [
          "Peran analyst dalam tim esports",
          "Key metrics dan KPI dalam esports",
          "Tools analisis: spreadsheet, database, visualization",
          "Pengantar statistical thinking",
        ],
      },
      {
        title: "Modul 2: Draft & Meta Analysis",
        weeks: "Minggu 4-6",
        topics: [
          "Framework analisis drafting",
          "Meta tracking dan trend identification",
          "Counter-pick strategy analysis",
          "Win condition identification",
        ],
      },
      {
        title: "Modul 3: Match & Player Analysis",
        weeks: "Minggu 7-9",
        topics: [
          "VOD review methodology",
          "Player performance metrics",
          "Team synergy analysis",
          "Opponent scouting report",
        ],
      },
      {
        title: "Modul 4: Reporting & Portfolio",
        weeks: "Minggu 10-12",
        topics: [
          "Data visualization untuk esports",
          "Membuat analyst report profesional",
          "Presentasi findings ke tim",
          "Final project: portfolio analyst",
        ],
      },
    ],
    outcomes: [
      "Sertifikat Esports Analyst dari IXON Academy",
      "Portfolio analyst dengan 3+ real case studies",
      "Kemampuan membaca dan menganalisis data pertandingan",
      "Network dengan analyst profesional",
      "Akses job board IXON untuk posisi analyst",
    ],
    totalStudents: 187,
    rating: 4.7,
  },
  "content-creator": {
    id: "content-creator",
    emoji: "\ud83d\udcf1",
    iconName: "Smartphone",
    title: "Content Creator Bootcamp",
    duration: "8 minggu",
    price: 2500000,
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    description: [
      "Content Creator Bootcamp adalah program intensif 8 minggu yang mengajarkan kamu cara membuat konten gaming yang menarik, membangun audiens, dan menghasilkan uang dari konten.",
      "Kamu akan belajar video editing, thumbnail design, scripting, personal branding, dan strategi algoritma platform seperti YouTube, TikTok, dan Instagram. Semua dengan konteks konten gaming dan esports.",
      "Program ini dipandu oleh content creator gaming sukses dengan pengalaman membangun channel dari nol hingga ratusan ribu subscriber.",
    ],
    suitableFor: [
      "Gamer yang suka sharing pengalaman bermain",
      "Yang ingin membangun personal brand di gaming",
      "Yang tertarik dengan video editing dan storytelling",
      "Streamer pemula yang ingin grow",
      "Yang ingin monetisasi passion gaming",
    ],
    prerequisites: [
      "Smartphone atau PC untuk recording/editing",
      "Akun aktif di minimal 1 platform (YouTube/TikTok/IG)",
      "Semangat untuk konsisten membuat konten",
      "Koneksi internet yang stabil",
    ],
    modules: [
      {
        title: "Modul 1: Content Strategy & Branding",
        weeks: "Minggu 1-2",
        topics: [
          "Menentukan niche dan target audiens",
          "Personal branding untuk gamer",
          "Content calendar planning",
          "Riset konten dan trend analysis",
        ],
      },
      {
        title: "Modul 2: Video Production",
        weeks: "Minggu 3-4",
        topics: [
          "Basic video editing (CapCut, Premiere)",
          "Thumbnail design yang menarik klik",
          "Audio quality dan background music",
          "Screen recording dan gameplay capture",
        ],
      },
      {
        title: "Modul 3: Platform Mastery",
        weeks: "Minggu 5-6",
        topics: [
          "YouTube algorithm dan SEO",
          "TikTok strategy untuk gaming content",
          "Instagram Reels dan Stories",
          "Cross-platform content repurposing",
        ],
      },
      {
        title: "Modul 4: Growth & Monetization",
        weeks: "Minggu 7-8",
        topics: [
          "Community building dan engagement",
          "Monetisasi: AdSense, sponsor, affiliate",
          "Pitching ke brand dan negosiasi",
          "Final project: publish & analyze 5 konten",
        ],
      },
    ],
    outcomes: [
      "Sertifikat Content Creator dari IXON Academy",
      "Portfolio 5+ konten berkualitas yang sudah dipublish",
      "Skill video editing dan thumbnail design",
      "Strategi growth untuk setiap platform",
      "Koneksi dengan brand dan sesama creator",
    ],
    totalStudents: 312,
    rating: 4.9,
  },
};

function buildMockData(pathwayId: string): CareerDetailData | null {
  return PATHWAY_DB[pathwayId] || null;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCareerDetailData(pathwayId: string) {
  const fallback = PATHWAY_DB["certified-coach"];
  return useData<CareerDetailData>({
    mockData: buildMockData(pathwayId) || fallback,
    apiUrl: `/api/career/pathways/${pathwayId}`,
  });
}

/** Check if a pathway exists in mock data */
export function isValidPathway(pathwayId: string): boolean {
  return pathwayId in PATHWAY_DB;
}
