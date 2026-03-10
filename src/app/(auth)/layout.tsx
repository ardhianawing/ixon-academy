"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B1120] overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,168,67,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,67,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center"
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors">
              <Gamepad2 className="h-5 w-5 text-gold" />
            </div>
            <span className="text-xl font-bold font-heading text-foreground">
              IXON <span className="text-gold">Academy</span>
            </span>
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
