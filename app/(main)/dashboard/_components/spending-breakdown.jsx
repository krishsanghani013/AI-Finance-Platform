"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart as PieIcon, ArrowUpRight, Sparkles } from "lucide-react";

// Category Icons & Color Mapping
const CATEGORY_META = {
  food: { name: "Food & Dining", emoji: "🍔", color: "#FF5E1E" },
  groceries: { name: "Groceries", emoji: "🛒", color: "#F97316" },
  bills: { name: "Bills & Fees", emoji: "💡", color: "#F59E0B" },
  utilities: { name: "Utilities", emoji: "⚡", color: "#EAB308" },
  travel: { name: "Travel", emoji: "✈️", color: "#06B6D4" },
  entertainment: { name: "Entertainment", emoji: "🎬", color: "#8B5CF6" },
  transportation: { name: "Transport", emoji: "🚗", color: "#3B82F6" },
  shopping: { name: "Shopping", emoji: "🛍️", color: "#EC4899" },
  housing: { name: "Housing", emoji: "🏠", color: "#10B981" },
  healthcare: { name: "Healthcare", emoji: "🩺", color: "#14B8A6" },
  education: { name: "Education", emoji: "📚", color: "#6366F1" },
  personal: { name: "Personal Care", emoji: "✨", color: "#D946EF" },
  other: { name: "Other Expenses", emoji: "📦", color: "#94A3B8" },
};

const DEFAULT_COLORS = [
  "#FF5E1E", // Ember
  "#F59E0B", // Warm Amber
  "#06B6D4", // Cyan
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#94A3B8", // Slate
];

export function SpendingBreakdown({ categoryData = [], totalExpenses = 0 }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // Normalize category data or provide realistic sample if empty
  const formattedData = React.useMemo(() => {
    if (!categoryData || categoryData.length === 0) {
      return [
        { key: "bills", name: "Bills", value: 1016.80, percent: 31, emoji: "💡", color: "#F59E0B" },
        { key: "food", name: "Food", value: 787.20, percent: 24, emoji: "🍔", color: "#FF5E1E" },
        { key: "travel", name: "Travel", value: 393.60, percent: 12, emoji: "✈️", color: "#06B6D4" },
        { key: "shopping", name: "Shopping", value: 590.40, percent: 18, emoji: "🛍️", color: "#EC4899" },
        { key: "entertainment", name: "Entertainment", value: 492.00, percent: 15, emoji: "🎬", color: "#8B5CF6" },
      ];
    }

    const total = categoryData.reduce((sum, item) => sum + item.value, 0) || 1;

    return categoryData
      .map((item, idx) => {
        const catKey = item.name.toLowerCase();
        const meta = CATEGORY_META[catKey] || {
          name: item.name,
          emoji: "🏷️",
          color: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
        };
        const percent = Math.round((item.value / total) * 100);

        return {
          key: catKey,
          name: meta.name || item.name,
          value: item.value,
          percent: percent || 1,
          emoji: meta.emoji,
          color: meta.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [categoryData]);

  const grandTotal = formattedData.reduce((sum, item) => sum + item.value, 0);

  // Custom Pie Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#161926]/95 border border-white/10 p-2.5 rounded-xl shadow-xl backdrop-blur-md text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-white mb-1">
            <span>{data.emoji}</span>
            <span>{data.name}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-slate-300">
            <span>${data.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            <span className="font-semibold text-orange-400 font-mono">({data.percent}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-[#12151F] border border-white/[0.08] rounded-2xl shadow-lg shadow-black/40 overflow-hidden flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold text-white">
              Spending Breakdown
            </CardTitle>
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
          </div>
          <CardDescription className="text-xs text-slate-400 mt-0.5">
            Category distribution for this month
          </CardDescription>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Total Spent</span>
          <span className="text-sm sm:text-base font-bold text-white font-mono">
            ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-2 pb-4 flex-1 flex flex-col justify-between">
        {/* Donut Chart with Center Total */}
        <div className="relative h-[190px] sm:h-[200px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {formattedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#12151F"
                    strokeWidth={2}
                    className="transition-all duration-300 cursor-pointer hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] font-medium text-slate-400">Total</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">
              ${grandTotal >= 1000 ? `${(grandTotal / 1000).toFixed(1)}k` : grandTotal.toFixed(0)}
            </span>
          </div>
        </div>

        {/* Categories List matching wireframe (Food 24%, Bills 31%, Travel 12%, etc.) */}
        <div className="space-y-2.5 mt-2 pt-3 border-t border-white/[0.06]">
          {formattedData.slice(0, 4).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs group p-1.5 -mx-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm">{item.emoji}</span>
                <span className="font-medium text-slate-300 truncate max-w-[110px] sm:max-w-[140px]">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-slate-400 font-mono">
                  ${item.value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span
                  className="font-semibold font-mono px-2 py-0.5 rounded-md text-[11px]"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  {item.percent}%
                </span>
              </div>
            </div>
          ))}

          {formattedData.length > 4 && (
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="text-[11px] italic text-slate-400">
                +{formattedData.length - 4} more categories
              </span>
              <span className="font-mono text-slate-300 font-medium">
                ${formattedData.slice(4).reduce((sum, c) => sum + c.value, 0).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SpendingBreakdown;
