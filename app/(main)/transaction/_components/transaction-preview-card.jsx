"use client";

import React from "react";
import { format } from "date-fns";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  Repeat,
  Sparkles,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { CategoryIcon } from "./category-icon";

export function TransactionPreviewCard({
  type = "EXPENSE",
  amount = "0.00",
  description = "",
  accountId = "",
  category = "",
  date = new Date(),
  isRecurring = false,
  recurringInterval = "MONTHLY",
  accounts = [],
  categories = [],
}) {
  const selectedAccount = accounts.find((a) => a.id === accountId);
  const selectedCategory = categories.find((c) => c.id === category);

  const numAmount = parseFloat(amount) || 0;
  const isExpense = type === "EXPENSE";

  const currentBalance = selectedAccount ? parseFloat(selectedAccount.balance) : 0;
  const projectedBalance = isExpense
    ? currentBalance - numAmount
    : currentBalance + numAmount;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#12151F]/90 backdrop-blur-xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all">
      {/* Background ambient lighting */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-40 ${
          isExpense ? "bg-rose-500" : "bg-emerald-500"
        }`}
      />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Live Slip Preview
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
          </div>

          <div
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
              isExpense
                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            }`}
          >
            {isExpense ? (
              <>
                <ArrowDownRight className="h-3 w-3" /> Expense
              </>
            ) : (
              <>
                <ArrowUpRight className="h-3 w-3" /> Income
              </>
            )}
          </div>
        </div>

        {/* Amount Display */}
        <div className="my-5 text-center sm:text-left">
          <p className="text-xs text-slate-400 font-medium mb-1">Transaction Amount</p>
          <div className="flex items-baseline justify-center sm:justify-start gap-1">
            <span
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-mono ${
                isExpense ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {isExpense ? "-" : "+"}
              ${numAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-xs text-slate-500 uppercase font-medium">USD</span>
          </div>

          {description ? (
            <p className="text-sm font-medium text-slate-200 mt-2 truncate">
              "{description}"
            </p>
          ) : (
            <p className="text-xs text-slate-500 italic mt-2">
              No description added yet
            </p>
          )}
        </div>

        {/* Details List */}
        <div className="space-y-3 pt-2">
          {/* Account */}
          <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 text-orange-400" /> Account
            </span>
            <div className="text-right">
              <span className="font-medium text-slate-200">
                {selectedAccount ? selectedAccount.name : "Select account"}
              </span>
              {selectedAccount && (
                <span className="block text-[10px] text-slate-400">
                  Bal: ${currentBalance.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-amber-400" /> Category
            </span>
            <div className="flex items-center gap-1.5">
              {selectedCategory ? (
                <>
                  <CategoryIcon
                    iconName={selectedCategory.icon}
                    color={selectedCategory.color}
                    size="sm"
                  />
                  <span className="font-medium text-slate-200">
                    {selectedCategory.name}
                  </span>
                </>
              ) : (
                <span className="text-slate-500 italic">Uncategorized</span>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-sky-400" /> Date
            </span>
            <span className="font-medium text-slate-200">
              {date ? format(date, "MMM dd, yyyy") : "Today"}
            </span>
          </div>

          {/* Recurring */}
          {isRecurring && (
            <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Repeat className="h-3.5 w-3.5 text-orange-400" /> Frequency
              </span>
              <span className="font-semibold uppercase text-[11px] tracking-wide">
                {recurringInterval}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Projected Balance */}
      {selectedAccount && numAmount > 0 && (
        <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <span className="text-slate-400">Projected Balance:</span>
          <span
            className={`font-mono font-semibold ${
              projectedBalance >= 0 ? "text-slate-200" : "text-rose-400"
            }`}
          >
            ${projectedBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      )}
    </div>
  );
}

export default TransactionPreviewCard;
