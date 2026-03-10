"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Bell,
  Shield,
  User,
  Database,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Phone,
  Mail,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// ─── Toggle Switch Component ─────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
        checked ? "bg-[#D4A843]" : "bg-[#1A2332]"
      }`}
    >
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SettingsPage() {
  // Tampilan
  const [darkMode, setDarkMode] = useState(true);

  // Notifikasi
  const [notifReview, setNotifReview] = useState(true);
  const [notifReply, setNotifReply] = useState(true);
  const [notifMisi, setNotifMisi] = useState(true);
  const [notifEvent, setNotifEvent] = useState(false);
  const [notifMarketing, setNotifMarketing] = useState(false);

  // Privasi
  const [visibility, setVisibility] = useState("publik");
  const [showRealName, setShowRealName] = useState(false);

  // Akun
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [phone, setPhone] = useState("0812-3456-7890");
  const [email, setEmail] = useState("tensai@email.com");
  const [showPw, setShowPw] = useState(false);

  // Delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Pengaturan</h1>
        <p className="text-sm text-gray-400 mt-1">
          Kelola preferensi akun dan privasimu
        </p>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="tampilan">
        <TabsList className="bg-[#1A2332] border border-white/5 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="tampilan" className="gap-1.5 text-xs data-active:bg-[#D4A843]/20 data-active:text-[#D4A843]">
            <Sun className="h-3.5 w-3.5" /> Tampilan
          </TabsTrigger>
          <TabsTrigger value="notifikasi" className="gap-1.5 text-xs data-active:bg-[#D4A843]/20 data-active:text-[#D4A843]">
            <Bell className="h-3.5 w-3.5" /> Notifikasi
          </TabsTrigger>
          <TabsTrigger value="privasi" className="gap-1.5 text-xs data-active:bg-[#D4A843]/20 data-active:text-[#D4A843]">
            <Shield className="h-3.5 w-3.5" /> Privasi
          </TabsTrigger>
          <TabsTrigger value="akun" className="gap-1.5 text-xs data-active:bg-[#D4A843]/20 data-active:text-[#D4A843]">
            <User className="h-3.5 w-3.5" /> Akun
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-1.5 text-xs data-active:bg-[#D4A843]/20 data-active:text-[#D4A843]">
            <Database className="h-3.5 w-3.5" /> Data
          </TabsTrigger>
        </TabsList>

        {/* ─── Tampilan ──────────────────────────────────────────── */}
        <TabsContent value="tampilan">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-[#1A2332] border-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Mode Tampilan</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <Moon className="h-5 w-5 text-[#D4A843]" />
                  ) : (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">
                      {darkMode ? "Dark Mode" : "Light Mode"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {darkMode
                        ? "Tampilan gelap aktif"
                        : "Tampilan terang aktif"}
                    </p>
                  </div>
                </div>
                <Toggle checked={darkMode} onChange={setDarkMode} />
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ─── Notifikasi ────────────────────────────────────────── */}
        <TabsContent value="notifikasi">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-5">
              <h2 className="text-lg font-semibold text-white">Preferensi Notifikasi</h2>

              {[
                { label: "Review selesai", desc: "Notifikasi saat review gameplay kamu selesai", value: notifReview, set: setNotifReview },
                { label: "Reply baru", desc: "Notifikasi saat ada balasan di postinganmu", value: notifReply, set: setNotifReply },
                { label: "Misi harian", desc: "Pengingat misi harian yang belum dikerjakan", value: notifMisi, set: setNotifMisi },
                { label: "Event", desc: "Pemberitahuan event dan turnamen baru", value: notifEvent, set: setNotifEvent },
                { label: "Marketing", desc: "Promo, diskon, dan penawaran khusus", value: notifMarketing, set: setNotifMarketing },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <Toggle checked={item.value} onChange={item.set} />
                </div>
              ))}
            </Card>
          </motion.div>
        </TabsContent>

        {/* ─── Privasi ───────────────────────────────────────────── */}
        <TabsContent value="privasi">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Visibilitas Profil</h2>
                <RadioGroup value={visibility} onValueChange={setVisibility}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="publik" />
                    <Label className="text-sm text-white cursor-pointer">
                      Publik — semua orang bisa melihat profilmu
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="member" />
                    <Label className="text-sm text-white cursor-pointer">
                      Hanya Member — hanya pengguna terdaftar
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="border-t border-white/5 pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Tampilkan nama asli</p>
                    <p className="text-xs text-gray-400">
                      Jika dimatikan, hanya username yang ditampilkan
                    </p>
                  </div>
                  <Toggle checked={showRealName} onChange={setShowRealName} />
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ─── Akun ──────────────────────────────────────────────── */}
        <TabsContent value="akun">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Password */}
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#D4A843]" /> Ganti Password
              </h2>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-400">Password Saat Ini</Label>
                  <div className="relative">
                    <Input
                      type={showPw ? "text" : "password"}
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      className="bg-[#0B1120] border-white/10 text-white pr-10"
                      placeholder="Masukkan password saat ini"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Password Baru</Label>
                  <Input
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="bg-[#0B1120] border-white/10 text-white"
                    placeholder="Minimal 8 karakter"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Konfirmasi Password Baru</Label>
                  <Input
                    type="password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    className="bg-[#0B1120] border-white/10 text-white"
                    placeholder="Ulangi password baru"
                  />
                </div>
                <Button className="bg-[#D4A843] hover:bg-[#C49A3A] text-black font-medium">
                  Simpan Password
                </Button>
              </div>
            </Card>

            {/* Phone */}
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-3">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D4A843]" /> Nomor Telepon
              </h2>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-[#0B1120] border-white/10 text-white"
              />
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                Ubah Nomor
              </Button>
            </Card>

            {/* Email */}
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-3">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D4A843]" /> Email
              </h2>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0B1120] border-white/10 text-white"
              />
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                Ubah Email
              </Button>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ─── Data ──────────────────────────────────────────────── */}
        <TabsContent value="data">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Card className="bg-[#1A2332] border-white/5 p-6 space-y-3">
              <h2 className="text-lg font-semibold text-white">Download Data Saya</h2>
              <p className="text-sm text-gray-400">
                Unduh semua data yang kami simpan tentang akunmu dalam format JSON.
              </p>
              <Button className="bg-[#D4A843] hover:bg-[#C49A3A] text-black font-medium gap-2">
                <Download className="h-4 w-4" /> Download My Data
              </Button>
            </Card>

            <Card className="bg-[#1A2332] border-red-500/20 p-6 space-y-3">
              <h2 className="text-lg font-semibold text-red-400">Zona Berbahaya</h2>
              <p className="text-sm text-gray-400">
                Menghapus akun bersifat permanen. Semua data akan hilang dan tidak dapat dikembalikan.
              </p>

              <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogTrigger
                  render={
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 gap-2"
                    />
                  }
                >
                  <Trash2 className="h-4 w-4" /> Hapus Akun Saya
                </DialogTrigger>
                <DialogContent className="bg-[#1A2332] border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">
                      Konfirmasi Hapus Akun
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Tindakan ini tidak dapat dibatalkan. Semua data akan
                      dihapus permanen.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="bg-transparent border-none p-0 m-0 flex-row gap-2">
                    <DialogClose
                      render={
                        <Button variant="outline" className="border-white/10 text-white" />
                      }
                    >
                      Batal
                    </DialogClose>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Ya, Hapus Akun
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
