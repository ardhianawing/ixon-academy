"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Clock,
  Video,
  ArrowLeft,
  Target,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMySessionsData } from "@/hooks/useMySessionsData";

// ─── Component ────────────────────────────────────────────────────────────────

function RatingStars({
  rating,
  interactive = false,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={`w-4 h-4 ${
            idx < rating
              ? "text-[#D4A843] fill-[#D4A843]"
              : "text-gray-600"
          } ${interactive ? "cursor-pointer hover:text-[#D4A843]" : ""}`}
          onClick={() => interactive && onRate?.(idx + 1)}
        />
      ))}
    </div>
  );
}

export default function MySessionsPage() {
  const { data, loading } = useMySessionsData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  const { upcomingSessions, pastSessions } = data;

  return (
    <div className="space-y-8">
      {/* Back nav */}
      <Link
        href="/mentorship"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4A843] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Mentor Directory
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Sesi <span className="text-[#D4A843]">Mentoring</span> Saya
        </h1>
        <p className="text-gray-400">
          Kelola jadwal dan riwayat sesi mentoring kamu
        </p>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-[#1A2332] border border-gray-800">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-[#D4A843] data-[state=active]:text-black"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Akan Datang ({upcomingSessions.length})
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-[#D4A843] data-[state=active]:text-black"
          >
            <Clock className="w-4 h-4 mr-2" />
            Riwayat ({pastSessions.length})
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Sessions */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <Card className="bg-[#1A2332] border-gray-800 hover:border-[#D4A843]/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Mentor avatar */}
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${session.mentorColor} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                    >
                      {session.mentorInitial}
                    </div>

                    {/* Session details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {session.emoji} {session.sessionType}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            dengan{" "}
                            <span className="text-[#D4A843]">
                              {session.mentorNickname}
                            </span>
                          </p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Confirmed
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {session.time} ({session.duration})
                        </span>
                        <span className="text-[#D4A843] font-medium">
                          {session.price}
                        </span>
                      </div>

                      {session.notes && (
                        <p className="text-sm text-gray-500 italic">
                          Catatan: {session.notes}
                        </p>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="bg-[#D4A843] hover:bg-[#C49A3B] text-black font-semibold"
                        >
                          <Video className="w-4 h-4 mr-1.5" />
                          Join Session
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:text-white"
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {upcomingSessions.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Belum ada sesi yang dijadwalkan</p>
              <Link href="/mentorship">
                <Button className="mt-4 bg-[#D4A843] hover:bg-[#C49A3B] text-black">
                  Cari Mentor
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>

        {/* Past Sessions */}
        <TabsContent value="past" className="space-y-4">
          {pastSessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <Card className="bg-[#1A2332] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Mentor avatar */}
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${session.mentorColor} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                    >
                      {session.mentorInitial}
                    </div>

                    {/* Session details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {session.emoji} {session.sessionType}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            dengan{" "}
                            <span className="text-[#D4A843]">
                              {session.mentorNickname}
                            </span>
                          </p>
                        </div>
                        <Badge className="bg-gray-700/50 text-gray-300 border-gray-600">
                          Selesai
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {session.time} ({session.duration})
                        </span>
                      </div>

                      {/* Rating */}
                      {session.rating && (
                        <div className="flex items-center gap-2">
                          <RatingStars rating={session.rating} />
                          <span className="text-sm text-white font-medium">
                            {session.rating}/5
                          </span>
                        </div>
                      )}

                      {/* Review */}
                      {session.review && (
                        <p className="text-sm text-gray-400 leading-relaxed bg-[#0B1120] rounded-lg p-3 italic">
                          &ldquo;{session.review}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Menjadi Mentor CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-[#1A2332] to-[#0B1120] border-[#D4A843]/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A843]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-8 relative">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#D4A843]/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-8 h-8 text-[#D4A843]" />
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  Menjadi Mentor di IXON Academy
                </h2>
                <p className="text-gray-400 max-w-xl">
                  Punya pengalaman di esports? Bagikan ilmu kamu dan bantu
                  generasi baru pro player Indonesia. Dapatkan penghasilan sambil
                  membangun komunitas gaming yang positif.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                  <div className="flex items-center gap-1.5 text-sm text-gray-300">
                    <Award className="w-4 h-4 text-[#D4A843]" />
                    Flexible Schedule
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-300">
                    <Users className="w-4 h-4 text-[#D4A843]" />
                    Komunitas Mentor
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-300">
                    <Target className="w-4 h-4 text-[#D4A843]" />
                    Penghasilan Kompetitif
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-[#D4A843] hover:bg-[#C49A3B] text-black font-semibold shrink-0"
              >
                Daftar Jadi Mentor
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
