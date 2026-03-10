"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Filter,
  Gamepad2,
  Shirt,
  Headphones,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ─── Mock Data ───────────────────────────────────────────────────────────────

type ProductCategory = "voucher" | "merchandise" | "coaching";

interface Product {
  id: string;
  emoji: string;
  title: string;
  price: number;
  category: ProductCategory;
  description: string;
}

const products: Product[] = [
  {
    id: "v1",
    emoji: "🎮",
    title: "Voucher MLBB 100 Diamond",
    price: 25000,
    category: "voucher",
    description: "Top up 100 diamond langsung ke akun MLBB kamu",
  },
  {
    id: "v2",
    emoji: "🎮",
    title: "Voucher MLBB 500 Diamond",
    price: 115000,
    category: "voucher",
    description: "Top up 500 diamond langsung ke akun MLBB kamu",
  },
  {
    id: "m1",
    emoji: "👕",
    title: "Jersey IXON Esport 2026",
    price: 250000,
    category: "merchandise",
    description: "Jersey eksklusif IXON edisi 2026 — breathable fabric",
  },
  {
    id: "c1",
    emoji: "🎧",
    title: "Coaching 1-on-1 (30 min)",
    price: 150000,
    category: "coaching",
    description: "Sesi coaching privat bersama coach profesional",
  },
];

const FILTERS = [
  { key: "semua", label: "Semua", icon: Tag },
  { key: "voucher", label: "Voucher", icon: Gamepad2 },
  { key: "merchandise", label: "Merchandise", icon: Shirt },
  { key: "coaching", label: "Coaching", icon: Headphones },
] as const;

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState<string>("semua");

  const filtered =
    activeFilter === "semua"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-[#D4A843]" /> Marketplace
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Voucher, merchandise, dan layanan coaching
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          return (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === f.key
                  ? "bg-[#D4A843] text-black"
                  : "bg-[#1A2332] text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {f.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="bg-[#1A2332] border-white/5 overflow-hidden hover:border-[#D4A843]/30 transition-colors">
              {/* Image Placeholder */}
              <div className="h-36 bg-gradient-to-br from-[#0B1120] to-[#1A2332] flex items-center justify-center border-b border-white/5">
                <span className="text-5xl">{product.emoji}</span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#D4A843]">
                    {formatRupiah(product.price)}
                  </span>
                  <Button
                    size="sm"
                    className="bg-[#D4A843] hover:bg-[#C49A3A] text-black font-medium gap-1.5"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" /> Beli
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="bg-[#1A2332] border-white/5 p-8 text-center">
          <Filter className="h-10 w-10 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">
            Tidak ada produk di kategori ini
          </p>
        </Card>
      )}
    </div>
  );
}
