"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  BookOpen,
  Clock,
  Trophy,
  Shield,
  TrendingUp,
  Gamepad2,
  GraduationCap,
  Heart,
  User,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const child = {
  id: "child-001",
  nickname: "AceHunter",
  realName: "Andi Pratama",
  game: "MLBB",
  tier: "Free",
  level: 5,
  avatar: "AP",
};

const weeklyHours = [
  { day: "Sen", hours: 1.5 },
  { day: "Sel", hours: 2.0 },
  { day: "Rab", hours: 1.0 },
  { day: "Kam", hours: 2.5 },
  { day: "Jum", hours: 1.5 },
  { day: "Sab", hours: 3.0 },
  { day: "Min", hours: 2.0 },
];

const courseProgress = [
  {
    title: "Dasar-Dasar Jungling",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
  },
  {
    title: "Map Awareness 101",
    progress: 40,
    totalLessons: 10,
    completedLessons: 4,
  },
];

const talentTrend = [
  { week: "Minggu 1", score: 58 },
  { week: "Minggu 2", score: 63 },
  { week: "Minggu 3", score: 68 },
  { week: "Minggu 4", score: 72 },
];

// ─── Custom Tooltip ─────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A2332] border border-gray-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-white font-medium">{label}</p>
        <p className="text-[#D4A843]">{payload[0].value} jam</p>
      </div>
    );
  }
  return null;
}

function TalentTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A2332] border border-gray-700 rounded-lg px-3 py-2 text-sm">
        <p className="text-white font-medium">{label}</p>
        <p className="text-[#D4A843]">Skor: {payload[0].value}</p>
      </div>
    );
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ParentDashboardPage() {
  const totalHours = weeklyHours.reduce((sum, d) => sum + d.hours, 0);

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Halo, <span className="text-[#D4A843]">Bapak/Ibu!</span>
        </h1>
        <p className="text-gray-400">
          Berikut perkembangan belajar anak Anda minggu ini. Kami memastikan
          pembelajaran berjalan dengan positif dan aman.
        </p>
      </motion.div>

      {/* Child Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-[#1A2332] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A843] to-[#B8922F] flex items-center justify-center text-black font-bold text-xl shrink-0">
                {child.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-bold text-white">
                    {child.nickname}
                  </h2>
                  <Badge className="bg-[#D4A843]/10 text-[#D4A843] border-[#D4A843]/30 text-xs">
                    Level {child.level}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">
                  Nama asli: {child.realName}
                </p>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Gamepad2 className="w-3 h-3" />
                    {child.game}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-gray-600 text-gray-400 text-xs"
                  >
                    {child.tier} Tier
                  </Badge>
                </div>
              </div>
              <Link href={`/child/${child.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:text-[#D4A843] hover:border-[#D4A843]/50 shrink-0"
                >
                  Lihat Laporan
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Clock,
            label: "Jam Belajar Minggu Ini",
            value: `${totalHours.toFixed(1)} jam`,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
          },
          {
            icon: BookOpen,
            label: "Lessons Diselesaikan",
            value: "3 lessons",
            color: "text-green-400",
            bgColor: "bg-green-500/10",
          },
          {
            icon: Trophy,
            label: "Rata-rata Quiz",
            value: "75%",
            color: "text-[#D4A843]",
            bgColor: "bg-[#D4A843]/10",
          },
          {
            icon: Shield,
            label: "Attitude Score",
            value: "92/100",
            color: "text-green-400",
            bgColor: "bg-green-500/10",
            subtitle: "0 laporan komunitas",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
          >
            <Card className="bg-[#1A2332] border-gray-800">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-xs text-gray-400 leading-tight">
                    {stat.label}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                {stat.subtitle && (
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {stat.subtitle}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Hours BarChart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-[#1A2332] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D4A843]" />
                Jam Belajar Minggu Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyHours}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      unit=" jam"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="hours"
                      fill="#D4A843"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Total minggu ini:{" "}
                <span className="text-[#D4A843] font-medium">
                  {totalHours.toFixed(1)} jam
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Talent Score Trend LineChart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Card className="bg-[#1A2332] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#D4A843]" />
                Tren Talent Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={talentTrend}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    />
                    <YAxis
                      domain={[50, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    />
                    <Tooltip content={<TalentTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#D4A843"
                      strokeWidth={3}
                      dot={{ fill: "#D4A843", strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Peningkatan{" "}
                <span className="text-green-400 font-medium">+14 poin</span>{" "}
                dalam 4 minggu terakhir
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Course Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="bg-[#1A2332] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#D4A843]" />
              Progress Kursus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {courseProgress.map((course) => (
              <div key={course.title} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-medium">
                    {course.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>
                <Progress
                  value={course.progress}
                  className="h-2 bg-gray-800"
                />
                <p className="text-xs text-gray-500">
                  {course.progress}% selesai
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Attitude & Safety */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <Card className="bg-[#1A2332] border-gray-800 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-green-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-white font-semibold">
                  Attitude & Keamanan
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Andi menunjukkan perilaku yang sangat baik di platform IXON
                  Academy. Skor attitude{" "}
                  <span className="text-green-400 font-medium">92/100</span>{" "}
                  menunjukkan interaksi positif dengan komunitas. Tidak ada
                  laporan pelanggaran atau konten negatif.
                </p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />0 laporan komunitas —
                  Lingkungan belajar aman
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quiz Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="bg-[#1A2332] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#D4A843]/10 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-[#D4A843]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Skor Quiz</h3>
                <p className="text-gray-400 text-sm">
                  Rata-rata:{" "}
                  <span className="text-[#D4A843] font-bold text-lg">75%</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Andi telah mengerjakan 5 quiz minggu ini dengan konsistensi
                  yang baik.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
