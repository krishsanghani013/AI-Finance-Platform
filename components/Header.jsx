import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[0.08] bg-[#090A0F]/80 backdrop-blur-xl transition-all">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/Flowoid_icon_cropped.png"
            alt="Flowoid Icon"
            width={36}
            height={36}
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain group-hover:scale-105 transition-transform duration-200"
            priority
          />
          <div className="flex items-center gap-1.5">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-orange-300 transition-colors">
              Flowoid
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30">
              AI
            </span>
          </div>
        </Link>

        {/* Navigation Links - Signed Out */}
        <div className="hidden items-center space-x-8 md:flex">
          <Show when="signed-out">
            <a
              href="#features"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-orange-400"
            >
              Features
            </a>

            <a
              href="#testimonials"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-orange-400"
            >
              Testimonials
            </a>
          </Show>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">

          {/* Signed In */}
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.08] hover:text-white hover:border-orange-500/40 transition-all rounded-xl text-xs sm:text-sm h-9"
              >
                <LayoutDashboard size={16} className="text-orange-400" />
                <span className="hidden sm:inline">
                  Dashboard
                </span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-md shadow-orange-500/20 border-0 rounded-xl text-xs sm:text-sm h-9">
                <PenBox size={16} />
                <span className="hidden sm:inline">
                  Add Transaction
                </span>
              </Button>
            </Link>

            <div className="pl-1">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9 ring-2 ring-orange-500/30 hover:ring-orange-500/60 transition-all",
                    card: "bg-[#12151F] border border-white/10 text-white shadow-2xl",
                  },
                }}
              />
            </div>
          </Show>

          {/* Signed Out */}
          <Show when="signed-out">
            <SignInButton fallbackRedirectUrl="/dashboard">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-xl h-9 px-5">
                Login
              </Button>
            </SignInButton>
          </Show>

        </div>
      </nav>
    </header>
  );
};

export default Header;