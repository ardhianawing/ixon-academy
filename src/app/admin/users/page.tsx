"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  X,
  Shield,
  AlertTriangle,
  Ban,
  User,
  Loader2,
} from "lucide-react";
import { useAdminUsersData, type MockUser } from "@/hooks/useAdminUsersData";

const tierColors: Record<string, string> = {
  Free: "bg-gray-500/20 text-gray-300",
  Silver: "bg-slate-400/20 text-slate-300",
  Gold: "bg-[#D4A843]/20 text-[#D4A843]",
  Platinum: "bg-cyan-400/20 text-cyan-300",
};

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400",
  Warned: "bg-yellow-500/20 text-yellow-400",
  Banned: "bg-red-500/20 text-red-400",
};

const roleColors: Record<string, string> = {
  Player: "bg-blue-500/20 text-blue-400",
  Coach: "bg-purple-500/20 text-purple-400",
  Admin: "bg-[#D4A843]/20 text-[#D4A843]",
  Parent: "bg-teal-500/20 text-teal-400",
};

export default function UsersPage() {
  const { data, loading } = useAdminUsersData();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [gameFilter, setGameFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 text-[#D4A843] animate-spin" />
      </div>
    );
  }

  const filtered = data.users.filter((u) => {
    const matchSearch =
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.nickname.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === "All" || u.tier === tierFilter;
    const matchGame = gameFilter === "All" || u.game === gameFilter;
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchTier && matchGame && matchRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          User Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kelola semua pengguna platform
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari nama atau nickname..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#1A2332] border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#D4A843]"
          />
        </div>
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[#1A2332] border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4A843]"
        >
          <option value="All">All Tiers</option>
          <option value="Free">Free</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
        </select>
        <select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[#1A2332] border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4A843]"
        >
          <option value="All">All Games</option>
          <option value="Mobile Legends">Mobile Legends</option>
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[#1A2332] border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4A843]"
        >
          <option value="All">All Roles</option>
          <option value="Player">Player</option>
          <option value="Coach">Coach</option>
          <option value="Admin">Admin</option>
          <option value="Parent">Parent</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-[#1A2332] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-left">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Nickname</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">Game</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">Join Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="border-b border-border/50 hover:bg-white/5 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-[#D4A843]/20 flex items-center justify-center text-xs font-bold text-[#D4A843]">
                      {user.avatar}
                    </div>
                    <span className="text-foreground font-medium">{user.nama}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {user.nickname}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${tierColors[user.tier]}`}
                  >
                    {user.tier}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {user.game}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${roleColors[user.role]}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {user.joinDate}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A2332] border border-border rounded-2xl p-6 w-full max-w-md space-y-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-[#D4A843]/20 flex items-center justify-center text-lg font-bold text-[#D4A843]">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground">
                      {selectedUser.nama}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      @{selectedUser.nickname}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-[#0B1120] p-3">
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="text-foreground mt-0.5">{selectedUser.email}</p>
                </div>
                <div className="rounded-lg bg-[#0B1120] p-3">
                  <p className="text-muted-foreground text-xs">Tier</p>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold mt-0.5 ${tierColors[selectedUser.tier]}`}
                  >
                    {selectedUser.tier}
                  </span>
                </div>
                <div className="rounded-lg bg-[#0B1120] p-3">
                  <p className="text-muted-foreground text-xs">Total Matches</p>
                  <p className="text-foreground mt-0.5 font-semibold">
                    {selectedUser.totalMatches}
                  </p>
                </div>
                <div className="rounded-lg bg-[#0B1120] p-3">
                  <p className="text-muted-foreground text-xs">Win Rate</p>
                  <p className="text-foreground mt-0.5 font-semibold">
                    {selectedUser.winRate}
                  </p>
                </div>
                <div className="rounded-lg bg-[#0B1120] p-3">
                  <p className="text-muted-foreground text-xs">Role</p>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold mt-0.5 ${roleColors[selectedUser.role]}`}
                  >
                    {selectedUser.role}
                  </span>
                </div>
                <div className="rounded-lg bg-[#0B1120] p-3">
                  <p className="text-muted-foreground text-xs">Join Date</p>
                  <p className="text-foreground mt-0.5">
                    {selectedUser.joinDate}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#D4A843]/10 text-[#D4A843] text-sm font-medium hover:bg-[#D4A843]/20 transition-colors">
                  <Shield className="size-4" />
                  Change Tier
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-colors">
                  <AlertTriangle className="size-4" />
                  Warn
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors">
                  <Ban className="size-4" />
                  Ban
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
