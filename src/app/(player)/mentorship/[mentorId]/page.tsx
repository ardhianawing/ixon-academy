"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  ArrowLeft,
  Clock,
  Users,
  Target,
  Eye,
  HelpCircle,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMentorDetailData } from "@/hooks/useMentorDetailData";

// ─── Helpers ────────────────────────────────────────────────────────────────

// Map session type icon names to components
const SESSION_ICON_MAP: Record<string, React.ElementType> = {
  Target,
  Users,
  HelpCircle,
  Eye,
};

// Generate mock schedule for next 3 days
function getNextDays(count: number) {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      label: date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "short",
      }),
      date: date.toISOString().split("T")[0],
      slots: [
        { time: "10:00", available: i !== 2 },
        { time: "14:00", available: true },
        { time: "19:00", available: i !== 3 },
      ],
    });
  }
  return days;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MentorProfilePage({
  params,
}: {
  params: Promise<{ mentorId: string }>;
}) {
  const { mentorId } = use(params);
  const { data: mentor, loading } = useMentorDetailData(mentorId);
  const schedule = getNextDays(3);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

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

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#1A2332] border-gray-800 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#D4A843] to-[#B8922F]" />
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${mentor.color} flex items-center justify-center text-white font-bold text-2xl shrink-0`}
              >
                {mentor.initial}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold text-white">
                      {mentor.nickname}
                    </h1>
                    <Badge
                      className={`text-xs ${
                        mentor.available
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-1.5 inline-block ${
                          mentor.available ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                      {mentor.available ? "Available" : "Fully Booked"}
                    </Badge>
                  </div>
                  <p className="text-gray-400">
                    {mentor.realName} — ex-{mentor.exTeam}
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <Badge
                    variant="outline"
                    className="border-[#D4A843]/40 text-[#D4A843]"
                  >
                    {mentor.role}
                  </Badge>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {mentor.yearsExp} tahun pengalaman
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.floor(mentor.rating)
                            ? "text-[#D4A843] fill-[#D4A843]"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-white ml-1">
                      {mentor.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({mentor.totalReviews})
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {mentor.bio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Career History & Expertise */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-[#1A2332] border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#D4A843]" />
                Riwayat Karir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mentor.career.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4A843] mt-2 shrink-0" />
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card className="bg-[#1A2332] border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-[#D4A843]" />
                Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-[#D4A843]/10 text-[#D4A843] border-[#D4A843]/30 text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Session Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Tipe Sesi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mentor.sessionTypes.map((session) => (
            <Card
              key={session.title}
              className={`bg-[#1A2332] border-gray-800 cursor-pointer transition-all duration-200 hover:border-[#D4A843]/50 ${
                selectedSession === session.title
                  ? "border-[#D4A843] ring-1 ring-[#D4A843]/30"
                  : ""
              }`}
              onClick={() => setSelectedSession(session.title)}
            >
              <CardContent className="p-5 space-y-3">
                <div className="text-3xl">{session.emoji}</div>
                <div>
                  <h3 className="text-white font-semibold">{session.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {session.duration}
                  </p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {session.desc}
                </p>
                <p className="text-[#D4A843] font-bold text-lg">
                  {session.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Calendar Booking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#D4A843]" />
          Pilih Jadwal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {schedule.map((day) => (
            <Card key={day.date} className="bg-[#1A2332] border-gray-800">
              <CardContent className="p-5">
                <p className="text-white font-medium mb-3 text-sm">
                  {day.label}
                </p>
                <div className="space-y-2">
                  {day.slots.map((slot) => {
                    const slotKey = `${day.date}-${slot.time}`;
                    return (
                      <Button
                        key={slotKey}
                        variant={
                          selectedSlot === slotKey ? "default" : "outline"
                        }
                        size="sm"
                        disabled={!slot.available || !mentor.available}
                        className={`w-full text-sm ${
                          selectedSlot === slotKey
                            ? "bg-[#D4A843] text-black hover:bg-[#C49A3B]"
                            : slot.available && mentor.available
                            ? "border-gray-700 text-gray-300 hover:border-[#D4A843]/50 hover:text-[#D4A843]"
                            : "border-gray-800 text-gray-600 cursor-not-allowed"
                        }`}
                        onClick={() => setSelectedSlot(slotKey)}
                      >
                        <Clock className="w-3 h-3 mr-1.5" />
                        {slot.time} WIB
                        {!slot.available && " (Penuh)"}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedSession && selectedSlot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4"
          >
            <Button className="w-full sm:w-auto bg-[#D4A843] hover:bg-[#C49A3B] text-black font-semibold py-6 text-base">
              Booking {selectedSession} — {selectedSlot.split("-").pop()} WIB
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#D4A843]" />
          Testimoni
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentor.testimonials.map((t, idx) => (
            <Card key={idx} className="bg-[#1A2332] border-gray-800">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A843] to-[#B8922F] flex items-center justify-center text-black text-xs font-bold">
                      {t.name[0]}
                    </div>
                    <span className="text-white font-medium text-sm">
                      {t.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{t.date}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? "text-[#D4A843] fill-[#D4A843]"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
