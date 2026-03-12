"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SplashPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleEnter = () => {
    // Buat Audio object langsung di click handler — paling reliable di iOS/Android
    const audio = new Audio("/bumper-sound.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
    audioRef.current = audio;
    setEntered(true);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="relative min-h-screen bg-[#0B1120] flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,168,67,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(212,168,67,0.12),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.08),transparent_70%)]" />

      <AnimatePresence mode="wait">
        {!entered ? (
          /* ── TAP TO ENTER ── */
          <motion.div
            key="enter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-10 px-4 text-center"
          >
            {/* Logo */}
            <div className="relative size-48 sm:size-64">
              <Image
                src="/ixon-logo.png"
                alt="IXON Academy"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(212,168,67,0.35)]"
                priority
              />
            </div>

            {/* Pulse button */}
            <button
              onClick={handleEnter}
              className="group relative flex flex-col items-center gap-3"
            >
              {/* Ripple rings */}
              <span className="absolute size-24 rounded-full border border-[#D4A843]/30 animate-ping" />
              <span className="absolute size-20 rounded-full border border-[#D4A843]/20 animate-ping [animation-delay:0.3s]" />

              <div className="relative flex size-16 items-center justify-center rounded-full bg-[#D4A843] shadow-[0_0_30px_rgba(212,168,67,0.5)] transition-transform group-hover:scale-105 group-active:scale-95">
                <PlayCircle className="size-8 text-[#0B1120]" />
              </div>
              <span className="text-sm font-semibold tracking-widest text-[#D4A843] uppercase">
                Tap to Enter
              </span>
            </button>
          </motion.div>
        ) : (
          /* ── SPLASH CONTENT ── */
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 text-center"
          >
            {/* Mute toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={toggleMute}
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#94A3B8] backdrop-blur transition-colors hover:border-[#D4A843]/40 hover:text-[#D4A843]"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative size-48 sm:size-64 md:size-72">
                <Image
                  src="/ixon-logo.png"
                  alt="IXON Academy"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(212,168,67,0.4)]"
                  priority
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#F1F5F9] sm:text-4xl md:text-5xl">
                Dari <span className="text-[#D4A843]">Gamer</span> Menjadi{" "}
                <span className="text-[#D4A843]">Profesional</span>
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                Platform pembinaan esports profesional pertama di Indonesia.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex h-12 items-center gap-2 rounded-full bg-[#D4A843] px-8 text-base font-semibold text-[#0B1120] shadow-[0_0_20px_rgba(212,168,67,0.35)] transition-colors hover:bg-[#F0DCA0]"
                >
                  Mulai Gratis
                  <ArrowRight className="size-5" />
                </motion.button>
              </Link>

              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex h-12 items-center gap-2 rounded-full border border-[#D4A843]/40 px-8 text-base font-semibold text-[#D4A843] transition-colors hover:bg-[#D4A843]/10"
                >
                  <PlayCircle className="size-5" />
                  Lihat Demo
                </motion.button>
              </Link>
            </motion.div>

            {/* Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xs text-[#475569]"
            >
              Didukung oleh <span className="text-[#D4A843]">IXON Esport</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
