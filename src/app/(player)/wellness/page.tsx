"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Moon,
  Dumbbell,
  Eye,
  Hand,
  Flame,
  Monitor,
  Bed,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toast } from "sonner";
import { useWellnessData } from "@/hooks/useWellnessData";

// ── UI Constants ─────────────────────────────────────────────────────────────

const moodEmojis = [
  { emoji: "\ud83d\ude2b", label: "Sangat Buruk", value: 1 },
  { emoji: "\ud83d\ude1f", label: "Kurang Baik", value: 2 },
  { emoji: "\ud83d\ude10", label: "Biasa Saja", value: 3 },
  { emoji: "\ud83d\ude42", label: "Baik", value: 4 },
  { emoji: "\ud83d\ude04", label: "Sangat Baik", value: 5 },
];

const TIP_UI_MAP: Record<string, { icon: React.ComponentType<{ className?: string }>; iconColor: string; bgColor: string }> = {
  "Ergonomi Gaming": { icon: Monitor, iconColor: "text-blue-400", bgColor: "bg-blue-500/10" },
  "Sleep Hygiene": { icon: Bed, iconColor: "text-purple-400", bgColor: "bg-purple-500/10" },
  "Eye Care": { icon: Eye, iconColor: "text-emerald-400", bgColor: "bg-emerald-500/10" },
};

type HandCondition = "baik" | "kurang" | "sakit";

// ── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ── Toggle Button Component ──────────────────────────────────────────────────

function ToggleButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
        active
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-white/5 bg-[#0B1120] text-[#64748B] hover:border-white/10"
      }`}
    >
      <Icon className="size-4" />
      {label}
      {active && <CheckCircle2 className="size-4 ml-auto text-emerald-400" />}
    </button>
  );
}

// ── Page Component ───────────────────────────────────────────────────────────

export default function WellnessPage() {
  const { data, loading } = useWellnessData();
  const [sleepHours, setSleepHours] = useState(7);
  const [exercised, setExercised] = useState(false);
  const [eyeRest, setEyeRest] = useState(false);
  const [handCondition, setHandCondition] = useState<HandCondition>("baik");
  const [mood, setMood] = useState<number | null>(null);

  const handleSubmit = () => {
    toast.success("Check-in berhasil! +10 XP", {
      description: "Data kesehatanmu telah dicatat. Tetap jaga kesehatanmu!",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const sleepData = data.sleepHistory;
  const tips = data.tips.map((tip) => {
    const ui = TIP_UI_MAP[tip.title] ?? { icon: Monitor, iconColor: "text-blue-400", bgColor: "bg-blue-500/10" };
    return { ...tip, ...ui };
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariant}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10">
            <Heart className="size-5 text-rose-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Physical Wellness
            </h1>
            <p className="text-sm text-[#94A3B8]">
              Jaga tubuh, jaga performa
            </p>
          </div>
        </div>
      </motion.div>

      {/* Streak */}
      <motion.section variants={itemVariant}>
        <div className="flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 px-5 py-3">
          <Flame className="size-6 text-orange-400" />
          <div>
            <p className="text-sm font-semibold text-orange-400">
              5 hari check-in berturut-turut!
            </p>
            <p className="text-xs text-[#94A3B8]">
              Terus pertahankan streak-mu. 2 hari lagi dapat badge baru!
            </p>
          </div>
        </div>
      </motion.section>

      {/* Daily Check-in Form */}
      <motion.section variants={itemVariant}>
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6 space-y-6">
          <h2 className="font-bold text-white">Daily Check-in</h2>

          {/* Sleep Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="size-4 text-indigo-400" />
                <span className="text-sm font-medium text-white">
                  Tidur semalam
                </span>
              </div>
              <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-sm font-bold text-indigo-400">
                {sleepHours} jam
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={12}
              step={0.5}
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-indigo-400
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-400 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1A2332]
                [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-400 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#1A2332]"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>0 jam</span>
              <span>6 jam</span>
              <span>12 jam</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ToggleButton
              label="Olahraga hari ini"
              icon={Dumbbell}
              active={exercised}
              onClick={() => setExercised(!exercised)}
            />
            <ToggleButton
              label="Istirahat mata (20-20-20)"
              icon={Eye}
              active={eyeRest}
              onClick={() => setEyeRest(!eyeRest)}
            />
          </div>

          {/* Hand Condition */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hand className="size-4 text-amber-400" />
              <span className="text-sm font-medium text-white">
                Kondisi tangan
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { value: "baik", label: "Baik", color: "emerald" },
                  {
                    value: "kurang",
                    label: "Kurang Nyaman",
                    color: "amber",
                  },
                  { value: "sakit", label: "Sakit", color: "red" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setHandCondition(opt.value)}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                    handCondition === opt.value
                      ? opt.color === "emerald"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : opt.color === "amber"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                      : "border-white/5 bg-[#0B1120] text-[#64748B] hover:border-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-white">Mood</span>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {moodEmojis.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`group flex flex-col items-center gap-1 transition-all ${
                    mood === m.value
                      ? "scale-110"
                      : "opacity-50 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <span
                    className={`text-2xl sm:text-3xl transition-all ${
                      mood === m.value
                        ? "drop-shadow-[0_0_8px_rgba(212,168,67,0.5)]"
                        : ""
                    }`}
                  >
                    {m.emoji}
                  </span>
                  <span
                    className={`text-[10px] font-medium ${
                      mood === m.value ? "text-[#D4A843]" : "text-[#64748B]"
                    }`}
                  >
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-[#D4A843] py-3 text-sm font-bold text-[#0B1120] transition-all hover:bg-[#E0B84E] hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]"
          >
            Submit Check-in
          </button>
        </div>
      </motion.section>

      {/* History Charts */}
      <motion.section variants={itemVariant} className="space-y-3">
        <h2 className="font-bold text-white">Riwayat 7 Hari Terakhir</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Sleep Chart */}
          <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5">
            <p className="text-sm font-semibold text-white mb-1">Jam Tidur</p>
            <p className="text-xs text-[#94A3B8] mb-4">
              Target: 7-9 jam per malam
            </p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sleepData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 12]}
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2332",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                    itemStyle={{ color: "#818cf8" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#818cf8"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "#818cf8",
                      stroke: "#1A2332",
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 6, fill: "#818cf8" }}
                    name="Jam Tidur"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mood Chart */}
          <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5">
            <p className="text-sm font-semibold text-white mb-1">Mood Harian</p>
            <p className="text-xs text-[#94A3B8] mb-4">
              Skala 1 (Buruk) - 5 (Sangat Baik)
            </p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 5]}
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2332",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                    itemStyle={{ color: "#D4A843" }}
                  />
                  <Bar
                    dataKey="mood"
                    fill="#D4A843"
                    radius={[4, 4, 0, 0]}
                    name="Mood"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tips Section */}
      <motion.section variants={itemVariant} className="space-y-3 pb-4">
        <h2 className="font-bold text-white">Tips Kesehatan Gamer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut" as const,
              }}
              className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 space-y-3"
            >
              <div
                className={`flex size-10 items-center justify-center rounded-xl ${tip.bgColor}`}
              >
                <tip.icon className={`size-5 ${tip.iconColor}`} />
              </div>
              <h3 className="text-sm font-bold text-white">{tip.title}</h3>
              <p className="text-xs leading-relaxed text-[#94A3B8]">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
