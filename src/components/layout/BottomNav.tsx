"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home, BookOpen, MessageCircle, ClipboardList, User,
  ListChecks, Wallet, BarChart2, Trophy, Users, ShieldCheck, Search,
} from "lucide-react";

const playerNav = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Academy", href: "/academy", icon: BookOpen },
  { label: "Forum", href: "/community", icon: MessageCircle },
  { label: "Review", href: "/evaluation/history", icon: ClipboardList },
  { label: "Profil", href: "/profile", icon: User },
];

const coachNav = [
  { label: "Queue", href: "/coach/queue", icon: ListChecks },
  { label: "Wallet", href: "/coach/wallet", icon: Wallet },
  { label: "Performa", href: "/coach/performance", icon: BarChart2 },
  { label: "Profil", href: "/profile", icon: User },
];

const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Home },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Moderasi", href: "/admin/moderation", icon: ShieldCheck },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
];

const parentNav = [
  { label: "Home", href: "/parent/dashboard", icon: Home },
  { label: "Profil", href: "/profile", icon: User },
];

const scoutNav = [
  { label: "Talents", href: "/scouting/talent-board", icon: Search },
  { label: "Events", href: "/events", icon: Trophy },
  { label: "Profil", href: "/profile", icon: User },
];

const navByRole: Record<string, typeof playerNav> = {
  PLAYER: playerNav,
  COACH: coachNav,
  ADMIN: adminNav,
  PARENT: parentNav,
  SCOUTING: scoutNav,
};

export function BottomNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role ?? "PLAYER";
  const navItems = navByRole[role] ?? playerNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/30 to-transparent" />
      <div className="bg-[#0B1120]/85 backdrop-blur-2xl border-t border-white/[0.08] px-2 pb-5 pt-2">
        <div className="flex items-end justify-around">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                item.href !== "/parent/dashboard" &&
                item.href !== "/admin/dashboard" &&
                item.href !== "/coach/queue" &&
                item.href !== "/scouting/talent-board" &&
                pathname.startsWith(item.href));
            const isExactActive = pathname === item.href;
            const active = isActive || isExactActive;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center gap-1 flex-1"
              >
                <div className="relative flex flex-col items-center">
                  {active && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute -inset-2 rounded-2xl bg-[#D4A843]/10 blur-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}

                  <div className={cn(
                    "relative flex items-center justify-center w-12 h-10 rounded-2xl transition-all duration-300",
                    active ? "bg-[#D4A843]/15" : "bg-transparent"
                  )}>
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-2xl bg-[#D4A843]/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "relative z-10 size-5 transition-all duration-300",
                        active ? "text-[#D4A843]" : "text-white/40"
                      )}
                      strokeWidth={active ? 2.2 : 1.8}
                    />
                  </div>

                  <span className={cn(
                    "text-[10px] font-medium transition-all duration-300 mt-0.5",
                    active ? "text-[#D4A843] font-bold" : "text-white/40"
                  )}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
