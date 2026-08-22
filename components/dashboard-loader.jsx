"use client";

import React from "react";

export function DashboardLoader({ text = "Syncing dashboard ledger..." }) {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center select-none my-auto">
      {/* Minimal Floating Glow */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Subtle Ambient Radial Backlight */}
        <div className="absolute w-44 h-44 bg-gradient-to-tr from-orange-500/25 to-amber-500/25 rounded-full blur-2xl pointer-events-none -z-10 animate-pulse-glow" />

        {/* Compact 3D Flowoid Coin */}
        <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 via-orange-500 to-amber-600 p-[2px] shadow-xl shadow-orange-500/30 animate-coin-spin mb-4">
          <div className="h-full w-full rounded-full bg-[#0F121C] flex flex-col items-center justify-center border border-amber-300/40 relative overflow-hidden">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-orange-500 font-mono">
              $
            </span>
          </div>
        </div>

        {/* Fast Minimal Progress & Status */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              {text}
            </span>
          </div>

          {/* Minimal Quick Shimmer Bar */}
          <div className="w-56 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full animate-pulse-glow"
              style={{ animationDuration: "1s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLoader;
