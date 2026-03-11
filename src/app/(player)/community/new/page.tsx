"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Lock, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Simulate current user tier
const CURRENT_USER_TIER: string = "SILVER";

const GAME_OPTIONS = [
  { value: "", label: "Tidak ada" },
  { value: "MLBB", label: "Mobile Legends: Bang Bang" },
  { value: "FF", label: "Free Fire" },
] as const;

const CATEGORY_OPTIONS = [
  { value: "discussion", label: "Diskusi" },
  { value: "question", label: "Pertanyaan" },
  { value: "highlight", label: "Highlight" },
  { value: "guide", label: "Guide" },
  { value: "mental", label: "Mental" },
  { value: "off-topic", label: "Off-Topic" },
] as const;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [game, setGame] = useState("");
  const [category, setCategory] = useState("discussion");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFreeUser = CURRENT_USER_TIER === "FREE";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    // Mock submit
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // In real app, redirect to the new post
  };

  if (isFreeUser) {
    return (
      <div className="space-y-6">
        <Link
          href="/community"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Komunitas
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-white/5 bg-[#1A2332]/80">
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                <Lock className="h-7 w-7 text-gold" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-heading font-bold text-foreground">
                  Fitur Khusus Member Silver+
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  Upgrade ke Silver untuk membuat post, berdiskusi, dan
                  berinteraksi dengan komunitas IXON Academy.
                </p>
              </div>
              <Button className="bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors">
                Upgrade ke Silver
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Komunitas
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-white/5 bg-[#1A2332]/80">
          <CardHeader>
            <CardTitle className="text-lg font-heading text-foreground">
              Buat Post Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">
                  Judul
                </Label>
                <Input
                  id="title"
                  placeholder="Tulis judul post..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                  required
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-foreground">
                  Konten
                </Label>
                <Textarea
                  id="content"
                  placeholder="Tulis konten post kamu di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] resize-y bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold/30"
                  required
                />
              </div>

              {/* Game & Category row */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Game */}
                <div className="space-y-2">
                  <Label htmlFor="game" className="text-foreground">
                    Game{" "}
                    <span className="text-muted-foreground font-normal">
                      (opsional)
                    </span>
                  </Label>
                  <select
                    id="game"
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/30"
                  >
                    {GAME_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-[#1A2332] text-foreground"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">
                    Kategori
                  </Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/30"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-[#1A2332] text-foreground"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="bg-gold text-[#0B1120] font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 border-2 border-[#0B1120]/30 border-t-[#0B1120] rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Publish Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
