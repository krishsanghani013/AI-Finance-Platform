"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";

// Symmetrically balanced floating financial assets
const FLOATING_ITEMS = [
  // Top Left Quadrant
  { id: 1, type: "bill", label: "$100", x: -35, y: -30, targetDelay: 0.05, icon: "💵" },
  { id: 2, type: "coin", label: "$", x: -20, y: -38, targetDelay: 0.15, icon: "🪙" },
  { id: 3, type: "trend", label: "+$4,200", x: -40, y: -15, targetDelay: 0.22, icon: "📈" },
  { id: 4, type: "gem", label: "DIAMOND", x: -18, y: -20, targetDelay: 0.1, icon: "💎" },

  // Top Right Quadrant
  { id: 5, type: "bill", label: "$50", x: 35, y: -30, targetDelay: 0.08, icon: "💵" },
  { id: 6, type: "coin", label: "★", x: 20, y: -38, targetDelay: 0.18, icon: "🪙" },
  { id: 7, type: "card", label: "PLATINUM", x: 40, y: -15, targetDelay: 0.25, icon: "💳" },
  { id: 8, type: "spark", label: "AI", x: 18, y: -20, targetDelay: 0.12, icon: "✨" },

  // Bottom Left Quadrant
  { id: 9, type: "bill", label: "$20", x: -35, y: 28, targetDelay: 0.14, icon: "💵" },
  { id: 10, type: "card", label: "FLOWOID", x: -20, y: 35, targetDelay: 0.2, icon: "💳" },
  { id: 11, type: "coin", label: "✦", x: -40, y: 12, targetDelay: 0.28, icon: "🪙" },
  { id: 12, type: "spark", label: "SYNC", x: -16, y: 18, targetDelay: 0.06, icon: "⚡" },

  // Bottom Right Quadrant
  { id: 13, type: "bill", label: "$100", x: 35, y: 28, targetDelay: 0.16, icon: "💵" },
  { id: 14, type: "trend", label: "↑ 12.4%", x: 20, y: 35, targetDelay: 0.24, icon: "🚀" },
  { id: 15, type: "gem", label: "WEALTH", x: 40, y: 12, targetDelay: 0.3, icon: "💎" },
  { id: 16, type: "coin", label: "$", x: 16, y: 18, targetDelay: 0.09, icon: "🪙" },
];

export function FlowoidLoader({ text = "Calibrating financial intelligence...", fullScreen = true }) {
  const [phase, setPhase] = useState("floating");
  const [progress, setProgress] = useState(15);
  const [messageIndex, setMessageIndex] = useState(0);

  const statusMessages = [
    "Attracting live cash streams & multi-wallets...",
    "Converging real-time transactions into core ledger...",
    "Computing predictive wealth trajectory & AI budget caps...",
    "Synchronizing cash flow curves...",
    "Financial Command Center Ready!",
  ];

  // Orchestrate animation timeline loop
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 98;
        return prev + Math.floor(Math.random() * 14 + 6);
      });
    }, 160);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % statusMessages.length);
    }, 1300);

    // 0ms - 1200ms: Floating freely on screen
    // 1200ms - 3000ms: Gravitational magnetic gathering into center (0, 0)
    // 3000ms - 4800ms: Wealth core burst & calibration
    const gatherTimer = setTimeout(() => {
      setPhase("gathering");
    }, 1200);

    const burstTimer = setTimeout(() => {
      setPhase("burst");
    }, 2900);

    const loopTimer = setTimeout(() => {
      setPhase("floating");
      setProgress(15);
    }, 4800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(gatherTimer);
      clearTimeout(burstTimer);
      clearTimeout(loopTimer);
    };
  }, [phase]);

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-[100] flex items-center justify-center w-screen h-screen min-h-screen bg-[#07080D] overflow-hidden select-none"
          : "relative flex items-center justify-center w-full min-h-[550px] py-16 bg-[#090A0F] rounded-3xl border border-white/[0.08] overflow-hidden select-none"
      }
    >
      {/* 1. Ambient Background Glowing Light Mesh (Centered) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-gradient-to-tr from-orange-600/20 via-amber-500/25 to-emerald-500/15 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* 2. Vortex Accretion Rings (Centered) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] rounded-full border border-orange-500/25 border-dashed animate-vortex-spin pointer-events-none -z-10" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[280px] h-[200px] sm:h-[280px] rounded-full border border-amber-400/30 animate-vortex-spin pointer-events-none -z-10"
        style={{ animationDirection: "reverse", animationDuration: "5s" }}
      />

      {/* 3. Shockwave Burst Rings during gathering (Centered) */}
      {phase === "burst" && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-orange-400 animate-shockwave pointer-events-none" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-emerald-400 animate-shockwave pointer-events-none"
            style={{ animationDelay: "0.25s" }}
          />
        </>
      )}

      {/* 4. Floating & Gathering Money Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_ITEMS.map((item) => {
          const isGathering = phase === "gathering" || phase === "burst";
          const currentX = isGathering ? 0 : item.x;
          const currentY = isGathering ? 0 : item.y;
          const currentScale = isGathering ? 0.1 : 1;
          const currentOpacity = isGathering ? 0 : 0.95;

          return (
            <div
              key={item.id}
              className="absolute top-1/2 left-1/2 pointer-events-none transition-all will-change-transform"
              style={{
                transform: `translate3d(calc(-50% + ${currentX}vw), calc(-50% + ${currentY}vh), 0) scale(${currentScale})`,
                opacity: currentOpacity,
                transitionDuration: isGathering ? "1.5s" : "2.2s",
                transitionTimingFunction: isGathering
                  ? "cubic-bezier(0.22, 1, 0.36, 1)"
                  : "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: isGathering ? `${item.targetDelay}s` : "0s",
              }}
            >
              {/* Item Designs */}
              {item.type === "bill" && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-950/95 via-emerald-900/95 to-teal-950/95 border border-emerald-400/40 shadow-xl shadow-emerald-950/70 backdrop-blur-md animate-float-gently text-emerald-300">
                  <span className="text-base">💵</span>
                  <span className="font-mono font-black text-xs tracking-wider text-emerald-200">
                    {item.label}
                  </span>
                </div>
              )}

              {item.type === "coin" && (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-orange-600 p-[1.5px] shadow-xl shadow-amber-500/30 backdrop-blur-md animate-coin-spin">
                  <div className="h-full w-full rounded-full bg-[#161926] flex items-center justify-center border border-amber-300/60 text-amber-300 font-mono font-black text-sm">
                    {item.label}
                  </div>
                </div>
              )}

              {item.type === "card" && (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#181C2B] via-[#1F2438] to-[#141824] border border-orange-500/40 shadow-2xl shadow-black/80 backdrop-blur-md animate-float-gently">
                  <div className="h-3.5 w-5 rounded bg-gradient-to-r from-amber-400 to-orange-500 opacity-80" />
                  <span className="font-mono text-[10px] font-bold tracking-widest text-slate-200">
                    {item.label}
                  </span>
                </div>
              )}

              {item.type === "trend" && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 shadow-lg shadow-emerald-950/50 backdrop-blur-md text-emerald-400 font-mono font-bold text-xs animate-float-gently">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </div>
              )}

              {item.type === "gem" && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#141824]/90 border border-cyan-400/40 shadow-lg shadow-cyan-950/40 backdrop-blur-md text-cyan-300 font-mono text-[11px] font-bold animate-float-gently">
                  <span className="text-sm">💎</span>
                  <span>{item.label}</span>
                </div>
              )}

              {item.type === "spark" && (
                <div className="h-8 w-8 rounded-full bg-orange-500/20 border border-orange-400/50 flex items-center justify-center text-orange-300 shadow-md shadow-orange-500/20 backdrop-blur-md animate-pulse">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Dead-Center Wealth Core and Text (100% Horizontally & Vertically Centered) */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center max-w-lg px-4 mx-auto my-auto">
        {/* Glowing Center Coin */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-5">
          {/* Radial Light Halo */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 blur-2xl transition-all duration-700 ${
              phase === "gathering"
                ? "scale-150 opacity-100"
                : phase === "burst"
                ? "scale-175 opacity-90"
                : "scale-100 opacity-60"
            }`}
          />

          {/* Rotating Ring */}
          <div
            className="absolute -inset-3 rounded-full border-2 border-orange-500/30 border-t-amber-300 border-r-emerald-400 animate-spin"
            style={{ animationDuration: "3s" }}
          />

          {/* 3D Flowoid Main Coin */}
          <div
            className={`relative h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-amber-200 via-orange-500 to-amber-600 p-[3px] shadow-2xl shadow-orange-500/50 transition-transform duration-500 ${
              phase === "burst" ? "scale-110" : "scale-100"
            } animate-coin-spin`}
          >
            <div className="h-full w-full rounded-full bg-[#0F121C] flex flex-col items-center justify-center border border-amber-300/50 relative overflow-hidden">
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-white/20 rounded-full blur-md" />
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-orange-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-mono">
                  $
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-orange-400 font-mono -mt-1">
                  FLOWOID
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Readout Status & Progress Bar (Strictly Centered) */}
        <div className="space-y-3 w-full flex flex-col items-center">
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-xs font-semibold text-orange-400 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span className="tracking-wider uppercase font-mono text-[11px]">
              FLOWOID AI WEALTH ENGINE
            </span>
          </div>

          {/* Dynamic Cycling Message */}
          <p className="text-base sm:text-lg font-semibold text-white tracking-tight h-7 transition-all duration-300 text-center">
            {statusMessages[messageIndex] || text}
          </p>

          {/* Progress Percent */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono w-64 sm:w-80 px-1">
            <span className="text-slate-500">
              {phase === "gathering" ? "CONVERGING WALLETS..." : "ANALYZING ASSETS..."}
            </span>
            <span className="text-orange-400 font-bold font-mono">
              {progress}%
            </span>
          </div>

          {/* Centered Progress Bar */}
          <div className="w-64 sm:w-80 h-2 bg-white/[0.08] rounded-full overflow-hidden p-[1px] border border-white/[0.08]">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/40"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Security & Live Tags */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3 w-3" /> End-to-End Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Zap className="h-3 w-3" /> Real-time Sync
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowoidLoader;
