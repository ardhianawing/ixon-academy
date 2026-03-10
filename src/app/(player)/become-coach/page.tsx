"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  DollarSign,
  Users,
  Star,
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle2,
  Loader2,
  Award,
  Target,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ─── Constants ───────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: DollarSign,
    title: "Penghasilan Fleksibel",
    desc: "Tetapkan tarif coaching sendiri dan terima pembayaran langsung.",
  },
  {
    icon: Users,
    title: "Jangkau Ribuan Pemain",
    desc: "Akses ke komunitas IXON Academy yang terus berkembang.",
  },
  {
    icon: Award,
    title: "Bangun Reputasi",
    desc: "Tingkatkan kredibilitas dengan badge Coach Verified.",
  },
];

const REQUIREMENTS = [
  "Minimal rank Mythic di MLBB atau setara di game lain",
  "Pengalaman bermain kompetitif atau coaching minimal 1 tahun",
  "Mampu berkomunikasi dengan baik dalam Bahasa Indonesia",
  "Bersedia menyelesaikan sample review sebagai bagian dari aplikasi",
  "Memiliki perangkat yang memadai untuk sesi coaching online",
];

const STEPS = ["Info Pribadi", "Keahlian Game", "Pengalaman", "Sample Review"];

const MOCK_GAMEPLAY = {
  player: "SilverFox_ID",
  rank: "Legend II",
  hero: "Ling",
  role: "Jungler",
  match: "Ranked — Kalah 8-15 (25:32)",
  notes:
    "Early game farming lambat, missed 2 turtle, tidak join teamfight mid-game, build tidak optimal untuk lawan yang tanky.",
};

const RUBRIC = [
  "Mekanik (1-10): Skill usage, combo execution",
  "Game Sense (1-10): Map awareness, objective control",
  "Decision Making (1-10): Positioning, timing engage",
  "Saran Perbaikan: minimal 3 poin actionable",
];

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function BecomeCoachPage() {
  const [step, setStep] = useState(0); // 0 = landing, 1-4 = form steps, 5 = success
  const [formData, setFormData] = useState({
    nama: "Ahmad Tensai",
    email: "tensai@email.com",
    phone: "0812-3456-7890",
    game: "Mobile Legends: Bang Bang",
    rank: "Mythical Glory",
    role: "Jungler",
    rankProof: "",
    experience: "",
    sampleReview: "",
  });

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // ─── Landing ────────────────────────────────────────────────

  if (step === 0) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-white">Jadi Coach di IXON</h1>
          <p className="text-sm text-gray-400 mt-1">
            Bagikan keahlianmu dan bantu pemain lain berkembang
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-[#1A2332] border-white/5 p-5 text-center space-y-3 h-full">
                  <div className="h-12 w-12 rounded-xl bg-[#D4A843]/20 flex items-center justify-center mx-auto">
                    <Icon className="h-6 w-6 text-[#D4A843]" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {b.title}
                  </h3>
                  <p className="text-xs text-gray-400">{b.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-[#1A2332] border-white/5 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-[#D4A843]" /> Persyaratan
            </h2>
            <ul className="space-y-2">
              {REQUIREMENTS.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A843] mt-0.5 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => setStep(1)}
            className="w-full bg-[#D4A843] hover:bg-[#C49A3A] text-black font-semibold h-12 gap-2"
          >
            <Zap className="h-5 w-5" /> Mulai Mendaftar
          </Button>
        </motion.div>
      </div>
    );
  }

  // ─── Success ────────────────────────────────────────────────

  if (step === 5) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Lamaran Sedang Direview
          </h2>
          <p className="text-sm text-gray-400 max-w-md">
            Terima kasih telah mendaftar sebagai coach! Tim kami akan meninjau
            lamaran kamu dalam 3-5 hari kerja. Kamu akan menerima notifikasi
            hasilnya.
          </p>
          <Button
            onClick={() => setStep(0)}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5"
          >
            Kembali ke Beranda
          </Button>
        </motion.div>
      </div>
    );
  }

  // ─── Form Steps ─────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Pendaftaran Coach</h1>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1.5 rounded-full transition-colors ${
                i + 1 <= step ? "bg-[#D4A843]" : "bg-[#1A2332]"
              }`}
            />
            <p
              className={`text-[10px] mt-1 ${
                i + 1 === step ? "text-[#D4A843] font-medium" : "text-gray-500"
              }`}
            >
              {s}
            </p>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Informasi Pribadi
              </h2>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-400">Nama Lengkap</Label>
                  <Input
                    value={formData.nama}
                    onChange={(e) => updateField("nama", e.target.value)}
                    className="bg-[#0B1120] border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Email</Label>
                  <Input
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="bg-[#0B1120] border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Nomor Telepon</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="bg-[#0B1120] border-white/10 text-white"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Game Expertise */}
          {step === 2 && (
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Keahlian Game
              </h2>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-400">Game Utama</Label>
                  <Input
                    value={formData.game}
                    onChange={(e) => updateField("game", e.target.value)}
                    className="bg-[#0B1120] border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Rank Tertinggi</Label>
                  <Input
                    value={formData.rank}
                    onChange={(e) => updateField("rank", e.target.value)}
                    className="bg-[#0B1120] border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Role Utama</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    className="bg-[#0B1120] border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">
                    Upload Bukti Rank (Screenshot)
                  </Label>
                  <div className="mt-1 border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-[#D4A843]/30 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">
                      Klik atau drag file di sini
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      PNG, JPG maksimal 5MB
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Experience */}
          {step === 3 && (
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Pengalaman
              </h2>
              <div>
                <Label className="text-xs text-gray-400">
                  Ceritakan pengalaman bermain dan/atau coaching kamu
                </Label>
                <Textarea
                  value={formData.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  placeholder="Contoh: Saya sudah bermain MLBB sejak Season 8, pernah menjadi captain tim kampus, dan sudah coaching 20+ murid secara privat..."
                  rows={6}
                  className="bg-[#0B1120] border-white/10 text-white mt-1"
                />
              </div>
            </Card>
          )}

          {/* Step 4: Sample Review */}
          {step === 4 && (
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Sample Review
              </h2>
              <p className="text-xs text-gray-400">
                Tulis review untuk gameplay berikut menggunakan rubrik yang
                disediakan.
              </p>

              {/* Mock Gameplay Info */}
              <div className="bg-[#0B1120] rounded-lg p-4 border border-white/5 space-y-2">
                <h3 className="text-sm font-semibold text-white">
                  Data Gameplay
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Player:</span>{" "}
                    <span className="text-white">{MOCK_GAMEPLAY.player}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rank:</span>{" "}
                    <span className="text-white">{MOCK_GAMEPLAY.rank}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Hero:</span>{" "}
                    <span className="text-white">{MOCK_GAMEPLAY.hero}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Role:</span>{" "}
                    <span className="text-white">{MOCK_GAMEPLAY.role}</span>
                  </div>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Match:</span>{" "}
                  <span className="text-white">{MOCK_GAMEPLAY.match}</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Catatan:</span>{" "}
                  <span className="text-gray-300">{MOCK_GAMEPLAY.notes}</span>
                </div>
              </div>

              {/* Rubric */}
              <div className="bg-[#D4A843]/10 rounded-lg p-4 border border-[#D4A843]/20">
                <h3 className="text-sm font-semibold text-[#D4A843] mb-2">
                  Rubrik Penilaian
                </h3>
                <ul className="space-y-1">
                  {RUBRIC.map((r, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                      <Star className="h-3 w-3 text-[#D4A843] mt-0.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Label className="text-xs text-gray-400">
                  Tulis review kamu di sini
                </Label>
                <Textarea
                  value={formData.sampleReview}
                  onChange={(e) =>
                    updateField("sampleReview", e.target.value)
                  }
                  placeholder="Mekanik (7/10): Combo Ling cukup baik tapi sering miss S1 di early game..."
                  rows={8}
                  className="bg-[#0B1120] border-white/10 text-white mt-1"
                />
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {step > 1 && (
          <Button
            onClick={prevStep}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5 gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Kembali
          </Button>
        )}
        <Button
          onClick={nextStep}
          className="flex-1 bg-[#D4A843] hover:bg-[#C49A3A] text-black font-semibold gap-1"
        >
          {step === 4 ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Kirim Lamaran
            </>
          ) : (
            <>
              Lanjut <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
