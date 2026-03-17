"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  FileText,
  Users,
  CalendarDays,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchData, type ResultCategory } from "@/hooks/useSearchData";

// ─── Constants ──────────────────────────────────────────────────────────────

const TABS = [
  { key: "semua", label: "Semua" },
  { key: "course", label: "Courses" },
  { key: "post", label: "Posts" },
  { key: "player", label: "Players" },
  { key: "event", label: "Events" },
] as const;

const categoryMeta: Record<
  ResultCategory,
  { icon: typeof BookOpen; color: string; label: string }
> = {
  course: { icon: BookOpen, color: "bg-blue-500/20 text-blue-400", label: "Course" },
  post: { icon: FileText, color: "bg-green-500/20 text-green-400", label: "Post" },
  player: { icon: Users, color: "bg-purple-500/20 text-purple-400", label: "Player" },
  event: { icon: CalendarDays, color: "bg-orange-500/20 text-orange-400", label: "Event" },
};

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SearchPage() {
  const { data: results, loading } = useSearchData();
  const [query, setQuery] = useState("jungle");
  const [activeTab, setActiveTab] = useState<string>("semua");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  const filtered =
    activeTab === "semua"
      ? results
      : results.filter((r) => r.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kursus, post, pemain, event..."
            className="h-12 pl-12 text-base bg-[#1A2332] border-white/10 text-white placeholder:text-gray-500 rounded-xl"
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => {
          const count =
            tab.key === "semua"
              ? results.length
              : results.filter((r) => r.category === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-[#D4A843] text-black"
                  : "bg-[#1A2332] text-gray-400 hover:text-white"
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="bg-[#1A2332] border-white/5 p-8 text-center">
            <Search className="h-10 w-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;
            </p>
          </Card>
        ) : (
          filtered.map((result, i) => {
            const meta = categoryMeta[result.category];
            const Icon = meta.icon;

            return (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={result.href}>
                  <Card className="bg-[#1A2332] border-white/5 p-4 hover:border-[#D4A843]/30 transition-colors group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div
                        className={`shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${meta.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-white truncate">
                            {result.title}
                          </h3>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${meta.color}`}
                          >
                            {meta.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1">
                          {result.subtitle}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[#D4A843] transition-colors shrink-0 mt-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-gray-500 text-center">
        Menampilkan {filtered.length} hasil untuk &ldquo;{query}&rdquo;
      </p>
    </div>
  );
}
