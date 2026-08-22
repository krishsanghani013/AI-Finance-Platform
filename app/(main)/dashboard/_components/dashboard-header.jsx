"use client";

import React from "react";
import Link from "next/link";
import { Plus, PenBox, Bell, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateAccountDrawer } from "@/components/create-account-drawer";

export function DashboardHeader({ userName = "there" }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const currentDateFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 capitalize">{userName}</span>
            <span className="inline-block animate-wave text-2xl">👋</span>
          </h1>
        </div>
        <p className="text-sm text-slate-400 flex items-center gap-2">
          <span>Here's your financial overview & cash insights</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-orange-400/90 font-medium bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
            <Sparkles className="h-3 w-3" /> Live Analytics
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-[#12151F] border border-white/[0.08] px-3 py-2 rounded-xl">
          <Calendar className="h-3.5 w-3.5 text-orange-400" />
          <span>{currentDateFormatted}</span>
        </div>

        <CreateAccountDrawer>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-[#12151F] text-slate-200 hover:bg-white/[0.06] hover:text-white hover:border-orange-500/40 rounded-xl h-9 text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5 text-orange-400" />
            <span>New Account</span>
          </Button>
        </CreateAccountDrawer>

        <Link href="/transaction/create">
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-lg shadow-orange-950/40 border-0 rounded-xl h-9 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <PenBox className="h-3.5 w-3.5 mr-1.5" />
            <span>Add Transaction</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;
