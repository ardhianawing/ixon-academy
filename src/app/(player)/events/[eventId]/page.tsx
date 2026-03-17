"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Trophy,
  ArrowLeft,
  Gamepad2,
  Gift,
  FileText,
  UserPlus,
  Medal,
  Swords,
  Loader2,
} from "lucide-react";

import { TierBadge } from "@/components/ui/TierBadge";
import { GameBadge } from "@/components/ui/GameBadge";
import { useEventDetailData } from "@/hooks/useEventDetailData";

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { data: ev, loading } = useEventDetailData(eventId);

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(["", "", "", "", ""]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  const isCompleted = ev.status === "completed";
  const is1v1 = ev.format === "1v1";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Back Link */}
      <motion.div variants={item}>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Events
        </Link>
      </motion.div>

      {/* Event Header */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-5 md:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h1 className="font-heading font-bold text-2xl text-foreground">
              {ev.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {ev.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-4" />
                {ev.slots}
              </span>
            </div>
          </div>
          <GameBadge game={ev.game} />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400">
            {ev.format}
          </span>
          <TierBadge tier={ev.minTier} size="sm" />
          <span className="text-[10px] text-muted-foreground">
            min. required
          </span>
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
              isCompleted
                ? "bg-white/10 text-muted-foreground"
                : "bg-emerald-500/15 text-emerald-400"
            }`}
          >
            {isCompleted ? "Selesai" : "Pendaftaran Dibuka"}
          </span>
        </div>
      </motion.section>

      {/* Description */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-5 md:p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <FileText className="size-5 text-[#D4A843]" />
          <h2 className="font-heading font-bold text-foreground">
            Deskripsi & Aturan
          </h2>
        </div>
        <div className="space-y-3">
          {ev.description.map((para, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </motion.section>

      {/* Prizes */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-5 md:p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Gift className="size-5 text-[#D4A843]" />
          <h2 className="font-heading font-bold text-foreground">Hadiah</h2>
        </div>
        <div className="space-y-2">
          {ev.prizes.map((prize, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="shrink-0 size-8 rounded-lg bg-[#D4A843]/10 flex items-center justify-center">
                {i === 0 ? (
                  <Trophy className="size-4 text-[#D4A843]" />
                ) : (
                  <Medal className="size-4 text-muted-foreground" />
                )}
              </div>
              <span className="text-sm text-foreground">{prize}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Registration Form (if upcoming) */}
      {!isCompleted && (
        <motion.section
          variants={item}
          className="rounded-2xl border border-white/5 bg-card p-5 md:p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <UserPlus className="size-5 text-[#D4A843]" />
            <h2 className="font-heading font-bold text-foreground">
              Form Pendaftaran
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Nama Tim
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Masukkan nama tim..."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843]/50 transition-colors"
              />
            </div>

            {!is1v1 && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Anggota Tim (5 pemain)
                </label>
                {members.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-6 text-right shrink-0">
                      #{i + 1}
                    </span>
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => {
                        const updated = [...members];
                        updated[i] = e.target.value;
                        setMembers(updated);
                      }}
                      placeholder={`Nickname pemain ${i + 1}...`}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#D4A843]/50 focus:border-[#D4A843]/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}

            <button className="w-full rounded-lg bg-[#D4A843] hover:bg-[#C49A3A] text-black font-semibold text-sm py-3 transition-colors flex items-center justify-center gap-2">
              <Gamepad2 className="size-4" />
              Daftar Sekarang
            </button>
          </div>
        </motion.section>
      )}

      {/* Participant List / Results */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-5 md:p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Swords className="size-5 text-[#D4A843]" />
          <h2 className="font-heading font-bold text-foreground">
            {isCompleted ? "Hasil Pertandingan" : "Daftar Peserta"}
          </h2>
          <span className="text-xs text-muted-foreground ml-auto">
            {ev.teams.length} {is1v1 ? "pemain" : "tim"}
          </span>
        </div>

        {isCompleted && is1v1 ? (
          /* Results Table for 1v1 */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-left">
                  <th className="pb-3 font-semibold text-muted-foreground text-xs w-12">
                    #
                  </th>
                  <th className="pb-3 font-semibold text-muted-foreground text-xs">
                    Pemain
                  </th>
                  <th className="pb-3 font-semibold text-muted-foreground text-xs text-center">
                    K/D/A
                  </th>
                  <th className="pb-3 font-semibold text-muted-foreground text-xs text-right">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ev.teams.map((team) => (
                  <tr
                    key={team.name}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center justify-center size-6 rounded-md text-xs font-bold ${
                          team.rank === 1
                            ? "bg-[#D4A843]/15 text-[#D4A843]"
                            : team.rank === 2
                              ? "bg-gray-400/15 text-gray-400"
                              : team.rank === 3
                                ? "bg-amber-700/15 text-amber-600"
                                : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {team.rank}
                      </span>
                    </td>
                    <td className="py-3 font-medium text-foreground">
                      {team.name}
                    </td>
                    <td className="py-3 text-center text-muted-foreground font-mono text-xs">
                      {team.kda}
                    </td>
                    <td className="py-3 text-right font-semibold text-foreground">
                      {team.score?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Participant Grid for team events */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ev.teams.map((team) => (
              <div
                key={team.name}
                className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-gradient-to-br from-[#D4A843]/20 to-[#D4A843]/5 flex items-center justify-center">
                    <Users className="size-4 text-[#D4A843]" />
                  </div>
                  <span className="font-semibold text-sm text-foreground">
                    {team.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {team.members.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}
