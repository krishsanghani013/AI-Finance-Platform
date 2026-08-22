"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  CreditCard,
  Receipt,
  Plus,
  Sparkles,
  TrendingUp,
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Layers,
  Compass,
  DollarSign,
  ScanLine,
  Building,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateAccountDrawer } from "@/components/create-account-drawer";

export function AppSidebar({ initialAccounts = [] }) {
  const pathname = usePathname();
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountsOpen, setAccountsOpen] = useState(true);
  const [accounts, setAccounts] = useState(initialAccounts);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Sync initial accounts
  useEffect(() => {
    if (initialAccounts?.length > 0) {
      setAccounts(initialAccounts);
    }
  }, [initialAccounts]);

  const defaultAccount = accounts?.find((acc) => acc.isDefault) || accounts?.[0];

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Transactions",
      href: defaultAccount ? `/account/${defaultAccount.id}` : "/dashboard",
      icon: Receipt,
      badge: "Ledger",
    },
    {
      label: "Add Transaction",
      href: "/transaction/create",
      icon: Plus,
      badge: "AI Scan",
      highlight: true,
    },
  ];

  return (
    <>
      {/* Mobile Top Bar with Hamburger Trigger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#090A0F]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Image
            src="/Flowoid_icon_cropped.png"
            alt="Flowoid"
            width={30}
            height={30}
            className="h-7 w-7 object-contain"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold text-white tracking-tight">Flowoid</span>
            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
              AI
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/transaction/create">
            <Button
              size="sm"
              className="h-8 px-3 text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium shadow-md shadow-orange-500/20"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              <span>Add</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="h-9 w-9 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Main Sidebar Container (Desktop: Fixed Left, Mobile: Slide-out drawer) */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50
          w-64 lg:w-72
          bg-[#0B0D14] border-r border-white/[0.08]
          flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Top Header & Brand */}
        <div className="p-4 sm:p-5 flex flex-col gap-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/Flowoid_icon_cropped.png"
                alt="Flowoid Icon"
                width={34}
                height={34}
                className="h-8 w-8 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-orange-300 transition-colors">
                  Flowoid
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  AI
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Quick Action Button */}
          <Link href="/transaction/create" className="w-full">
            <Button className="w-full h-10 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 border-0 flex items-center justify-center gap-2 group transition-all">
              <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
              <span>Add Transaction</span>
              <ScanLine className="h-3.5 w-3.5 opacity-70 ml-auto" />
            </Button>
          </Link>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {/* Main Menu Links */}
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
              Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href) ||
                    (item.label === "Transactions" && pathname.startsWith("/account/"));

              return (
                <Link key={item.label} href={item.href} className="block">
                  <div
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group
                      ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500/15 to-amber-500/10 text-white border border-orange-500/30 shadow-sm"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`h-4 w-4 transition-colors ${
                          isActive
                            ? "text-orange-400"
                            : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`
                          text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold
                          ${
                            isActive
                              ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                              : "bg-white/[0.04] text-slate-500 group-hover:text-slate-400"
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Accounts Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 pb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Accounts ({accounts?.length || 0})
              </span>
              <CreateAccountDrawer>
                <button
                  type="button"
                  className="text-slate-400 hover:text-orange-400 p-1 rounded-md hover:bg-white/[0.04] transition-colors cursor-pointer"
                  title="Create new account"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </CreateAccountDrawer>
            </div>

            {accounts?.length > 0 ? (
              <div className="space-y-1">
                {accounts.map((acc) => {
                  const isAccActive = pathname === `/account/${acc.id}`;
                  const formattedBalance = parseFloat(acc.balance || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });

                  return (
                    <Link key={acc.id} href={`/account/${acc.id}`} className="block">
                      <div
                        className={`
                          flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all group
                          ${
                            isAccActive
                              ? "bg-[#141824] text-white border border-white/10"
                              : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                          }
                        `}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`
                              h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0
                              ${
                                acc.type === "SAVINGS"
                                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                  : "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                              }
                            `}
                          >
                            {acc.type === "SAVINGS" ? "S" : "C"}
                          </div>
                          <div className="truncate">
                            <p className="font-medium text-slate-200 truncate group-hover:text-white">
                              {acc.name}
                            </p>
                            <p className="text-[10px] text-slate-500 capitalize">
                              {acc.type.toLowerCase()}
                            </p>
                          </div>
                        </div>

                        <span className="font-mono text-xs font-semibold text-slate-300 shrink-0 ml-2 group-hover:text-orange-300">
                          ${formattedBalance}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="px-3 py-2 text-xs text-slate-500 italic">
                No accounts created yet.
              </div>
            )}

            <CreateAccountDrawer>
              <button
                type="button"
                className="w-full mt-1.5 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-dashed border-white/10 hover:border-orange-500/40 text-xs font-medium text-slate-400 hover:text-orange-400 transition-all cursor-pointer hover:bg-orange-500/[0.03]"
              >
                <Plus className="h-3 w-3" />
                <span>Add Account</span>
              </button>
            </CreateAccountDrawer>
          </div>

          {/* AI Intelligence Health Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#121520] to-[#0D0F17] border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-white tracking-tight">AI Wealth Engine</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2.5 leading-relaxed">
              Predictive cashflow trajectory is calibrated and running.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/[0.06]">
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Encrypted
              </span>
              <span className="text-orange-400 font-semibold">92% Optimal</span>
            </div>
          </div>
        </div>

        {/* User Profile & Account Footer */}
        <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#090A0F]/80">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-2.5 min-w-0">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8 ring-1 ring-orange-500/30",
                    card: "bg-[#12151F] border border-white/10 text-white shadow-2xl",
                  },
                }}
              />
              <div className="truncate text-left">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.fullName || user?.firstName || "Account"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.primaryEmailAddress?.emailAddress || "Flowoid User"}
                </p>
              </div>
            </div>

            <div className="h-2 w-2 rounded-full bg-emerald-400" title="Connected" />
          </div>
        </div>
      </aside>
    </>
  );
}

export default AppSidebar;
