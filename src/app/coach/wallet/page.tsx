"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Wallet,
  ArrowDownToLine,
  TrendingUp,
  CreditCard,
  Gift,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { useCoachWalletData } from "@/hooks/useCoachWalletData";

// ─── Config ──────────────────────────────────────────────────────────────────

const typeConfig = {
  review: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  bonus: { icon: Gift, color: "text-[#D4A843]", bg: "bg-[#D4A843]/10" },
  withdrawal: { icon: ArrowDownToLine, color: "text-red-400", bg: "bg-red-500/10" },
};

// ─── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function formatRupiah(n: number) {
  const abs = Math.abs(n);
  return (n < 0 ? "- " : "") + "Rp " + abs.toLocaleString("id-ID");
}

export default function CoachWalletPage() {
  const { data, loading } = useCoachWalletData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading font-bold text-2xl text-foreground flex items-center gap-2">
          <Wallet className="size-6 text-[#D4A843]" />
          Coach Wallet
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola pendapatan dan penarikan dana
        </p>
      </motion.div>

      {/* Balance Card */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-[#D4A843]/20 bg-gradient-to-br from-[#D4A843]/10 to-[#D4A843]/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
          <p className="font-heading font-bold text-4xl text-[#D4A843] mt-1">
            {formatRupiah(data.balance)}
          </p>
        </div>
        <button className="rounded-xl bg-[#D4A843] hover:bg-[#C49A3A] text-black font-semibold px-6 py-3 transition-colors flex items-center gap-2 shrink-0">
          <CreditCard className="size-4" />
          Request Withdrawal
        </button>
      </motion.section>

      {/* Monthly Earning Chart */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="size-5 text-emerald-400" />
            Pendapatan Bulanan
          </h2>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyEarnings}>
              <XAxis
                dataKey="month"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A2332",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                formatter={(value) => [formatRupiah(Number(value ?? 0)), "Pendapatan"]}
              />
              <Bar
                dataKey="earning"
                fill="#D4A843"
                radius={[6, 6, 0, 0]}
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Transaction History */}
      <motion.section
        variants={item}
        className="rounded-2xl border border-white/5 bg-card overflow-hidden"
      >
        <div className="p-5 border-b border-white/5">
          <h2 className="font-heading font-bold text-foreground">
            Riwayat Transaksi
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {data.transactions.map((tx) => {
            const cfg = typeConfig[tx.type];
            const TxIcon = cfg.icon;
            return (
              <div
                key={tx.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className={`size-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}
                >
                  <TxIcon className={`size-5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {tx.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <span
                  className={`text-sm font-bold shrink-0 ${
                    tx.amount < 0 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}
                  {formatRupiah(tx.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
}
