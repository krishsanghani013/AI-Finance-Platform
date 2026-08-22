"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Zap,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  PieChart,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-12 sm:pt-20 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto max-w-6xl text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 mb-8 shadow-inner hover:border-orange-500/30 transition-all cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-orange-400 font-semibold">Flowoid</span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Sparkles className="h-3 w-3 text-amber-400" />
            AI-Driven Wealth & Expense Intelligence
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          Money can be complicated. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-amber-500">
            Managing it doesn&apos;t have to be.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
          Flowoid helps you keep up with your expenses, budgets, and everyday spending—so you always know how you&apos;re doing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16 sm:mb-20">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 h-12 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-xl shadow-orange-500/25 border-0 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <a href="#features" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-7 h-12 border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.08] hover:text-white hover:border-orange-500/40 rounded-xl transition-all cursor-pointer text-sm sm:text-base"
            >
              Explore Features
            </Button>
          </a>
        </div>

        {/* Realistic Interactive Financial Dashboard Mockup */}
        <div className="relative mx-auto max-w-5xl">
          {/* Ambient Glow Rim behind mockup */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-emerald-500/10 blur-xl opacity-75 -z-10" />

          {/* Main Card Frame */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#0F121B]/95 border border-white/[0.12] p-3 sm:p-6 shadow-2xl backdrop-blur-2xl text-left overflow-hidden">
            {/* Top Mock Window Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 sm:mb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-medium text-slate-400 hidden sm:inline">
                  app.flowoid.ai/dashboard
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-mono text-[11px]">LIVE SYNC</span>
              </div>
            </div>

            {/* Mock Dashboard Top KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
              {/* Total Balance */}
              <div className="p-4 rounded-xl bg-[#141824] border border-white/[0.06] relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Total Balance</span>
                  <Wallet className="h-4 w-4 text-orange-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">$24,680.42</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-medium">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.4% vs last month</span>
                </div>
              </div>

              {/* Income (Green) */}
              <div className="p-4 rounded-xl bg-[#141824] border border-white/[0.06] relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Monthly Income</span>
                  <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">$8,420.00</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-medium">
                  <span>↑ +8.2% earned</span>
                </div>
              </div>

              {/* Expenses (Red) */}
              <div className="p-4 rounded-xl bg-[#141824] border border-white/[0.06] relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Monthly Expenses</span>
                  <ArrowDownRight className="h-4 w-4 text-red-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-red-400 font-mono">$3,280.00</div>
                <div className="flex items-center gap-1 text-[11px] text-red-400 mt-1 font-medium">
                  <span>↓ -4.1% spend velocity</span>
                </div>
              </div>
            </div>

            {/* Middle Mock Chart & Categorization */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Mock Cash Flow Chart */}
              <div className="md:col-span-7 p-4 rounded-xl bg-[#141824] border border-white/[0.06] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div>
                    <span className="font-semibold text-white">Cash Flow Trajectory</span>
                    <p className="text-[11px] text-slate-400">Income vs Expenses (Last 6 Months)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Income
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-red-400">
                      <span className="h-2 w-2 rounded-full bg-red-400"></span> Expense
                    </span>
                  </div>
                </div>

                {/* Stylized SVG Curves */}
                <div className="h-36 sm:h-44 w-full flex items-end pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                    <defs>
                      <linearGradient id="heroGreenGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="heroRedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Green Income Curve */}
                    <path
                      d="M0,75 C60,65 120,40 180,48 C240,55 300,25 400,20 L400,120 L0,120 Z"
                      fill="url(#heroGreenGrad)"
                    />
                    <path
                      d="M0,75 C60,65 120,40 180,48 C240,55 300,25 400,20"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />

                    {/* Red Expense Curve */}
                    <path
                      d="M0,95 C60,90 120,80 180,72 C240,88 300,65 400,60 L400,120 L0,120 Z"
                      fill="url(#heroRedGrad)"
                    />
                    <path
                      d="M0,95 C60,90 120,80 180,72 C240,88 300,65 400,60"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-white/[0.04]">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              {/* Mock Spending Breakdown & Transactions */}
              <div className="md:col-span-5 p-4 rounded-xl bg-[#141824] border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-white/[0.05]">
                  <span className="font-semibold text-white">Live Categorization</span>
                  <span className="text-[10px] text-orange-400 font-mono">REAL-TIME</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0E111A]">
                    <div className="flex items-center gap-2">
                      <span>🍔</span>
                      <span className="text-slate-200">Food & Dining</span>
                    </div>
                    <span className="font-mono text-red-400 font-medium">-$82.40</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0E111A]">
                    <div className="flex items-center gap-2">
                      <span>💼</span>
                      <span className="text-slate-200">Salary Deposit</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-medium">+$4,200.00</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#0E111A]">
                    <div className="flex items-center gap-2">
                      <span>💡</span>
                      <span className="text-slate-200">Utilities / Bills</span>
                    </div>
                    <span className="font-mono text-red-400 font-medium">-$145.00</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Budget Health</span>
                  <span className="text-emerald-400 font-semibold">92% On Track</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Floating Chips on Desktops */}
          <div className="hidden lg:flex items-center gap-3 absolute -bottom-5 -left-6 bg-[#161A28] border border-white/10 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl animate-bounce duration-1000">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ✓
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-white">+$4,200.00 Salary Credited</p>
              <p className="text-slate-400 text-[11px]">Automatically categorized to Income</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 absolute -top-5 -right-6 bg-[#161A28] border border-white/10 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl">
            <div className="h-8 w-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Zap className="h-4 w-4" />
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-white">AI Savings Opportunity</p>
              <p className="text-slate-400 text-[11px]">Save $340/mo on redundant recurring bills</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;