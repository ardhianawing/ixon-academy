"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TeamEntry {
  rank?: number;
  name: string;
  members: string[];
  kda?: string;
  score?: number;
}

export interface EventDetail {
  id: string;
  title: string;
  status: "upcoming" | "completed";
  date: string;
  format: string;
  game: string;
  minTier: string;
  slots: string;
  slotsTotal: number;
  slotsFilled: number;
  description: string[];
  prizes: string[];
  teams: TeamEntry[];
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_EVENT_DETAIL: EventDetail = {
  id: "weekly-scrim-12",
  title: "IXON Weekly Scrim #12",
  status: "upcoming",
  date: "15 Mar 2026",
  format: "5v5",
  game: "MLBB",
  minTier: "SILVER",
  slots: "24/32 slot",
  slotsTotal: 32,
  slotsFilled: 24,
  description: [
    "IXON Weekly Scrim #12 adalah sesi latih tanding mingguan yang dirancang khusus untuk pemain aktif IXON Academy. Scrim ini bertujuan untuk meningkatkan koordinasi tim, strategi drafting, dan komunikasi in-game dalam format pertandingan 5v5 yang kompetitif.",
    "Setiap tim wajib memiliki minimal 5 pemain terdaftar sebagai anggota aktif IXON Academy dengan tier Silver atau lebih tinggi. Pertandingan akan menggunakan format Best-of-1 (BO1) pada fase grup, dan Best-of-3 (BO3) pada fase semifinal dan final. Draft pick menggunakan mode Tournament Draft.",
    "Peserta diharapkan hadir tepat waktu sesuai jadwal yang telah ditentukan. Keterlambatan lebih dari 10 menit akan mengakibatkan diskualifikasi otomatis. Admin berhak memutuskan hasil pertandingan apabila terjadi masalah teknis atau pelanggaran aturan.",
  ],
  prizes: [
    "Juara 1: Voucher MLBB 500 Diamond + 1 bulan Gold",
    "Juara 2: Voucher MLBB 250 Diamond",
    "Juara 3: Voucher MLBB 100 Diamond",
    "MVP: Badge eksklusif + 500 XP bonus",
  ],
  teams: [
    { name: "Phoenix Rising", members: ["PhoenixBlade", "TENSAI", "IXONReaper", "ShadowFF", "AceHunter"] },
    { name: "Storm Breakers", members: ["StormX", "BlitzKing", "RapidFire", "ThunderBolt", "FlashPoint"] },
    { name: "Night Wolves", members: ["NightHowl", "WolfFang", "MoonSlash", "DarkClaw", "SilverBite"] },
    { name: "Dragon Slayers", members: ["DragonX", "SlayerOne", "FireBreath", "ScaleMaster", "TailWhip"] },
    { name: "Cyber Knights", members: ["CyberK", "KnightFall", "ShieldWall", "LanceLot", "ArmorUp"] },
    { name: "Venom Squad", members: ["VenomX", "PoisonDart", "ToxicBlade", "AcidRain", "SnakeBite"] },
    { name: "Iron Fist", members: ["IronMan", "FistFury", "SteelGrip", "MetalCore", "HammerDown"] },
    { name: "Shadow Legion", members: ["ShadowOne", "LegionX", "DarkArmy", "NightBlade", "GhostStep"] },
  ],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useEventDetailData(eventId: string) {
  return useData<EventDetail>({
    mockData: MOCK_EVENT_DETAIL,
    apiUrl: `/api/events/${eventId}`,
  });
}
