"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  UserPlus,
  BookOpen,
  ClipboardCheck,
  Trophy,
  GraduationCap,
  Target,
  Search,
  MessageCircle,
  Briefcase,
  Brain,
  ChevronRight,
  Gamepad2,
  Sword,
  Flame,
  Sparkles,
  Star,
  Check,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ───────────────────────── Fade-in wrapper ───────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────── Animated Counter ───────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => {
    if (target === 0) return "0";
    return Math.round(v).toLocaleString("id-ID");
  });

  useEffect(() => {
    if (inView) {
      animate(motionVal, target, { duration, ease: "easeOut" as const });
    }
  }, [inView, motionVal, target, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                          MAIN PAGE                                 */
/* ═══════════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F1F5F9] overflow-x-hidden">
      {/* ─── HERO ─── */}
      <HeroSection />
      {/* ─── SUPPORTED GAMES ─── */}
      <GamesSection />
      {/* ─── HOW IT WORKS ─── */}
      <HowItWorksSection />
      {/* ─── FEATURES ─── */}
      <FeaturesSection />
      {/* ─── STATS ─── */}
      <StatsSection />
      {/* ─── PRICING ─── */}
      <PricingSection />
      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                          1. HERO                                   */
/* ═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,168,67,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,168,67,0.12),transparent)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10 px-4 py-1.5 text-sm text-[#D4A843]">
          <Sparkles className="size-4" />
          Platform Esports Academy #1 Indonesia
        </motion.div>

        <motion.h1
          variants={item}
          className="font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Dari <span className="text-[#D4A843]">Gamer</span> Menjadi{" "}
          <span className="text-[#D4A843]">Profesional</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg"
        >
          Platform pembinaan esports profesional pertama di Indonesia. Kurikulum
          terstruktur, evaluasi coach pro, dan pipeline scouting langsung ke tim
          MDL.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="h-12 gap-2 rounded-full bg-[#D4A843] px-8 text-base font-semibold text-[#0B1120] hover:bg-[#F0DCA0] transition-colors">
            Mulai Gratis
            <ArrowRight className="size-5" />
          </Button>
          <Button
            variant="outline"
            className="h-12 gap-2 rounded-full border-[#D4A843]/40 px-8 text-base font-semibold text-[#D4A843] hover:bg-[#D4A843]/10 transition-colors"
          >
            Lihat Demo
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                     2. SUPPORTED GAMES                             */
/* ═══════════════════════════════════════════════════════════════════ */

const games = [
  { name: "Mobile Legends", status: "active" as const, color: "#3B82F6", icon: Sword },
  { name: "Free Fire", status: "active" as const, color: "#F59E0B", icon: Flame },
  { name: "Honor of Kings", status: "soon" as const, color: "#94A3B8", icon: Gamepad2 },
  { name: "Tekken", status: "soon" as const, color: "#94A3B8", icon: Gamepad2 },
  { name: "eFootball", status: "soon" as const, color: "#94A3B8", icon: Gamepad2 },
];

function GamesSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Game yang <span className="text-[#D4A843]">Didukung</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-[#94A3B8]">
            Mulai dari MLBB dan Free Fire, dengan lebih banyak game segera hadir.
          </p>
        </FadeUp>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {games.map((g, i) => (
            <FadeUp key={g.name} delay={i * 0.1}>
              <div
                className={`flex min-w-[160px] flex-col items-center gap-3 rounded-2xl border p-6 transition-all ${
                  g.status === "active"
                    ? "border-white/10 bg-[#1A2332] hover:border-[#D4A843]/40"
                    : "border-white/5 bg-[#1A2332]/50 opacity-60"
                }`}
              >
                <div
                  className="flex size-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${g.color}20` }}
                >
                  <g.icon className="size-7" style={{ color: g.color }} />
                </div>
                <span className="text-sm font-semibold">{g.name}</span>
                {g.status === "active" ? (
                  <span
                    className="rounded-full px-3 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${g.color}20`,
                      color: g.color,
                    }}
                  >
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs font-medium text-[#94A3B8]">
                    Coming Soon
                  </span>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                   3. HOW IT WORKS                                  */
/* ═══════════════════════════════════════════════════════════════════ */

const steps = [
  { icon: UserPlus, title: "Daftar", desc: "Registrasi akun & verifikasi identitas kamu." },
  { icon: BookOpen, title: "Belajar", desc: "Ikuti kurikulum terstruktur dari coach profesional." },
  { icon: ClipboardCheck, title: "Dievaluasi", desc: "Gameplay di-review oleh coach bersertifikat." },
  { icon: Trophy, title: "Di-scout", desc: "Talenta terbaik masuk pipeline scouting tim pro." },
];

function HowItWorksSection() {
  return (
    <section className="relative py-24 px-4">
      {/* subtle bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(212,168,67,0.05),transparent)]" />

      <div className="relative mx-auto max-w-5xl">
        <FadeUp>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Bagaimana <span className="text-[#D4A843]">Cara Kerjanya</span>
          </h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.15} className="relative">
              {/* connector line (hidden on last & mobile) */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-10 hidden h-px w-8 translate-x-full bg-gradient-to-r from-[#D4A843]/60 to-transparent lg:block" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="flex size-20 items-center justify-center rounded-2xl border border-[#D4A843]/20 bg-[#D4A843]/10">
                    <s.icon className="size-9 text-[#D4A843]" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-[#D4A843] text-xs font-bold text-[#0B1120]">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                     4. FEATURES                                    */
/* ═══════════════════════════════════════════════════════════════════ */

const features = [
  {
    icon: GraduationCap,
    title: "Kurikulum Terstruktur",
    desc: "Belajar dari kurikulum yang disusun oleh coach profesional MDL.",
  },
  {
    icon: Target,
    title: "Evaluasi Coach Pro",
    desc: "Gameplay dianalisis oleh coach bersertifikat dengan rubrik terstandar.",
  },
  {
    icon: Search,
    title: "Talent Scouting",
    desc: "Sistem AI mendeteksi talenta terbaik untuk pipeline profesional.",
  },
  {
    icon: MessageCircle,
    title: "Komunitas Kompetitif",
    desc: "Forum eksklusif yang dimoderasi ketat, bebas toxic.",
  },
  {
    icon: Briefcase,
    title: "Jalur Karir",
    desc: "Bukan hanya jadi pro player, tapi juga coach, analyst, atau content creator.",
  },
  {
    icon: Brain,
    title: "Mental & Wellness",
    desc: "Program kesehatan mental dan fisik untuk performa optimal.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Fitur <span className="text-[#D4A843]">Utama</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-[#94A3B8]">
            Semua yang kamu butuhkan untuk naik level, dalam satu platform.
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.08}>
              <div className="group relative rounded-2xl border border-white/8 bg-[#1A2332] p-6 transition-all duration-300 hover:border-[#D4A843]/30 hover:shadow-[0_0_30px_-5px_rgba(212,168,67,0.15)]">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#D4A843]/10 transition-colors group-hover:bg-[#D4A843]/20">
                  <f.icon className="size-6 text-[#D4A843]" />
                </div>
                <h3 className="font-heading text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                       5. STATS                                     */
/* ═══════════════════════════════════════════════════════════════════ */

function StatsSection() {
  const stats = [
    { value: 35, suffix: " Juta+", label: "Pemain MLBB Indonesia" },
    { value: 192, suffix: " Juta", label: "Gamer Indonesia" },
    { value: 0, suffix: "", label: "Platform Pembinaan Terstruktur... Sampai Sekarang." },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(212,168,67,0.06),transparent)]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center">
                <span className="font-heading text-4xl font-extrabold text-[#D4A843] sm:text-5xl">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </span>
                <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-[#94A3B8]">
                  {s.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                      6. PRICING                                    */
/* ═══════════════════════════════════════════════════════════════════ */

const tiers = [
  {
    name: "Free",
    price: "Rp 0",
    period: "",
    features: ["Komunitas Read-Only", "React / Vote", "Weekly Digest", "1 Quiz Gratis / Minggu"],
    cta: "Mulai Gratis",
    highlighted: false,
    color: "#94A3B8",
  },
  {
    name: "Silver",
    price: "Rp 49K",
    period: "/bulan",
    features: ["LMS Full Access", "Post di Komunitas", "Leaderboard", "Semua fitur Free"],
    cta: "Pilih Silver",
    highlighted: false,
    color: "#C0C0C0",
  },
  {
    name: "Gold",
    price: "Rp 99K",
    period: "/bulan",
    features: ["Evaluasi Coach", "Review History", "Improvement Plan", "Semua fitur Silver"],
    cta: "Pilih Gold",
    highlighted: true,
    color: "#D4A843",
  },
  {
    name: "Platinum",
    price: "Rp 199K",
    period: "/bulan",
    features: [
      "Scrim Simulation",
      "Environment Pro",
      "Priority Scouting",
      "Semua fitur Gold",
    ],
    cta: "Pilih Platinum",
    highlighted: false,
    color: "#7C3AED",
  },
];

function PricingSection() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
            Pilih <span className="text-[#D4A843]">Paket</span> Kamu
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-[#94A3B8]">
            Mulai gratis, upgrade kapan saja.
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <div
                className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                  t.highlighted
                    ? "border-[#D4A843]/50 bg-[#1A2332] shadow-[0_0_40px_-8px_rgba(212,168,67,0.25)]"
                    : "border-white/8 bg-[#1A2332]/80"
                }`}
              >
                {t.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4A843] px-4 py-1 text-xs font-bold text-[#0B1120]">
                    Paling Populer
                  </span>
                )}

                <div className="mb-4">
                  <span
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{ color: t.color }}
                  >
                    {t.name}
                  </span>
                </div>

                <div className="mb-6">
                  <span className="font-heading text-3xl font-extrabold">{t.price}</span>
                  {t.period && <span className="text-sm text-[#94A3B8]">{t.period}</span>}
                </div>

                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                      <Check className="mt-0.5 size-4 shrink-0" style={{ color: t.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`h-11 w-full rounded-xl text-sm font-semibold transition-colors ${
                    t.highlighted
                      ? "bg-[#D4A843] text-[#0B1120] hover:bg-[#F0DCA0]"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {t.cta}
                </Button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*                        7. FOOTER                                   */
/* ═══════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#0B1120] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <span className="font-heading text-xl font-bold text-[#D4A843]">IXON Academy</span>
            <p className="mt-1 text-sm text-[#94A3B8]">Didukung oleh IXON Esport</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-[#94A3B8]">
            <a href="#" className="transition-colors hover:text-white">Tentang</a>
            <a href="#" className="transition-colors hover:text-white">Kontak</a>
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {[Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-[#94A3B8] transition-colors hover:border-[#D4A843]/40 hover:text-[#D4A843]"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-[#64748B]">
          &copy; 2026 IXON Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
