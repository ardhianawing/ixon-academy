"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Bookmark,
  BookmarkCheck,
  Lightbulb,
  PlayCircle,
  FileText,
  Clock,
} from "lucide-react";

// ── Mock Data ────────────────────────────────────────────────────────────────

const resources = [
  {
    id: 1,
    emoji: "\ud83e\uddd8",
    title: "Mengatasi Tilt Setelah Losing Streak",
    type: "article" as const,
    readTime: "8 min",
    description:
      "Strategi mental untuk kembali fokus setelah kekalahan beruntun. Pelajari teknik grounding dan reset mindset.",
    tags: ["Tilt", "Mental Reset"],
  },
  {
    id: 2,
    emoji: "\ud83c\udfaf",
    title: "Fokus & Konsentrasi Saat Match Penting",
    type: "video" as const,
    readTime: "12 min",
    description:
      "Video panduan teknik konsentrasi dari sport psychologist. Termasuk breathing exercise dan visualization.",
    tags: ["Fokus", "Big Match"],
  },
  {
    id: 3,
    emoji: "\ud83d\ude24",
    title: "Performance Anxiety: Cara Mengatasinya",
    type: "article" as const,
    readTime: "10 min",
    description:
      "Kenali gejala performance anxiety dan pelajari cara mengatasinya agar performa tetap optimal.",
    tags: ["Anxiety", "Performa"],
  },
  {
    id: 4,
    emoji: "\ud83d\udd25",
    title: "Menghindari Burnout sebagai Gamer Kompetitif",
    type: "article" as const,
    readTime: "7 min",
    description:
      "Cara menjaga semangat bermain tanpa mengorbankan kesehatan mental. Tips dari pro player.",
    tags: ["Burnout", "Self-care"],
  },
];

const moodEmojis = [
  { emoji: "\ud83d\ude2b", label: "Sangat Buruk", value: 1 },
  { emoji: "\ud83d\ude1f", label: "Kurang Baik", value: 2 },
  { emoji: "\ud83d\ude10", label: "Biasa Saja", value: 3 },
  { emoji: "\ud83d\ude42", label: "Baik", value: 4 },
  { emoji: "\ud83d\ude04", label: "Sangat Baik", value: 5 },
];

// ── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Page Component ───────────────────────────────────────────────────────────

export default function MentalPage() {
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10">
            <Brain className="size-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Mental Performance
            </h1>
            <p className="text-sm text-[#94A3B8]">
              Kuatkan mental, tingkatkan performa
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tip of the Day */}
      <motion.section variants={item}>
        <div className="relative overflow-hidden rounded-2xl border border-[#D4A843]/20 bg-gradient-to-r from-[#D4A843]/10 via-[#1A2332] to-[#1A2332] p-5 md:p-6">
          <div className="absolute top-0 right-0 size-32 rounded-full bg-[#D4A843]/5 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#D4A843]/15">
              <Lightbulb className="size-6 text-[#D4A843]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-[#D4A843]">
                Tip of the Day
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                Ambil jeda 5 menit setiap 3 match. Mata dan pikiran butuh
                istirahat.
              </p>
              <p className="text-xs text-[#94A3B8]">
                Istirahat singkat meningkatkan konsentrasi hingga 25%
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Self Assessment */}
      <motion.section variants={item}>
        <div className="rounded-2xl border border-white/5 bg-[#1A2332] p-5 md:p-6">
          <h2 className="mb-4 font-bold text-white">
            Bagaimana perasaanmu hari ini?
          </h2>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`group flex flex-col items-center gap-1.5 transition-all ${
                  selectedMood === mood.value
                    ? "scale-110"
                    : "hover:scale-105 opacity-60 hover:opacity-100"
                }`}
              >
                <span
                  className={`text-3xl sm:text-4xl transition-all ${
                    selectedMood === mood.value
                      ? "drop-shadow-[0_0_8px_rgba(212,168,67,0.5)]"
                      : ""
                  }`}
                >
                  {mood.emoji}
                </span>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    selectedMood === mood.value
                      ? "text-[#D4A843]"
                      : "text-[#64748B]"
                  }`}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
          {selectedMood && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-sm text-[#94A3B8]"
            >
              {selectedMood <= 2
                ? "Tidak apa-apa. Istirahat dulu ya, kamu sudah berusaha."
                : selectedMood === 3
                ? "Hari biasa juga hari baik. Tetap semangat!"
                : "Bagus! Manfaatkan energi positifmu hari ini."}
            </motion.p>
          )}
        </div>
      </motion.section>

      {/* Content Library */}
      <motion.section variants={item} className="space-y-3">
        <h2 className="font-bold text-white">Konten & Resources</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#1A2332] transition-all hover:border-white/10"
            >
              {/* Card Header */}
              <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-[#0B1120] to-[#1A2332]">
                <span className="text-4xl">{resource.emoji}</span>
                {/* Type badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      resource.type === "video"
                        ? "bg-red-500/15 text-red-400"
                        : "bg-blue-500/15 text-blue-400"
                    }`}
                  >
                    {resource.type === "video" ? (
                      <PlayCircle className="size-3" />
                    ) : (
                      <FileText className="size-3" />
                    )}
                    {resource.type === "video" ? "Video" : "Artikel"}
                  </span>
                </div>
                {/* Bookmark */}
                <button
                  onClick={() => toggleBookmark(resource.id)}
                  className="absolute top-3 right-3 rounded-lg bg-black/30 p-1.5 backdrop-blur-sm transition-colors hover:bg-black/50"
                >
                  {bookmarked.has(resource.id) ? (
                    <BookmarkCheck className="size-4 text-[#D4A843]" />
                  ) : (
                    <Bookmark className="size-4 text-white/60" />
                  )}
                </button>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col gap-3 p-4">
                <h3 className="text-sm font-bold leading-snug text-white line-clamp-2">
                  {resource.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#94A3B8] line-clamp-2">
                  {resource.description}
                </p>

                {/* Tags + Meta */}
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-[#64748B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[#64748B]">
                    <Clock className="size-3" />
                    {resource.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
