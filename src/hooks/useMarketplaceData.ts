"use client";

import { useData } from "./useData";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProductCategory = "voucher" | "merchandise" | "coaching";

export interface Product {
  id: string;
  emoji: string;
  title: string;
  price: number;
  category: ProductCategory;
  description: string;
}

// ─── Mock Data (preserved from prototype) ────────────────────────────────────

const MOCK_PRODUCTS: Product[] = [
  {
    id: "v1",
    emoji: "\ud83c\udfae",
    title: "Voucher MLBB 100 Diamond",
    price: 25000,
    category: "voucher",
    description: "Top up 100 diamond langsung ke akun MLBB kamu",
  },
  {
    id: "v2",
    emoji: "\ud83c\udfae",
    title: "Voucher MLBB 500 Diamond",
    price: 115000,
    category: "voucher",
    description: "Top up 500 diamond langsung ke akun MLBB kamu",
  },
  {
    id: "m1",
    emoji: "\ud83d\udc55",
    title: "Jersey IXON Esport 2026",
    price: 250000,
    category: "merchandise",
    description: "Jersey eksklusif IXON edisi 2026 \u2014 breathable fabric",
  },
  {
    id: "c1",
    emoji: "\ud83c\udfa7",
    title: "Coaching 1-on-1 (30 min)",
    price: 150000,
    category: "coaching",
    description: "Sesi coaching privat bersama coach profesional",
  },
];

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMarketplaceData() {
  return useData<Product[]>({
    mockData: MOCK_PRODUCTS,
    apiUrl: "/api/marketplace",
  });
}
