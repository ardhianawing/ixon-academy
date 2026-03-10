"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Users,
  CheckCircle2,
  Award,
  ShieldCheck,
  BookOpen,
  Target,
  Star,
  Mic,
  BarChart3,
  Smartphone,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ── Types ────────────────────────────────────────────────────────────────────

interface Module {
  title: string;
  weeks: string;
  topics: string[];
}

interface PathwayDetail {
  id: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
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

// ── Mock Data ────────────────────────────────────────────────────────────────

const pathwayData: Record<string, PathwayDetail> = {
  "certified-coach": {
    id: "certified-coach",
    emoji: "\ud83c\udfa4",
    icon: Mic,
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
    icon: BarChart3,
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
    icon: Smartphone,
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Page Component ───────────────────────────────────────────────────────────

export default function PathwayDetailPage({
  params,
}: {
  params: Promise<{ pathwayId: string }>;
}) {
  const { pathwayId } = use(params);
  const pathway = pathwayData[pathwayId];

  if (!pathway) {
    return (
      <div className="mx-auto max-w-4xl py-20 text-center">
        <p className="text-lg text-[#94A3B8]">Pathway tidak ditemukan.</p>
        <Link
          href="/career"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#D4A843] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Career
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-4xl space-y-6"
    >
      {/* Back Link */}
      <motion.div variants={itemVariant}>
        <Link
          href="/career"
          className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Career Pathways
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.section variants={itemVariant}>
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#1A2332]">
          {/* Banner */}
          <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#0B1120] via-[#1A2332] to-[#0B1120]">
            <span className="text-7xl">{pathway.emoji}</span>
          </div>

          {/* Info */}
          <div className="p-5 md:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${pathway.bgColor}`}
              >
                <pathway.icon className={`size-5 ${pathway.iconColor}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white sm:text-2xl">
                  {pathway.title}
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {pathway.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5" />
                    {pathway.totalStudents} siswa
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5 text-[#D4A843]" />
                    <span className="text-[#D4A843] font-semibold">
                      {pathway.rating}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Overview */}
      <motion.section variants={itemVariant}>
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-white">
            <BookOpen className="size-4 text-[#D4A843]" />
            Tentang Program
          </h2>
          <div className="space-y-3">
            {pathway.description.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-[#94A3B8]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Suitable For + Prerequisites */}
      <motion.section variants={itemVariant}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Suitable For */}
          <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <Target className="size-4 text-emerald-400" />
              Siapa yang Cocok?
            </h3>
            <div className="space-y-2">
              {pathway.suitableFor.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-xs text-[#94A3B8]"
                >
                  <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-emerald-400/60" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <ShieldCheck className="size-4 text-amber-400" />
              Prasyarat
            </h3>
            <div className="space-y-2">
              {pathway.prerequisites.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-xs text-[#94A3B8]"
                >
                  <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-amber-400/60" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Curriculum */}
      <motion.section variants={itemVariant}>
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-white">
            <BookOpen className="size-4 text-blue-400" />
            Kurikulum
          </h2>
          <Accordion>
            {pathway.modules.map((mod, i) => (
              <AccordionItem key={i} className="border-white/5">
                <AccordionTrigger className="text-white hover:no-underline">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-semibold">{mod.title}</span>
                    <span className="text-[10px] font-medium text-[#64748B]">
                      {mod.weeks}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-1">
                    {mod.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-start gap-2 text-xs text-[#94A3B8]"
                      >
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#D4A843]/50" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Outcomes */}
      <motion.section variants={itemVariant}>
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-bold text-white">
            <Target className="size-4 text-emerald-400" />
            Setelah Lulus, Kamu Bisa...
          </h2>
          <div className="space-y-2.5">
            {pathway.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 text-sm text-[#94A3B8]"
              >
                <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certification Badge */}
      <motion.section variants={itemVariant}>
        <div className="relative overflow-hidden rounded-2xl border border-[#D4A843]/20 bg-gradient-to-r from-[#D4A843]/5 via-[#1A2332] to-[#1A2332] p-5 md:p-6">
          <div className="absolute top-0 right-0 size-40 rounded-full bg-[#D4A843]/5 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-center gap-5">
            {/* Badge Visual */}
            <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border border-[#D4A843]/30 bg-[#D4A843]/10">
              <Award className="size-12 text-[#D4A843]" />
            </div>

            <div className="text-center sm:text-left space-y-2">
              <h3 className="text-lg font-bold text-white">
                IXON Academy Certificate
              </h3>
              <p className="text-sm text-[#94A3B8]">
                Sertifikat digital yang bisa diverifikasi. Tambahkan ke
                LinkedIn, CV, atau portofolio profesionalmu.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <ShieldCheck className="size-3" />
                  Verified by ESI
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#D4A843]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#D4A843]">
                  <Award className="size-3" />
                  IXON Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Price + CTA */}
      <motion.section variants={itemVariant} className="pb-6">
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-[#64748B] uppercase tracking-wider font-medium">
                Investasi Program
              </p>
              <p className="text-2xl font-bold text-[#D4A843]">
                {formatRupiah(pathway.price)}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Termasuk sertifikasi, akses materi selamanya, dan komunitas
              </p>
            </div>
            <button className="w-full sm:w-auto rounded-xl bg-[#D4A843] px-8 py-3.5 text-sm font-bold text-[#0B1120] transition-all hover:bg-[#E0B84E] hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
