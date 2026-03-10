"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search, Bell, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Game = "MLBB" | "FF";

export function Navbar() {
  const [activeGame, setActiveGame] = useState<Game>("MLBB");
  const unreadCount = 3; // TODO: replace with real data

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left: Game Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
          <button
            onClick={() => setActiveGame("MLBB")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200",
              activeGame === "MLBB"
                ? "bg-[var(--color-mlbb)] text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "size-2 rounded-full",
                activeGame === "MLBB" ? "bg-white/80" : "bg-[var(--color-mlbb)]"
              )}
            />
            MLBB
          </button>
          <button
            onClick={() => setActiveGame("FF")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200",
              activeGame === "FF"
                ? "bg-[var(--color-freefire)] text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "size-2 rounded-full",
                activeGame === "FF" ? "bg-white/80" : "bg-[var(--color-freefire)]"
              )}
            />
            FF
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <Link
            href="/search"
            className="inline-flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Search className="size-[18px]" />
            <span className="sr-only">Search</span>
          </Link>

          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative inline-flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Bell className="size-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-destructive rounded-full">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring ml-1">
              <Avatar size="default">
                <AvatarImage src="" alt="User avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} side="bottom">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Player</p>
                <p className="text-xs text-muted-foreground">player@ixon.gg</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="flex items-center gap-2 w-full">
                  <User className="size-4" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center gap-2 w-full">
                  <Settings className="size-4" />
                  Pengaturan
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <button className="flex items-center gap-2 w-full">
                  <LogOut className="size-4" />
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
