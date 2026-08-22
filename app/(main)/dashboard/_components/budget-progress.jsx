"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Pencil, X, ChevronRight, Target, AlertTriangle, Sparkles } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateBudget } from "@/actions/budget";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

// Category definitions with emojis & default targets
const CATEGORY_CONFIG = {
  food: { name: "Food & Dining", emoji: "🍔", ratio: 0.30 },
  bills: { name: "Bills & Utilities", emoji: "💡", ratio: 0.25 },
  entertainment: { name: "Entertainment", emoji: "🎬", ratio: 0.15 },
  transport: { name: "Transportation", emoji: "🚗", ratio: 0.15 },
  shopping: { name: "Shopping", emoji: "🛍️", ratio: 0.10 },
  travel: { name: "Travel", emoji: "✈️", ratio: 0.05 },
};

export function BudgetProgress({ initialBudget, currentExpenses = 0, categoryExpenses = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount ? initialBudget.amount.toString() : "4000"
  );

  const totalBudgetAmount = initialBudget?.amount || 4000;
  const spent = currentExpenses || 0;
  const percentUsed = totalBudgetAmount > 0 ? (spent / totalBudgetAmount) * 100 : 0;

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive budget amount");
      return;
    }

    const result = await updateBudgetFn(amount);
    if (result?.success) {
      setIsEditing(false);
      toast.success("Monthly Budget updated successfully");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update Budget");
    }
  }, [error]);

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "4000");
    setIsEditing(false);
  };

  // Generate category budget progress items matching wireframe
  const categoryBudgets = React.useMemo(() => {
    if (categoryExpenses && categoryExpenses.length > 0) {
      return categoryExpenses.slice(0, 4).map((cat) => {
        const catKey = cat.name.toLowerCase();
        const cfg = CATEGORY_CONFIG[catKey] || {
          name: cat.name,
          emoji: "🏷️",
          ratio: 0.2,
        };
        const allocatedBudget = Math.max(
          Math.round(totalBudgetAmount * cfg.ratio),
          Math.round(cat.value * 1.15)
        );
        const percent = Math.min(
          Math.round((cat.value / allocatedBudget) * 100),
          150
        );

        return {
          name: cfg.name,
          emoji: cfg.emoji,
          spent: cat.value,
          total: allocatedBudget,
          percent: percent,
        };
      });
    }

    // Default wireframe demonstration values
    return [
      { name: "Food & Dining", emoji: "🍔", spent: 780, total: 1000, percent: 78 },
      { name: "Entertainment", emoji: "🎬", spent: 260, total: 500, percent: 52 },
      { name: "Transportation", emoji: "🚗", spent: 335, total: 500, percent: 67 },
      { name: "Bills & Utilities", emoji: "💡", spent: 450, total: 1000, percent: 45 },
    ];
  }, [categoryExpenses, totalBudgetAmount]);

  const getHealthColor = (percent) => {
    if (percent >= 90) return { bar: "bg-red-500", text: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/10" };
    if (percent >= 75) return { bar: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" };
    return { bar: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" };
  };

  const totalHealth = getHealthColor(percentUsed);

  return (
    <Card className="bg-[#12151F] border border-white/[0.08] rounded-2xl shadow-lg shadow-black/40 overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-400" />
              <span>Budget Progress</span>
            </CardTitle>
            <span className="text-[11px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
              Monthly Cap
            </span>
          </div>
          <CardDescription className="text-xs text-slate-400 mt-0.5">
            Track spending velocity against your allocated limits
          </CardDescription>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Inline Edit Budget Control */}
          {isEditing ? (
            <div className="flex items-center gap-1.5 bg-[#0A0C12] p-1 rounded-xl border border-white/15">
              <span className="text-xs text-slate-400 pl-2">$</span>
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-24 sm:w-28 h-7 text-xs bg-transparent border-0 text-white focus-visible:ring-0 p-0"
                placeholder="Amount"
                autoFocus
                disabled={isLoading}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUpdateBudget}
                disabled={isLoading}
                className="h-6 w-6 text-emerald-400 hover:bg-emerald-500/20 rounded-lg cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                disabled={isLoading}
                className="h-6 w-6 text-rose-400 hover:bg-rose-500/20 rounded-lg cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-8 text-xs border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-orange-500/40 rounded-xl px-2.5 cursor-pointer"
            >
              <Pencil className="h-3 w-3 mr-1.5 text-orange-400" />
              Edit Budget
            </Button>
          )}

          <Link
            href="/transaction/create"
            className="text-xs font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="pt-4 pb-5 space-y-6">
        {/* Overall Monthly Budget Bar */}
        <div className="p-4 rounded-xl bg-[#0B0D14]/80 border border-white/[0.06] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">Total Monthly Spend:</span>
              <span className="font-mono font-bold text-white text-sm">
                ${spent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-slate-500">/</span>
              <span className="font-mono text-slate-400">
                ${totalBudgetAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border ${totalHealth.bg} ${totalHealth.text} ${totalHealth.border}`}>
                {percentUsed.toFixed(1)}% Used
              </span>
              <span className="text-slate-400 text-[11px]">
                (${Math.max(totalBudgetAmount - spent, 0).toLocaleString("en-US", { minimumFractionDigits: 0 })} remaining)
              </span>
            </div>
          </div>

          <div className="relative w-full h-3 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                percentUsed >= 90
                  ? "bg-gradient-to-r from-orange-500 to-red-500"
                  : percentUsed >= 75
                  ? "bg-gradient-to-r from-amber-500 to-orange-500"
                  : "bg-gradient-to-r from-emerald-500 to-teal-400"
              }`}
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>
        </div>

        {/* Category Budget Breakdown Rows */}
        <div className="space-y-3.5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Category Limits Breakdown
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {categoryBudgets.map((cat, idx) => {
              const health = getHealthColor(cat.percent);
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#0E111A] border border-white/[0.05] hover:border-white/10 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{cat.emoji}</span>
                      <span className="font-medium text-slate-200">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-400 text-[11px]">
                        ${cat.spent.toLocaleString()} / ${cat.total.toLocaleString()}
                      </span>
                      <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${health.bg} ${health.text}`}>
                        {cat.percent}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar matching wireframe */}
                  <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${health.bar}`}
                      style={{ width: `${Math.min(cat.percent, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BudgetProgress;