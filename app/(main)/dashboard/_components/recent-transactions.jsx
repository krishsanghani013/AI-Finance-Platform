"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  ChevronRight,
  Plus,
  Filter,
} from "lucide-react";

// Icon and Emoji map for realistic transaction items
const CATEGORY_ICONS = {
  groceries: { emoji: "🛒", label: "Groceries", color: "#F97316" },
  food: { emoji: "🍔", label: "Food & Dining", color: "#FF5E1E" },
  dining: { emoji: "☕", label: "Coffee & Food", color: "#FF5E1E" },
  salary: { emoji: "💼", label: "Salary / Income", color: "#10B981" },
  income: { emoji: "💵", label: "Income", color: "#10B981" },
  freelance: { emoji: "💻", label: "Freelance", color: "#06B6D4" },
  investments: { emoji: "📈", label: "Investments", color: "#6366F1" },
  entertainment: { emoji: "🎬", label: "Entertainment", color: "#8B5CF6" },
  transportation: { emoji: "🚕", label: "Transportation", color: "#3B82F6" },
  bills: { emoji: "⚡", label: "Bills & Utilities", color: "#F59E0B" },
  utilities: { emoji: "💡", label: "Utilities", color: "#F59E0B" },
  shopping: { emoji: "🛍️", label: "Shopping", color: "#EC4899" },
  housing: { emoji: "🏠", label: "Housing & Rent", color: "#EF4444" },
  travel: { emoji: "✈️", label: "Travel", color: "#0EA5E9" },
  health: { emoji: "🩺", label: "Healthcare", color: "#14B8A6" },
  other: { emoji: "📦", label: "Other", color: "#94A3B8" },
};

export function RecentTransactions({ transactions = [], accounts = [] }) {
  const [selectedAccountId, setSelectedAccountId] = useState("all");

  // Filter transactions based on selected account
  const filteredTransactions = React.useMemo(() => {
    let list = transactions;
    if (selectedAccountId !== "all") {
      list = list.filter((t) => t.accountId === selectedAccountId);
    }
    return list.slice(0, 7);
  }, [transactions, selectedAccountId]);

  const getCategoryMeta = (category = "", description = "") => {
    const descLower = description.toLowerCase();
    const catLower = category.toLowerCase();

    if (descLower.includes("starbucks") || descLower.includes("coffee") || descLower.includes("cafe")) {
      return { emoji: "☕", label: "Food & Dining", color: "#FF5E1E" };
    }
    if (descLower.includes("grocery") || descLower.includes("walmart") || descLower.includes("trader") || descLower.includes("target")) {
      return { emoji: "🛒", label: "Groceries", color: "#F97316" };
    }
    if (descLower.includes("salary") || descLower.includes("paycheck") || descLower.includes("payroll")) {
      return { emoji: "💼", label: "Salary", color: "#10B981" };
    }
    if (descLower.includes("netflix") || descLower.includes("spotify") || descLower.includes("cinema") || descLower.includes("movie")) {
      return { emoji: "🎬", label: "Entertainment", color: "#8B5CF6" };
    }
    if (descLower.includes("uber") || descLower.includes("lyft") || descLower.includes("gas") || descLower.includes("fuel")) {
      return { emoji: "🚕", label: "Transport", color: "#3B82F6" };
    }

    return (
      CATEGORY_ICONS[catLower] || {
        emoji: "🏷️",
        label: category || "General",
        color: "#94A3B8",
      }
    );
  };

  const defaultAccId = accounts.find((a) => a.isDefault)?.id || accounts[0]?.id;

  return (
    <Card className="bg-[#12151F] border border-white/[0.08] rounded-2xl shadow-lg shadow-black/40 overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <Receipt className="h-4 w-4 text-orange-400" />
              <span>Recent Transactions</span>
            </CardTitle>
            <span className="text-[11px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
              Latest {filteredTransactions.length}
            </span>
          </div>
          <CardDescription className="text-xs text-slate-400 mt-0.5">
            Real-time ledger of your incoming and outgoing funds
          </CardDescription>
        </div>

        <div className="flex items-center gap-3">
          {/* Account Filter Select */}
          {accounts.length > 1 && (
            <Select
              value={selectedAccountId}
              onValueChange={setSelectedAccountId}
            >
              <SelectTrigger className="w-[140px] h-8 text-xs bg-[#0A0C12] border-white/10 text-slate-200 rounded-xl">
                <SelectValue placeholder="All Accounts" />
              </SelectTrigger>
              <SelectContent className="bg-[#161926] border-white/10 text-slate-200">
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {defaultAccId ? (
            <Link
              href={`/account/${defaultAccId}`}
              className="text-xs font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors group"
            >
              <span>View all</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/transaction/create"
              className="text-xs font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mx-auto">
              <Receipt className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">No transactions recorded yet</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Add your first expense or income transaction to start building your financial history.
              </p>
            </div>
            <Link href="/transaction/create">
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs mt-2"
              >
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Transaction
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filteredTransactions.map((transaction) => {
              const meta = getCategoryMeta(transaction.category, transaction.description);
              const isExpense = String(transaction.type).toUpperCase() === "EXPENSE";

              let formattedDate = "Recent";
              try {
                formattedDate = format(new Date(transaction.date), "MMM d, yyyy");
              } catch (e) {}

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 sm:px-6 hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Left: Category Icon & Title */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-[#161926] border border-white/[0.07] flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                      {meta.emoji}
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <p className="text-sm font-semibold text-white truncate max-w-[160px] sm:max-w-[280px] md:max-w-[360px]">
                        {transaction.description || "Untitled Transaction"}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span
                          className="px-1.5 py-0.2 rounded text-[10px] font-medium"
                          style={{
                            backgroundColor: `${meta.color}15`,
                            color: meta.color,
                          }}
                        >
                          {meta.label}
                        </span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                        {transaction.isRecurring && (
                          <>
                            <span>•</span>
                            <span className="text-orange-400 text-[10px]">Recurring</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount (Red for Expense, Green for Income) */}
                  <div className="text-right flex-shrink-0">
                    <div
                      className={`text-sm sm:text-base font-bold font-mono flex items-center justify-end gap-0.5 ${
                        isExpense ? "text-red-500 font-bold" : "text-emerald-400 font-bold"
                      }`}
                    >
                      <span>{isExpense ? "-" : "+"}</span>
                      <span>
                        ${parseFloat(transaction.amount).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-wider block font-bold ${
                        isExpense ? "text-red-400" : "text-emerald-400"
                      }`}
                    >
                      {isExpense ? "Expense" : "Income"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentTransactions;
