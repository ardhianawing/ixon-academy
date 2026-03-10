"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Lock, Eye, EyeOff, LogIn } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        phone,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Nomor HP atau password salah.");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-white/5 bg-[#1A2332]/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-heading text-foreground">
          Selamat Datang Kembali
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Masuk ke akun IXON Academy kamu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">
              Nomor HP
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 pl-9 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 pl-9 pr-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                required
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
          </div>

          <div className="flex justify-end">
            <Link
              href="/login"
              className="text-sm text-gold hover:text-gold-light transition-colors"
            >
              Lupa Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 w-full bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 border-2 border-[#0B1120]/30 border-t-[#0B1120] rounded-full"
              />
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Masuk
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-medium text-gold hover:text-gold-light transition-colors"
            >
              Daftar
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
