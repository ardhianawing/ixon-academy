"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Navbar } from "@/components/layout/Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0B1120]">
      {/* Subtle background mesh — desktop only */}
      <div className="pointer-events-none fixed inset-0 hidden md:block overflow-hidden z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#D4A843]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="relative flex flex-col flex-1 min-w-0 z-10">
        {/* Top Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 px-4 py-5 pb-28 md:pb-8 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto md:max-w-none">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
