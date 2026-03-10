"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Clock,
  Save,
  Send,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  FileText,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RubricScore {
  label: string;
  value: number;
  comment: string;
}

// ─── Mock Submission Data ─────────────────────────────────────────────────────

const submission = {
  player: "TENSAI",
  hero: "Hayabusa",
  game: "MLBB",
  matchContext: "Ranked",
  url: "https://youtube.com/watch?v=example123",
  description:
    "Tolong review gameplay jungler saya, terutama di bagian early game pathing dan timing retribution saat objective.",
};

const rubricLabels = [
  "Mechanical Skill",
  "Game Sense",
  "Hero Mastery",
  "Teamwork",
  "Mental",
];

// ─── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReviewInterfacePage() {
  // Rubric scores
  const [rubrics, setRubrics] = useState<RubricScore[]>(
    rubricLabels.map((label) => ({ label, value: 3, comment: "" }))
  );

  // Feedback
  const [feedback, setFeedback] = useState("");
  const wordCount = feedback
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  // Improvement plan
  const [actionItems, setActionItems] = useState(["", ""]);

  // Timer
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timerStr = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const timerTooShort = minutes < 8;

  // Validation
  const allRubricsScored = rubrics.every((r) => r.value >= 1);
  const feedbackSufficient = wordCount >= 150;
  const itemsSufficient =
    actionItems.filter((i) => i.trim().length > 0).length >= 2;
  const canSubmit =
    allRubricsScored && feedbackSufficient && itemsSufficient && !timerTooShort;

  const updateRubric = (idx: number, field: keyof RubricScore, value: string | number) => {
    setRubrics((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const addItem = () => setActionItems((prev) => [...prev, ""]);
  const removeItem = (idx: number) =>
    setActionItems((prev) => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, val: string) =>
    setActionItems((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">
            Review: {submission.player}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {submission.hero} - {submission.game} - {submission.matchContext}
          </p>
        </div>
        {/* Timer */}
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-lg font-bold ${
            timerTooShort
              ? "border-red-500/30 text-red-400 bg-red-500/5"
              : "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
          }`}
        >
          <Clock className="size-4" />
          {timerStr}
          {timerTooShort && (
            <span className="text-xs font-sans font-normal ml-1">
              (min 8:00)
            </span>
          )}
        </div>
      </motion.div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Video / Gameplay Area */}
        <motion.div variants={item} className="space-y-4">
          {/* Video mock */}
          <div className="rounded-2xl border border-white/5 bg-card overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.01] flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                  <Play className="size-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Gameplay Video Player
                </p>
                <p className="text-xs text-muted-foreground/60 max-w-xs">
                  {submission.url}
                </p>
              </div>
            </div>
          </div>

          {/* Player notes */}
          <div className="rounded-xl border border-white/5 bg-card p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <FileText className="size-4 text-muted-foreground" />
              Catatan Player
            </h3>
            <p className="text-sm text-muted-foreground">
              {submission.description}
            </p>
          </div>
        </motion.div>

        {/* RIGHT: Review Form */}
        <motion.div variants={item} className="space-y-5">
          {/* Rubric Sliders */}
          <div className="rounded-2xl border border-white/5 bg-card p-5 space-y-5">
            <h3 className="font-heading font-bold text-foreground">
              Rubric Scores
            </h3>
            {rubrics.map((r, idx) => (
              <div key={r.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {r.label}
                  </label>
                  <span className="text-sm font-bold text-[#D4A843]">
                    {r.value}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={r.value}
                  onChange={(e) =>
                    updateRubric(idx, "value", parseInt(e.target.value))
                  }
                  className="w-full accent-[#D4A843] h-2 rounded-full appearance-none bg-white/10 cursor-pointer"
                />
                <textarea
                  value={r.comment}
                  onChange={(e) =>
                    updateRubric(idx, "comment", e.target.value)
                  }
                  placeholder={`Komentar untuk ${r.label}...`}
                  rows={2}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#D4A843]/50 transition-colors resize-none"
                />
              </div>
            ))}
          </div>

          {/* Feedback Textarea */}
          <div className="rounded-2xl border border-white/5 bg-card p-5 space-y-3">
            <h3 className="font-heading font-bold text-foreground">
              Feedback Detail
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tulis feedback detail untuk player... (minimal 150 kata)"
              rows={8}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#D4A843]/50 transition-colors resize-none"
            />
            <div className="flex items-center justify-between text-xs">
              <span
                className={`font-semibold ${
                  feedbackSufficient ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {wordCount} / 150 kata
                {!feedbackSufficient && " (kurang)"}
              </span>
              {feedbackSufficient && (
                <CheckCircle2 className="size-4 text-emerald-400" />
              )}
            </div>
          </div>

          {/* Improvement Plan */}
          <div className="rounded-2xl border border-white/5 bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-foreground">
                Improvement Plan
              </h3>
              <span className="text-xs text-muted-foreground">min 2 items</span>
            </div>
            <div className="space-y-2">
              {actionItems.map((ai, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-5 shrink-0">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={ai}
                    onChange={(e) => updateItem(idx, e.target.value)}
                    placeholder="Action item..."
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#D4A843]/50 transition-colors"
                  />
                  {actionItems.length > 2 && (
                    <button
                      onClick={() => removeItem(idx)}
                      className="size-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors shrink-0"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="flex items-center gap-1.5 text-sm text-[#D4A843] hover:text-[#C49A3A] font-semibold transition-colors"
            >
              <Plus className="size-4" />
              Tambah Action Item
            </button>
          </div>

          {/* Validation Warnings */}
          {!canSubmit && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1.5">
              <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="size-3.5" />
                Selesaikan semua kriteria sebelum submit:
              </p>
              <ul className="text-xs text-muted-foreground space-y-0.5 ml-5">
                {!feedbackSufficient && <li>Feedback minimal 150 kata</li>}
                {!itemsSufficient && <li>Minimal 2 action item terisi</li>}
                {timerTooShort && <li>Durasi review minimal 8 menit</li>}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-semibold py-3 transition-colors flex items-center justify-center gap-2">
              <Save className="size-4" />
              Simpan Draft
            </button>
            <button
              disabled={!canSubmit}
              className="flex-1 rounded-xl bg-[#D4A843] hover:bg-[#C49A3A] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold py-3 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="size-4" />
              Submit Review
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
