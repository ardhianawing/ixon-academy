"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Gamepad2,
  Clock,
  Crown,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useSubmitGameplayData } from "@/hooks/useSubmitGameplayData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function SubmitGameplayPage() {
  const { data, loading } = useSubmitGameplayData();
  const [game, setGame] = useState("");
  const [hero, setHero] = useState("");
  const [matchContext, setMatchContext] = useState("ranked");
  const [gameplayUrl, setGameplayUrl] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  const USER_TIER = data.userTier;
  const canSubmit = game && hero && gameplayUrl && description.length > 10;

  if (USER_TIER === "SILVER" || USER_TIER === "BRONZE" || USER_TIER === "FREE") {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto space-y-6"
      >
        <motion.div variants={item}>
          <h1 className="font-heading font-bold text-2xl text-foreground">
            Submit Gameplay
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Dapatkan review profesional dari coach berpengalaman
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-2xl border border-[#D4A843]/30 bg-gradient-to-br from-[#D4A843]/10 to-[#D4A843]/5 p-8 text-center space-y-4"
        >
          <div className="size-16 rounded-2xl bg-[#D4A843]/20 flex items-center justify-center mx-auto">
            <Crown className="size-8 text-[#D4A843]" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground">
            Upgrade ke Gold untuk Submit Gameplay
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Fitur Gameplay Review hanya tersedia untuk member Gold ke atas.
            Upgrade sekarang dan dapatkan review dari coach profesional!
          </p>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#D4A843] hover:bg-[#C49A3A] text-black font-semibold px-6 py-3 transition-colors">
            <Sparkles className="size-4" />
            Upgrade ke Gold
          </button>
        </motion.div>
      </motion.div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto space-y-6"
      >
        <motion.div variants={item}>
          <h1 className="font-heading font-bold text-2xl text-foreground">
            Submit Gameplay
          </h1>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-2xl border border-emerald-500/20 bg-card p-8 text-center space-y-4"
        >
          <div className="size-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-8 text-emerald-400" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground">
            Gameplay Berhasil Dikirim!
          </h2>
          <div className="rounded-xl bg-white/5 border border-white/5 p-4 max-w-sm mx-auto space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>Status:</span>
              <span className="text-amber-400 font-semibold">Menunggu assignment...</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Estimasi: 24-48 jam
            </p>
            {priority && (
              <div className="flex items-center gap-1.5 text-xs text-[#D4A843]">
                <Sparkles className="size-3" />
                Review Prioritas aktif - estimasi lebih cepat
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading font-bold text-2xl text-foreground">
          Submit Gameplay
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kirim gameplay kamu untuk direview oleh coach profesional
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6 space-y-5"
      >
        {/* Game Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Game</label>
          <select
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#D4A843]/50 transition-colors"
          >
            <option value="" className="bg-[#1A2332]">
              Pilih game...
            </option>
            <option value="MLBB" className="bg-[#1A2332]">
              Mobile Legends: Bang Bang
            </option>
            <option value="FF" className="bg-[#1A2332]">
              Free Fire
            </option>
          </select>
        </div>

        {/* Hero Played */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Hero yang Dimainkan
          </label>
          <input
            type="text"
            value={hero}
            onChange={(e) => setHero(e.target.value)}
            placeholder="contoh: Hayabusa, Chou, Ling..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#D4A843]/50 transition-colors"
          />
        </div>

        {/* Match Context */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Konteks Match
          </label>
          <div className="flex gap-3">
            {["ranked", "scrim", "tournament"].map((ctx) => (
              <label
                key={ctx}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  matchContext === ctx
                    ? "border-[#D4A843]/50 bg-[#D4A843]/10 text-[#D4A843]"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="matchContext"
                  value={ctx}
                  checked={matchContext === ctx}
                  onChange={(e) => setMatchContext(e.target.value)}
                  className="sr-only"
                />
                <span className="capitalize">{ctx}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gameplay URL */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Gameplay URL
          </label>
          <input
            type="url"
            value={gameplayUrl}
            onChange={(e) => setGameplayUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=... atau link Google Drive"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#D4A843]/50 transition-colors"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Deskripsi / Catatan
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan apa yang ingin kamu improve, momen tertentu yang ingin dibahas, dll..."
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#D4A843]/50 transition-colors resize-none"
          />
        </div>

        {/* Priority Checkbox */}
        <label className="flex items-start gap-3 rounded-xl border border-[#D4A843]/20 bg-[#D4A843]/5 p-4 cursor-pointer hover:bg-[#D4A843]/10 transition-colors">
          <input
            type="checkbox"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
            className="mt-0.5 size-4 rounded accent-[#D4A843]"
          />
          <div>
            <span className="text-sm font-semibold text-[#D4A843] flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              Review Prioritas (bayar extra)
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              Gameplay kamu akan diprioritaskan dan direview dalam 12 jam
            </p>
          </div>
        </label>

        {/* Submit Button */}
        <button
          onClick={() => setSubmitted(true)}
          disabled={!canSubmit}
          className="w-full rounded-xl bg-[#D4A843] hover:bg-[#C49A3A] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold py-3 transition-colors flex items-center justify-center gap-2"
        >
          <Upload className="size-4" />
          Submit Gameplay
        </button>
      </motion.div>
    </motion.div>
  );
}
