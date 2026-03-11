"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  Gamepad2,
  Shield,
  Swords,
  Target,
  Crown,
  X,
  Check,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ─── Constants ──────────────────────────────────────────────────────────────

const MLBB_RANKS = [
  "Warrior",
  "Elite",
  "Master",
  "Grandmaster",
  "Epic",
  "Legend",
  "Mythic",
  "Mythical Honor",
  "Mythical Glory",
  "Immortal",
];

const MLBB_ROLES = [
  { id: "gold", label: "Gold Laner", icon: Crown },
  { id: "exp", label: "EXP Laner", icon: Shield },
  { id: "mid", label: "Mid Laner", icon: Target },
  { id: "jungle", label: "Jungler", icon: Swords },
  { id: "roam", label: "Roamer", icon: Shield },
];

const MLBB_HEROES = [
  "Ling",
  "Fanny",
  "Chou",
  "Lancelot",
  "Gusion",
  "Hayabusa",
  "Kagura",
  "Esmeralda",
  "Wanwan",
  "Beatrix",
  "Benedetta",
  "Paquito",
  "Mathilda",
  "Yve",
  "Brody",
  "Barats",
  "Khaleed",
  "Yu Zhong",
  "Popol and Kupa",
  "Atlas",
  "Carmilla",
  "Cecilion",
  "Masha",
  "Silvanna",
  "Lylia",
  "Dyrroth",
  "Granger",
  "Guinevere",
  "Khufra",
  "Harith",
];

const TOTAL_STEPS = 4;

// ─── Step Transition Variants ───────────────────────────────────────────────

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

// ─── Main Component ─────────────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Step 1: Identity
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2: OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Step 3: Game Selection
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  // Step 4: Game Profile
  const [nickname, setNickname] = useState("");
  const [serverId, setServerId] = useState("");
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [heroPool, setHeroPool] = useState<string[]>([]);
  const [heroSearch, setHeroSearch] = useState("");
  const [showHeroDropdown, setShowHeroDropdown] = useState(false);

  // Step 1 validation
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});

  // ─── OTP Countdown ──────────────────────────────────────────────────────

  useEffect(() => {
    if (currentStep !== 2) return;
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, currentStep]);

  const handleResendOtp = () => {
    setCountdown(60);
    setCanResend(false);
    setOtpError("");
    setOtp(["", "", "", "", "", ""]);
  };

  // ─── Navigation ─────────────────────────────────────────────────────────

  const validateStep1 = useCallback(() => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Nama wajib diisi";
    if (!email.trim()) errors.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Format email tidak valid";
    if (!phone.trim()) errors.phone = "Nomor HP wajib diisi";
    else if (!/^08\d{8,12}$/.test(phone))
      errors.phone = "Format nomor HP tidak valid";
    if (!password) errors.password = "Password wajib diisi";
    else if (password.length < 8)
      errors.password = "Password minimal 8 karakter";
    if (password !== confirmPassword)
      errors.confirmPassword = "Password tidak sama";
    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  }, [name, email, phone, password, confirmPassword]);

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2) {
      const otpValue = otp.join("");
      if (otpValue !== "123456") {
        setOtpError("Kode OTP salah. Gunakan 123456 untuk demo.");
        return;
      }
    }
    if (currentStep === 3 && selectedGames.length === 0) return;
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    // Mock registration complete
    router.push("/login");
  };

  // ─── OTP Input Handler ─────────────────────────────────────────────────

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError("");

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
  };

  // ─── Game Selection Handler ─────────────────────────────────────────────

  const toggleGame = (game: string) => {
    setSelectedGames((prev) =>
      prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]
    );
  };

  // ─── Hero Pool Handler ──────────────────────────────────────────────────

  const toggleHero = (hero: string) => {
    setHeroPool((prev) => {
      if (prev.includes(hero)) return prev.filter((h) => h !== hero);
      if (prev.length >= 5) return prev;
      return [...prev, hero];
    });
    setHeroSearch("");
  };

  const filteredHeroes = MLBB_HEROES.filter(
    (h) =>
      h.toLowerCase().includes(heroSearch.toLowerCase()) &&
      !heroPool.includes(h)
  );

  // ─── Progress ───────────────────────────────────────────────────────────

  const progressPercent = (currentStep / TOTAL_STEPS) * 100;

  const stepLabels = ["Identitas", "Verifikasi", "Pilih Game", "Profil Game"];

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <Card className="border-white/5 bg-[#1A2332]/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-heading text-foreground">
          Buat Akun Baru
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Step {currentStep} dari {TOTAL_STEPS} &mdash; {stepLabels[currentStep - 1]}
        </CardDescription>

        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            {stepLabels.map((label, i) => (
              <span
                key={label}
                className={`text-xs transition-colors ${
                  i + 1 <= currentStep
                    ? "text-gold font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" as const }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="relative overflow-hidden min-h-[320px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {/* ─── Step 1: Identity ──────────────────────────────── */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="rounded-lg bg-gold/5 border border-gold/10 p-3">
                  <p className="text-xs text-gold/80 leading-relaxed">
                    Identitas asli diperlukan karena setiap data pemain dapat
                    menjadi bagian dari proses scouting dan trial profesional.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-foreground">
                    Nama Asli
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Nama lengkap kamu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-10 pl-9 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                  </div>
                  {step1Errors.name && (
                    <p className="text-xs text-destructive">{step1Errors.name}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 pl-9 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                  </div>
                  {step1Errors.email && (
                    <p className="text-xs text-destructive">
                      {step1Errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="reg-phone" className="text-foreground">
                    Nomor HP
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-10 pl-9 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                  </div>
                  {step1Errors.phone && (
                    <p className="text-xs text-destructive">
                      {step1Errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="reg-password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 pl-9 pr-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {step1Errors.password && (
                    <p className="text-xs text-destructive">
                      {step1Errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password" className="text-foreground">
                    Konfirmasi Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-10 pl-9 pr-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {step1Errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {step1Errors.confirmPassword}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ─── Step 2: OTP Verification ──────────────────────── */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 border border-gold/20">
                    <Phone className="h-6 w-6 text-gold" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Kode verifikasi telah dikirim ke
                  </p>
                  <p className="font-medium text-foreground">{phone}</p>
                </div>

                <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="h-12 w-10 rounded-lg border border-white/10 bg-white/5 text-center text-lg font-mono font-bold text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  ))}
                </div>

                {otpError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-destructive"
                  >
                    {otpError}
                  </motion.p>
                )}

                <div className="text-center">
                  {canResend ? (
                    <button
                      onClick={handleResendOtp}
                      className="text-sm font-medium text-gold hover:text-gold-light transition-colors"
                    >
                      Kirim Ulang
                    </button>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Kirim ulang dalam{" "}
                      <span className="font-mono text-gold">{countdown}s</span>
                    </p>
                  )}
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  Demo: gunakan kode <span className="font-mono text-gold">123456</span>
                </p>
              </motion.div>
            )}

            {/* ─── Step 3: Game Selection ─────────────────────────── */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-center text-sm text-muted-foreground">
                  Pilih game yang kamu mainkan
                </p>

                <div className="grid gap-3">
                  {/* MLBB */}
                  <button
                    type="button"
                    onClick={() => toggleGame("MLBB")}
                    className={`group relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      selectedGames.includes("MLBB")
                        ? "border-mlbb bg-mlbb/10 ring-1 ring-mlbb/30"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                        selectedGames.includes("MLBB")
                          ? "bg-mlbb/20"
                          : "bg-white/5"
                      }`}
                    >
                      <Gamepad2
                        className={`h-6 w-6 ${
                          selectedGames.includes("MLBB")
                            ? "text-mlbb"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        Mobile Legends: Bang Bang
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MOBA 5v5 paling populer di Indonesia
                      </p>
                    </div>
                    {selectedGames.includes("MLBB") && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-mlbb">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                  </button>

                  {/* Free Fire */}
                  <button
                    type="button"
                    onClick={() => toggleGame("FF")}
                    className={`group relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      selectedGames.includes("FF")
                        ? "border-freefire bg-freefire/10 ring-1 ring-freefire/30"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                        selectedGames.includes("FF")
                          ? "bg-freefire/20"
                          : "bg-white/5"
                      }`}
                    >
                      <Target
                        className={`h-6 w-6 ${
                          selectedGames.includes("FF")
                            ? "text-freefire"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Free Fire</p>
                      <p className="text-xs text-muted-foreground">
                        Battle Royale mobile terpopuler
                      </p>
                    </div>
                    {selectedGames.includes("FF") && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-freefire">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                  </button>

                  {/* Keduanya */}
                  <button
                    type="button"
                    onClick={() => setSelectedGames(["MLBB", "FF"])}
                    className={`group relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      selectedGames.length === 2
                        ? "border-gold bg-gold/10 ring-1 ring-gold/30"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                        selectedGames.length === 2
                          ? "bg-gold/20"
                          : "bg-white/5"
                      }`}
                    >
                      <Swords
                        className={`h-6 w-6 ${
                          selectedGames.length === 2
                            ? "text-gold"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Keduanya</p>
                      <p className="text-xs text-muted-foreground">
                        Main MLBB dan Free Fire
                      </p>
                    </div>
                    {selectedGames.length === 2 && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold">
                        <Check className="h-3.5 w-3.5 text-[#0B1120]" />
                      </div>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── Step 4: Game Profile ───────────────────────────── */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="nickname" className="text-foreground">
                    Nickname In-Game
                  </Label>
                  <Input
                    id="nickname"
                    placeholder="Nickname kamu di game"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="h-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="serverId" className="text-foreground">
                    Server ID
                  </Label>
                  <Input
                    id="serverId"
                    placeholder="Contoh: 12345678 (9527)"
                    value={serverId}
                    onChange={(e) => setServerId(e.target.value)}
                    className="h-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-foreground">Rank</Label>
                  <div className="relative">
                    <select
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 pr-8 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
                    >
                      <option value="" className="bg-[#1A2332]">
                        Pilih rank kamu
                      </option>
                      {MLBB_RANKS.map((r) => (
                        <option key={r} value={r} className="bg-[#1A2332]">
                          {r}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-foreground">Role</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {MLBB_ROLES.map((r) => {
                      const Icon = r.icon;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-sm transition-all ${
                            role === r.id
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="truncate">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-foreground">
                    Hero Pool{" "}
                    <span className="text-muted-foreground font-normal">
                      ({heroPool.length}/5)
                    </span>
                  </Label>

                  {/* Selected heroes */}
                  {heroPool.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {heroPool.map((hero) => (
                        <span
                          key={hero}
                          className="inline-flex items-center gap-1 rounded-md bg-gold/10 border border-gold/20 px-2 py-0.5 text-xs font-medium text-gold"
                        >
                          {hero}
                          <button
                            type="button"
                            onClick={() => toggleHero(hero)}
                            className="hover:text-gold-light"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Hero search */}
                  <div className="relative">
                    <Input
                      placeholder={
                        heroPool.length >= 5
                          ? "Maksimum 5 hero"
                          : "Cari hero..."
                      }
                      value={heroSearch}
                      onChange={(e) => {
                        setHeroSearch(e.target.value);
                        setShowHeroDropdown(true);
                      }}
                      onFocus={() => setShowHeroDropdown(true)}
                      disabled={heroPool.length >= 5}
                      className="h-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                    {showHeroDropdown && heroSearch && filteredHeroes.length > 0 && (
                      <div className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-lg border border-white/10 bg-[#1A2332] py-1 shadow-lg">
                        {filteredHeroes.slice(0, 8).map((hero) => (
                          <button
                            key={hero}
                            type="button"
                            onClick={() => {
                              toggleHero(hero);
                              setShowHeroDropdown(false);
                            }}
                            className="flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-white/5 transition-colors"
                          >
                            {hero}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Navigation Buttons ──────────────────────────────────── */}
        <div className="mt-6 flex items-center gap-3">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="h-10 border-white/10 bg-white/5 text-foreground hover:bg-white/10"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Kembali
            </Button>
          )}

          <div className="flex-1" />

          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={currentStep === 3 && selectedGames.length === 0}
              className="h-10 bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              Lanjut
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleComplete}
              className="h-10 bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors"
            >
              Selesai & Masuk
              <Check className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>

        {currentStep === 1 && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-gold hover:text-gold-light transition-colors"
            >
              Masuk
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
