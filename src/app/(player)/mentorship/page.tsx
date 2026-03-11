"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Search,
  Filter,
  Clock,
  Gamepad2,
  Swords,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mentors = [
  {
    id: "rrq-lemon",
    nickname: "RRQ Lemon",
    realName: "Muhammad Ikhsan",
    exTeam: "RRQ Hoshi",
    role: "Jungler",
    yearsExp: 5,
    rating: 4.8,
    totalReviews: 124,
    available: true,
    bio: "Legenda Jungler Indonesia. Spesialis rotasi dan timing objektif.",
    specializations: ["Jungling", "Rotasi Map", "Objektif"],
    initial: "RL",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "evos-wannn",
    nickname: "EVOS Wannn",
    realName: "Muhammad Ridwan",
    exTeam: "EVOS Legends",
    role: "Gold Laner",
    yearsExp: 4,
    rating: 4.6,
    totalReviews: 98,
    available: true,
    bio: "Gold Laner andalan EVOS. Ahli farming dan late game carry.",
    specializations: ["Gold Lane", "Farming", "Late Game"],
    initial: "EW",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "onic-sanz",
    nickname: "ONIC Sanz",
    realName: "Sanusi",
    exTeam: "ONIC Esports",
    role: "Mid Laner",
    yearsExp: 3,
    rating: 4.9,
    totalReviews: 156,
    available: false,
    bio: "Mid Laner terbaik Southeast Asia. Master of mage dan burst damage.",
    specializations: ["Mid Lane", "Mage", "Team Fight"],
    initial: "OS",
    color: "from-purple-500 to-pink-500",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MentorshipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [availFilter, setAvailFilter] = useState("all");

  const filteredMentors = mentors.filter((m) => {
    if (searchQuery && !m.nickname.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (roleFilter !== "all" && m.role !== roleFilter) return false;
    if (availFilter === "available" && !m.available) return false;
    if (availFilter === "booked" && m.available) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Mentor <span className="text-[#D4A843]">Directory</span>
        </h1>
        <p className="text-gray-400">
          Belajar langsung dari pro player dan coach berpengalaman
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari mentor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1A2332] border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <Select value={gameFilter} onValueChange={(v) => v && setGameFilter(v)}>
          <SelectTrigger className="w-full sm:w-[160px] bg-[#1A2332] border-gray-700 text-white">
            <Gamepad2 className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Game" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A2332] border-gray-700">
            <SelectItem value="all">Semua Game</SelectItem>
            <SelectItem value="mlbb">Mobile Legends</SelectItem>
            <SelectItem value="valorant">Valorant</SelectItem>
          </SelectContent>
        </Select>

        <Select value={roleFilter} onValueChange={(v) => v && setRoleFilter(v)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[#1A2332] border-gray-700 text-white">
            <Swords className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Spesialisasi" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A2332] border-gray-700">
            <SelectItem value="all">Semua Role</SelectItem>
            <SelectItem value="Jungler">Jungler</SelectItem>
            <SelectItem value="Gold Laner">Gold Laner</SelectItem>
            <SelectItem value="Mid Laner">Mid Laner</SelectItem>
            <SelectItem value="Roamer">Roamer</SelectItem>
            <SelectItem value="EXP Laner">EXP Laner</SelectItem>
          </SelectContent>
        </Select>

        <Select value={availFilter} onValueChange={(v) => v && setAvailFilter(v)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[#1A2332] border-gray-700 text-white">
            <Filter className="w-4 h-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A2332] border-gray-700">
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="booked">Fully Booked</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Mentor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor, i) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 * i }}
          >
            <Card className="bg-[#1A2332] border-gray-800 hover:border-[#D4A843]/50 transition-all duration-300 group overflow-hidden">
              <CardContent className="p-6 space-y-4">
                {/* Avatar + Info */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${mentor.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                    >
                      {mentor.initial}
                    </div>
                    {/* Availability dot */}
                    <span
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#1A2332] ${
                        mentor.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D4A843] transition-colors truncate">
                      {mentor.nickname}
                    </h3>
                    <p className="text-sm text-gray-400">ex-{mentor.exTeam}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="border-[#D4A843]/40 text-[#D4A843] text-xs"
                      >
                        {mentor.role}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {mentor.yearsExp} thn exp
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.floor(mentor.rating)
                            ? "text-[#D4A843] fill-[#D4A843]"
                            : idx < mentor.rating
                            ? "text-[#D4A843] fill-[#D4A843]/50"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {mentor.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({mentor.totalReviews} review)
                  </span>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-1.5">
                  {mentor.specializations.map((spec) => (
                    <Badge
                      key={spec}
                      className="bg-[#0B1120] text-gray-300 text-xs border-gray-700"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>

                {/* Availability + CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <span
                    className={`text-sm font-medium flex items-center gap-1.5 ${
                      mentor.available ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        mentor.available ? "bg-green-400" : "bg-red-400"
                      }`}
                    />
                    {mentor.available ? "Available" : "Fully Booked"}
                  </span>

                  <Link href={`/mentorship/${mentor.id}`}>
                    <Button
                      size="sm"
                      disabled={!mentor.available}
                      className={`${
                        mentor.available
                          ? "bg-[#D4A843] hover:bg-[#C49A3B] text-black font-semibold"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {mentor.available ? "Request Session" : "Fully Booked"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredMentors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            Tidak ada mentor yang sesuai filter. Coba ubah filter pencarian.
          </p>
        </motion.div>
      )}
    </div>
  );
}
