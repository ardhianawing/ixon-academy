"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  Ban,
  CheckCircle,
  MessageSquareWarning,
  Clock,
  Flag,
} from "lucide-react";

interface Report {
  id: number;
  type: string;
  content: string;
  author: string;
  authorAvatar: string;
  reporter: string;
  reason: string;
  timestamp: string;
  status: "Pending" | "Resolved";
}

const mockReports: Report[] = [
  {
    id: 1,
    type: "Toxic comment",
    content:
      "Lu noob banget sih, uninstall aja dah game-nya. Gak guna main rank segitu doang...",
    author: "DewiML",
    authorAvatar: "DK",
    reporter: "RizkyGG",
    reason: "Bahasa kasar",
    timestamp: "2026-03-10 14:32",
    status: "Pending",
  },
  {
    id: 2,
    type: "Spam promotion",
    content:
      "JOIN server discord gue buat joki murah! Mythic cuma 50rb! DM sekarang buat promo spesial...",
    author: "SpammerZ",
    authorAvatar: "SZ",
    reporter: "PermataMVP",
    reason: "Promosi tidak relevan",
    timestamp: "2026-03-10 12:15",
    status: "Pending",
  },
  {
    id: 3,
    type: "Offensive content",
    content:
      "Post berisi konten menyinggung suku dan agama tertentu. [Konten disembunyikan untuk moderasi]",
    author: "ToxicUser99",
    authorAvatar: "TU",
    reporter: "CoachAlex",
    reason: "SARA",
    timestamp: "2026-03-10 09:48",
    status: "Pending",
  },
];

const reasonColors: Record<string, string> = {
  "Bahasa kasar": "bg-orange-500/20 text-orange-400",
  "Promosi tidak relevan": "bg-yellow-500/20 text-yellow-400",
  SARA: "bg-red-500/20 text-red-400",
};

export default function ModerationPage() {
  const [reports, setReports] = useState(mockReports);

  const handleAction = (id: number, action: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Resolved" as const } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Moderation Queue
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Tinjau dan kelola laporan konten
        </p>
      </div>

      {/* Summary */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <Flag className="size-4 text-red-400" />
          <span className="text-sm font-medium text-red-400">
            {reports.filter((r) => r.status === "Pending").length} Pending
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle className="size-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">
            {reports.filter((r) => r.status === "Resolved").length} Resolved
          </span>
        </div>
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border bg-[#1A2332] p-5 space-y-4 ${
                report.status === "Resolved"
                  ? "border-emerald-500/20 opacity-60"
                  : "border-border"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <MessageSquareWarning className="size-4 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {report.type}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                          reasonColors[report.reason] || "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {report.reason}
                      </span>
                      {report.status === "Resolved" && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {report.timestamp}
                </div>
              </div>

              {/* Content Preview */}
              <div className="rounded-lg bg-[#0B1120] border border-border/50 p-4">
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  &quot;{report.content}&quot;
                </p>
              </div>

              {/* Reporter Info */}
              <div className="flex flex-col md:flex-row gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full bg-red-500/20 flex items-center justify-center text-[10px] font-bold text-red-400">
                    {report.authorAvatar}
                  </div>
                  <span className="text-muted-foreground">
                    Oleh:{" "}
                    <span className="text-foreground font-medium">
                      @{report.author}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="size-3.5 text-[#D4A843]" />
                  <span className="text-muted-foreground">
                    Dilaporkan oleh:{" "}
                    <span className="text-foreground font-medium">
                      @{report.reporter}
                    </span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {report.status === "Pending" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleAction(report.id, "dismiss")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-500/10 text-gray-400 text-sm font-medium hover:bg-gray-500/20 transition-colors"
                  >
                    <CheckCircle className="size-3.5" />
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleAction(report.id, "warn")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-colors"
                  >
                    <AlertTriangle className="size-3.5" />
                    Warn User
                  </button>
                  <button
                    onClick={() => handleAction(report.id, "delete")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    Delete Content
                  </button>
                  <button
                    onClick={() => handleAction(report.id, "ban")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                  >
                    <Ban className="size-3.5" />
                    Ban User
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
