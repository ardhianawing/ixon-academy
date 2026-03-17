"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Gift,
  Users,
  Share2,
  MessageCircle,
  Twitter,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useReferralData } from "@/hooks/useReferralData";

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ReferralPage() {
  const { data, loading } = useReferralData();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  const { referralCode, referralLink, referralList } = data;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareWA = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `Gabung IXON Academy bareng aku! Pakai kode referral ${referralCode} dan kita berdua dapat 1 minggu Silver gratis. ${referralLink}`
      )}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Yuk gabung IXON Academy! Pakai kode referral ${referralCode} dan kita berdua dapat 1 minggu Silver gratis 🎮 ${referralLink}`
      )}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Program Referral</h1>
        <p className="text-sm text-gray-400 mt-1">
          Ajak temanmu dan dapatkan reward bersama
        </p>
      </motion.div>

      {/* Referral Code Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-[#D4A843]/20 to-[#1A2332] border-[#D4A843]/30 p-6 text-center space-y-4">
          <Gift className="h-10 w-10 text-[#D4A843] mx-auto" />
          <p className="text-sm text-gray-400">Kode Referral Kamu</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl font-bold tracking-widest text-[#D4A843] font-mono">
              {referralCode}
            </span>
            <button
              onClick={copyCode}
              className="p-2 rounded-lg bg-[#D4A843]/20 hover:bg-[#D4A843]/30 transition-colors"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-400" />
              ) : (
                <Copy className="h-5 w-5 text-[#D4A843]" />
              )}
            </button>
          </div>
          {copied && (
            <p className="text-xs text-green-400">Kode berhasil disalin!</p>
          )}
        </Card>
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="bg-[#1A2332] border-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Share2 className="h-4 w-4 text-[#D4A843]" /> Bagikan Link Ini
          </h2>
          <div className="flex items-center gap-2 bg-[#0B1120] rounded-lg p-3 border border-white/5">
            <ExternalLink className="h-4 w-4 text-gray-400 shrink-0" />
            <span className="text-sm text-gray-300 truncate flex-1 font-mono">
              {referralLink}
            </span>
            <button
              onClick={copyLink}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
            >
              {linkCopied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={shareWA}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
            <Button
              onClick={shareTwitter}
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white gap-2"
            >
              <Twitter className="h-4 w-4" /> Twitter
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Reward Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-[#1A2332] border-white/5 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-white">Cara Kerjanya</h2>
          <div className="bg-[#D4A843]/10 rounded-lg p-4 border border-[#D4A843]/20">
            <p className="text-sm text-[#D4A843] font-medium">
              Ajak teman, kalian berdua dapat 1 minggu Silver gratis!
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Temanmu mendaftar menggunakan kode referral kamu, dan kalian berdua
              otomatis mendapat akses Silver selama 7 hari.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="bg-[#1A2332] border-white/5 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-[#D4A843]" />
            <div>
              <p className="text-2xl font-bold text-white">{referralList.length}</p>
              <p className="text-xs text-gray-400">
                teman sudah mendaftar via kode kamu
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Referral List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-[#1A2332] border-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Daftar Referral</h2>
          <div className="space-y-3">
            {referralList.map((ref) => (
              <div
                key={ref.nama}
                className="flex items-center justify-between bg-[#0B1120] rounded-lg p-3 border border-white/5"
              >
                <div>
                  <p className="text-sm font-medium text-white">{ref.nama}</p>
                  <p className="text-xs text-gray-500">{ref.tanggal}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    ref.status === "Aktif"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {ref.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
