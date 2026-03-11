"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import {
  BookOpen,
  Clock,
  Trophy,
  Shield,
  TrendingUp,
  Gamepad2,
  GraduationCap,
  User,
  ArrowLeft,
  FileText,
  Calendar,
  MessageSquare,
  Target,
  Briefcase,
  Timer,
  Brain,
  CheckCircle2,
  AlertCircle,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const child = {
  nickname: "AceHunter",
  realName: "Andi Pratama",
  game: "MLBB",
  tier: "Free",
  level: 5,
  avatar: "AP",
  joinDate: "Januari 2026",
};

const weeklyReport = {
  text: "Minggu ini, Andi menyelesaikan 3 lessons, mengerjakan 2 quiz (rata-rata 85%), dan aktif di komunitas dengan 0 report.",
  period: "3 - 9 Maret 2026",
};

const detailedStats = [
  {
    icon: BookOpen,
    label: "Lessons Diselesaikan",
    value: "3",
    unit: "lessons",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Trophy,
    label: "Quiz Dikerjakan",
    value: "2",
    unit: "quiz",
    color: "text-[#D4A843]",
    bgColor: "bg-[#D4A843]/10",
    subtitle: "Rata-rata: 85%",
  },
  {
    icon: Clock,
    label: "Total Jam Belajar",
    value: "13.5",
    unit: "jam",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: MessageSquare,
    label: "Post di Komunitas",
    value: "4",
    unit: "post",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    subtitle: "0 report",
  },
  {
    icon: Target,
    label: "Talent Score",
    value: "72",
    unit: "/100",
    color: "text-[#D4A843]",
    bgColor: "bg-[#D4A843]/10",
    subtitle: "+4 dari minggu lalu",
  },
  {
    icon: Shield,
    label: "Attitude Score",
    value: "92",
    unit: "/100",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    subtitle: "Sangat Baik",
  },
];

const timeManagement = [
  { name: "Belajar Kursus", value: 45, color: "#D4A843" },
  { name: "Quiz & Latihan", value: 20, color: "#3B82F6" },
  { name: "Komunitas & Forum", value: 15, color: "#8B5CF6" },
  { name: "Menonton Replay", value: 12, color: "#10B981" },
  { name: "Mentoring", value: 8, color: "#F59E0B" },
];

const careerInfo = {
  interest: "Pro Player / Content Creator",
  preferredRole: "Jungler",
  strengths: ["Mekanik Hero", "Farming Efficiency", "Adaptasi Meta"],
  areasToImprove: ["Map Awareness", "Komunikasi Tim", "Late Game Decision"],
  recommendation:
    "Andi menunjukkan potensi yang baik sebagai Jungler. Disarankan untuk mengikuti kursus 'Advanced Rotation' dan sesi mentoring dengan coach jungler untuk memperdalam pemahaman rotasi dan timing objektif.",
};

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

function PieTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A2332] border border-gray-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-[#D4A843]">{payload[0].value}% waktu</p>
      </div>
    );
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChildReportPage({
  params,
}: {
  params: { childId: string };
}) {
  return (
    <div className="space-y-8">
      {/* Back nav */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4A843] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A843] to-[#B8922F] flex items-center justify-center text-black font-bold text-xl shrink-0">
            {child.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Laporan: <span className="text-[#D4A843]">{child.nickname}</span>
            </h1>
            <p className="text-gray-400 text-sm">
              {child.realName} — Bergabung sejak {child.joinDate}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-[#D4A843]/10 text-[#D4A843] border-[#D4A843]/30 text-xs">
                Level {child.level}
              </Badge>
              <Badge
                variant="outline"
                className="border-gray-600 text-gray-400 text-xs"
              >
                {child.game}
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weekly Auto-Generated Report */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-[#1A2332] border-gray-800 border-l-4 border-l-[#D4A843]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4A843]/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#D4A843]" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-semibold">Laporan Mingguan</h3>
                  <Badge
                    variant="outline"
                    className="border-gray-600 text-gray-400 text-xs"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    {weeklyReport.period}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {weeklyReport.text}
                </p>
                <p className="text-xs text-gray-500 italic">
                  Laporan ini dibuat secara otomatis berdasarkan aktivitas anak
                  Anda di platform IXON Academy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#D4A843]" />
          Statistik Detail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {detailedStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
            >
              <Card className="bg-[#1A2332] border-gray-800">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center shrink-0`}
                    >
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 truncate">
                        {stat.label}
                      </p>
                      <p className={`text-xl font-bold ${stat.color}`}>
                        {stat.value}
                        <span className="text-sm text-gray-500 font-normal ml-0.5">
                          {stat.unit}
                        </span>
                      </p>
                      {stat.subtitle && (
                        <p className="text-xs text-gray-500">{stat.subtitle}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Career Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <Card className="bg-[#1A2332] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#D4A843]" />
              Informasi Karir & Potensi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Minat Karir</p>
                <p className="text-white font-medium">
                  {careerInfo.interest}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Role Favorit</p>
                <Badge className="bg-[#D4A843]/10 text-[#D4A843] border-[#D4A843]/30">
                  {careerInfo.preferredRole}
                </Badge>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-green-400 font-medium mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Kekuatan
                </p>
                <div className="space-y-1.5">
                  {careerInfo.strengths.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <Star className="w-3 h-3 text-[#D4A843]" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-orange-400 font-medium mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Area Peningkatan
                </p>
                <div className="space-y-1.5">
                  {careerInfo.areasToImprove.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <Target className="w-3 h-3 text-orange-400" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div className="bg-[#0B1120] rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                <Brain className="w-3 h-3" />
                Rekomendasi Coach
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {careerInfo.recommendation}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Time Management Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="bg-[#1A2332] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Timer className="w-5 h-5 text-[#D4A843]" />
              Distribusi Waktu Belajar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeManagement}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {timeManagement.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value: string) => (
                      <span className="text-gray-300 text-sm">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Distribusi waktu berdasarkan aktivitas di platform minggu ini
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Safety Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <Card className="bg-[#1A2332] border-gray-800 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-green-400 font-medium">
                Catatan Keamanan:
              </span>{" "}
              Semua aktivitas Andi di platform IXON Academy dipantau secara
              otomatis. Konten yang tidak pantas akan langsung diblokir dan
              dilaporkan. Anda akan menerima notifikasi jika ada aktivitas yang
              memerlukan perhatian.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
