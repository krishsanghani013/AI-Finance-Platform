"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  CreditCard,
} from "lucide-react";

export function DashboardKpiCards({
  totalBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
  balanceChangePercent = 12.4,
  incomeChangePercent = 8.2,
  expenseChangePercent = -4.1,
  accountsCount = 1,
}) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
      {/* 1. Total Balance Card */}
      <Card className="relative overflow-hidden bg-[#12151F] border border-white/[0.08] hover:border-orange-500/30 transition-all duration-300 rounded-2xl shadow-lg shadow-black/40 group">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/15 transition-all pointer-events-none" />
        <CardContent className="p-5 sm:p-6 relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Balance
            </span>
            <div className="h-9 w-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Wallet className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-mono">
              {formatCurrency(totalBalance)}
            </div>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-md ${
                  balanceChangePercent >= 0
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}
              >
                {balanceChangePercent >= 0 ? (
                  <TrendingUp className="h-3 w-3 inline" />
                ) : (
                  <TrendingDown className="h-3 w-3 inline" />
                )}
                {balanceChangePercent >= 0 ? "+" : ""}
                {balanceChangePercent.toFixed(1)}%
              </span>
              <span className="text-xs text-slate-400">
                vs last month
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
            <span>Across {accountsCount} active {accountsCount === 1 ? "account" : "accounts"}</span>
            <span className="text-orange-400/80 font-medium">Real-time</span>
          </div>
        </CardContent>
      </Card>

      {/* 2. Income Card (Green) */}
      <Card className="relative overflow-hidden bg-[#12151F] border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 rounded-2xl shadow-lg shadow-black/40 group">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
        <CardContent className="p-5 sm:p-6 relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Monthly Income
            </span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-emerald-400 font-mono">
              {formatCurrency(totalIncome)}
            </div>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-md ${
                  incomeChangePercent >= 0
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {incomeChangePercent >= 0 ? "↑" : "↓"} {Math.abs(incomeChangePercent).toFixed(1)}%
              </span>
              <span className="text-xs text-slate-400">
                vs previous month
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
            <span>Inflow streams</span>
            <span className="text-emerald-400/90 font-medium">Income</span>
          </div>
        </CardContent>
      </Card>

      {/* 3. Expenses Card (Red) */}
      <Card className="relative overflow-hidden bg-[#12151F] border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 rounded-2xl shadow-lg shadow-black/40 group">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all pointer-events-none" />
        <CardContent className="p-5 sm:p-6 relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Monthly Expenses
            </span>
            <div className="h-9 w-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <ArrowDownRight className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-red-400 font-mono">
              {formatCurrency(totalExpense)}
            </div>

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-md ${
                  expenseChangePercent <= 0
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {expenseChangePercent <= 0 ? "↓" : "↑"} {Math.abs(expenseChangePercent).toFixed(1)}%
              </span>
              <span className="text-xs text-slate-400">
                {expenseChangePercent <= 0 ? "less spent vs last mo" : "more spent vs last mo"}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500">
            <span>
              Net:{" "}
              <span className={totalIncome - totalExpense >= 0 ? "text-emerald-400 font-medium font-mono" : "text-red-400 font-medium font-mono"}>
                {formatCurrency(totalIncome - totalExpense)}
              </span>
            </span>
            <span className="text-slate-400">
              {totalIncome > 0 ? `${Math.round(((totalIncome - totalExpense) / totalIncome) * 100)}% saved` : "0% saved"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardKpiCards;
