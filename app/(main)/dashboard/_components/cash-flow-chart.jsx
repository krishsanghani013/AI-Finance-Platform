"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Layers } from "lucide-react";

export function CashFlowChart({ monthlyData = [] }) {
  const [activeRange, setActiveRange] = useState("6M");

  // Format currency
  const formatCurrency = (val) => {
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(1)}k`;
    }
    return `$${val}`;
  };

  // Filter data based on active range
  const displayData = React.useMemo(() => {
    if (!monthlyData || monthlyData.length === 0) {
      // Fallback realistic placeholder data if no transactions yet
      return [
        { month: "Jan", income: 7200, expense: 3400, net: 3800 },
        { month: "Feb", income: 7500, expense: 3100, net: 4400 },
        { month: "Mar", income: 8100, expense: 4200, net: 3900 },
        { month: "Apr", income: 7900, expense: 3600, net: 4300 },
        { month: "May", income: 8300, expense: 3900, net: 4400 },
        { month: "Jun", income: 8420, expense: 3280, net: 5140 },
      ];
    }

    if (activeRange === "3M") {
      return monthlyData.slice(-3);
    }
    if (activeRange === "6M") {
      return monthlyData.slice(-6);
    }
    return monthlyData;
  }, [monthlyData, activeRange]);

  const totalInflow = displayData.reduce((sum, d) => sum + (d.income || 0), 0);
  const totalOutflow = displayData.reduce((sum, d) => sum + (d.expense || 0), 0);
  const netSavings = totalInflow - totalOutflow;

  // Custom Glass Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const inc = payload.find((p) => p.dataKey === "income")?.value || 0;
      const exp = payload.find((p) => p.dataKey === "expense")?.value || 0;
      const net = inc - exp;

      return (
        <div className="bg-[#161926]/95 border border-white/10 p-3.5 rounded-xl shadow-2xl backdrop-blur-md min-w-[170px]">
          <p className="text-xs font-semibold text-slate-300 pb-2 border-b border-white/[0.08] mb-2">
            {label} Overview
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Income
              </span>
              <span className="font-mono font-medium text-white">
                ${inc.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                Expense
              </span>
              <span className="font-mono font-medium text-white">
                ${exp.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="pt-2 mt-2 border-t border-white/[0.06] flex items-center justify-between gap-4 font-medium">
              <span className="text-slate-400">Net Flow</span>
              <span
                className={`font-mono ${
                  net >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {net >= 0 ? "+" : ""}${net.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-[#12151F] border border-white/[0.08] rounded-2xl shadow-lg shadow-black/40 overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold text-white">
              Cash Flow
            </CardTitle>
            <span className="text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
              In vs Out
            </span>
          </div>
          <CardDescription className="text-xs text-slate-400 mt-0.5">
            Income (<span className="text-emerald-400">green</span>) and expenses (<span className="text-red-400">red</span>) trajectory over time
          </CardDescription>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-[#0C0E15] p-1 rounded-xl border border-white/[0.06] text-xs">
            {["3M", "6M", "1Y"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRange(r)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeRange === r
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 pb-4">
        {/* Quick stats mini-banner */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-[#0B0D14]/70 border border-white/[0.05] text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Total Inflow</span>
            <span className="font-bold text-emerald-400 font-mono text-sm sm:text-base">
              ${totalInflow.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Total Outflow</span>
            <span className="font-bold text-red-400 font-mono text-sm sm:text-base">
              ${totalOutflow.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Net Saved</span>
            <span
              className={`font-bold font-mono text-sm sm:text-base ${
                netSavings >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {netSavings >= 0 ? "+" : ""}${netSavings.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Minimal Elegant Area Chart */}
        <div className="h-[240px] sm:h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={displayData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                {/* Income Gradient - Emerald Green */}
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>

                {/* Expense Gradient - Red */}
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.05)"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={6}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#10B981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#incomeGradient)"
              />

              <Area
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#EF4444"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#expenseGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20"></span>
            <span className="text-emerald-400 font-medium">Income Inflow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-red-500/20"></span>
            <span className="text-red-400 font-medium">Expense Outflow</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CashFlowChart;
