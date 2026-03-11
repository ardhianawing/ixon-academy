"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Bell, LogOut, Settings, User, ChevronRight, Shield, UserCog, Search, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const roleLabel: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PLAYER: { label: "Player", color: "text-[#D4A843]", icon: User },
  COACH: { label: "Coach", color: "text-emerald-400", icon: Shield },
  ADMIN: { label: "Admin", color: "text-purple-400", icon: UserCog },
  PARENT: { label: "Parent", color: "text-orange-400", icon: Users },
  SCOUTING: { label: "Scout", color: "text-cyan-400", icon: Search },
};

const roleHome: Record<string, string> = {
  PLAYER: "/dashboard",
  COACH: "/coach/queue",
  ADMIN: "/admin/dashboard",
  PARENT: "/parent/dashboard",
  SCOUTING: "/scouting/talent-board",
};

export function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const unreadCount = 3;

  const user = session?.user;
  const role = user?.role ?? "PLAYER";
  const name = user?.name ?? "IXON User";
  const tier = user?.tier ?? "FREE";
  const initial = name.charAt(0).toUpperCase();
  const roleInfo = roleLabel[role] ?? roleLabel.PLAYER;

  const tierColor: Record<string, string> = {
    FREE: "text-slate-400",
    SILVER: "text-slate-300",
    GOLD: "text-[#D4A843]",
    PLATINUM: "text-purple-400",
  };

  return (
    <header className="sticky top-0 z-40 h-14 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="flex items-center justify-between h-full px-4 md:px-6">

        {/* Left: Logo */}
        <Link href={roleHome[role]} className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-8 rounded-xl bg-gradient-to-br from-[#D4A843] to-[#A07D2E] shadow-[0_0_12px_rgba(212,168,67,0.4)]">
            <span className="font-heading font-black text-[13px] text-[#0B1120]">IX</span>
          </div>
          <span className="font-heading font-bold text-[15px] text-foreground hidden sm:block">
            IXON <span className="text-[#D4A843]">Academy</span>
          </span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">

          {/* Notification Bell */}
          <button className="relative inline-flex items-center justify-center size-9 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <Bell className="size-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A843] opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-[#D4A843]" />
              </span>
            )}
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="relative">
                <Avatar className="size-8 ring-2 ring-[#D4A843]/60 ring-offset-1 ring-offset-[#0B1120]">
                  <AvatarFallback className="bg-gradient-to-br from-[#D4A843] to-[#A07D2E] text-[#0B1120] font-bold text-xs">
                    {initial}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 border-2 border-[#0B1120]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10} className="w-52 bg-[#1A2332] border-white/10">
              <div className="px-3 py-2.5 border-b border-white/5 mb-1">
                <p className="text-sm font-bold text-white">{name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <roleInfo.icon className={`size-3 ${roleInfo.color}`} />
                  <p className={`text-xs font-medium ${roleInfo.color}`}>{roleInfo.label}</p>
                  {role === "PLAYER" && (
                    <>
                      <span className="text-white/20">·</span>
                      <p className={`text-xs font-medium ${tierColor[tier]}`}>{tier}</p>
                    </>
                  )}
                </div>
              </div>
              <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                <User className="size-4 text-white/50" />
                <span>Profil Saya</span>
                <ChevronRight className="size-3 ml-auto text-white/30" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
                <Settings className="size-4 text-white/50" />
                <span>Pengaturan</span>
                <ChevronRight className="size-3 ml-auto text-white/30" />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem
                className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
