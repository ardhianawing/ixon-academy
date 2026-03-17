"use client";

import { motion } from "framer-motion";
import {
  Download,
  FileImage,
  FileText,
  Link2,
  Share2,
  Trophy,
  Star,
  Gamepad2,
  Swords,
  Brain,
  BookOpen,
  ClipboardList,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TalentScoreCircle } from "@/components/ui/TalentScoreCircle";
import { useProfileExportData } from "@/hooks/useProfileExportData";

// ─── Icon Map ───────────────────────────────────────────────────────────────

const BADGE_ICON_MAP: Record<string, React.ElementType> = {
  Star,
  BookOpen,
  Trophy,
  Swords,
};

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ProfileExportPage() {
  const { data: PROFILE, loading } = useProfileExportData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  const handleAction = (action: string) => {
    toast.info("Coming soon", {
      description: `Fitur ${action} sedang dalam pengembangan.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">CV Esports</h1>
        <p className="text-sm text-gray-400 mt-1">
          Preview dan export profil esports kamu
        </p>
      </motion.div>

      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-[#1A2332] to-[#0B1120] border-[#D4A843]/20 overflow-hidden">
          {/* Gold accent top */}
          <div className="h-1.5 bg-gradient-to-r from-[#D4A843] via-[#E8C76A] to-[#D4A843]" />

          <div className="p-6 space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[#D4A843]/20 border-2 border-[#D4A843] flex items-center justify-center">
                <span className="text-2xl font-bold text-[#D4A843]">
                  {PROFILE.avatar}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {PROFILE.username}
                </h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4A843]/20 text-[#D4A843] font-medium">
                    {PROFILE.rank}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                    {PROFILE.role}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-medium">
                    {PROFILE.game}
                  </span>
                </div>
              </div>
            </div>

            {/* Talent Score */}
            <div className="flex flex-col items-center py-2">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
                Talent Score
              </p>
              <TalentScoreCircle score={PROFILE.talentScore} size={140} />
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
                Top Skills
              </p>
              <div className="space-y-3">
                {PROFILE.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-[#D4A843]">
                        {skill.score}
                      </span>
                    </div>
                    <div className="h-2 bg-[#0B1120] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full rounded-full ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
                Badges Earned
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PROFILE.badges.map((badge) => {
                  const Icon = BADGE_ICON_MAP[badge.iconName] || Star;
                  return (
                    <div
                      key={badge.name}
                      className="flex items-center gap-2 bg-[#0B1120] rounded-lg p-2.5 border border-white/5"
                    >
                      <div className="h-8 w-8 rounded-lg bg-[#D4A843]/20 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-[#D4A843]" />
                      </div>
                      <span className="text-xs font-medium text-white">
                        {badge.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0B1120] rounded-lg p-3 border border-white/5 text-center">
                <ClipboardList className="h-5 w-5 text-[#D4A843] mx-auto mb-1" />
                <p className="text-lg font-bold text-white">
                  {PROFILE.stats.matchesReviewed}
                </p>
                <p className="text-[10px] text-gray-400">Match Reviewed</p>
              </div>
              <div className="bg-[#0B1120] rounded-lg p-3 border border-white/5 text-center">
                <BookOpen className="h-5 w-5 text-[#D4A843] mx-auto mb-1" />
                <p className="text-lg font-bold text-white">
                  {PROFILE.stats.coursesCompleted}
                </p>
                <p className="text-[10px] text-gray-400">Course Completed</p>
              </div>
            </div>

            {/* IXON Watermark */}
            <div className="text-center pt-2 border-t border-white/5">
              <p className="text-[10px] text-gray-500">
                IXON Academy Esports CV &middot; ixon.academy
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Export Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        <Button
          onClick={() => handleAction("Download PNG")}
          className="bg-[#1A2332] border border-white/10 text-white hover:bg-white/5 gap-2 h-12"
        >
          <FileImage className="h-4 w-4 text-[#D4A843]" /> Download PNG
        </Button>
        <Button
          onClick={() => handleAction("Download PDF")}
          className="bg-[#1A2332] border border-white/10 text-white hover:bg-white/5 gap-2 h-12"
        >
          <FileText className="h-4 w-4 text-[#D4A843]" /> Download PDF
        </Button>
        <Button
          onClick={() => handleAction("Copy Link")}
          className="bg-[#1A2332] border border-white/10 text-white hover:bg-white/5 gap-2 h-12"
        >
          <Link2 className="h-4 w-4 text-[#D4A843]" /> Copy Link
        </Button>
        <Button
          onClick={() => handleAction("Bagikan")}
          className="bg-[#D4A843] hover:bg-[#C49A3A] text-black font-semibold gap-2 h-12"
        >
          <Share2 className="h-4 w-4" /> Bagikan
        </Button>
      </motion.div>
    </div>
  );
}
