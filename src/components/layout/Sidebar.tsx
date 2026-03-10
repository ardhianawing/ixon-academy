"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  BookOpen,
  MessageCircle,
  ClipboardList,
  Trophy,
  Search,
  Target,
  Brain,
  Handshake,
  Briefcase,
  User,
  Star,
  Gift,
  ShoppingCart,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Academy", href: "/academy", icon: BookOpen },
  { label: "Komunitas", href: "/community", icon: MessageCircle },
  { label: "Evaluasi", href: "/evaluation/history", icon: ClipboardList },
  { label: "Events", href: "/events", icon: Trophy },
  { label: "Leaderboard", href: "/leaderboard", icon: Search },
  { label: "Misi Harian", href: "/missions", icon: Target },
  { label: "Mental & Wellness", href: "/mental", icon: Brain },
  { label: "Mentorship", href: "/mentorship", icon: Handshake },
  { label: "Jalur Karir", href: "/career", icon: Briefcase },
  { label: "Profil", href: "/profile", icon: User },
  { label: "Membership", href: "/membership", icon: Star },
  { label: "Referral", href: "/referral", icon: Gift },
  { label: "Marketplace", href: "/marketplace", icon: ShoppingCart },
  { label: "Pengaturan", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen sticky top-0 border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          collapsed ? "w-[68px]" : "w-[260px]"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm shrink-0">
              IX
            </div>
            {!collapsed && (
              <span className="font-heading font-bold text-base text-foreground whitespace-nowrap">
                IXON Academy
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-sidebar-accent text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon
                  className={cn(
                    "size-[18px] shrink-0",
                    isActive && "text-primary"
                  )}
                />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger className="relative w-full">
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <div key={item.href} className="relative">
                {linkContent}
              </div>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-border p-2 shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            {collapsed ? (
              <PanelLeftOpen className="size-[18px]" />
            ) : (
              <>
                <PanelLeftClose className="size-[18px]" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
