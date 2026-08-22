import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingEntranceLoader } from "@/components/landing-entrance-loader";
import {
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="pt-20 pb-12 space-y-24 sm:space-y-32">
        {/* Cinematic Website Entrance Loader */}
        <LandingEntranceLoader />

        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Key Metrics & Stats Section */}
        <section className="border-y border-white/[0.06] bg-[#0B0D14]/90 py-12 sm:py-16 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-all group"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-amber-400 mb-1.5 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Core Features Section */}
        <section id="features" className="container mx-auto px-4 sm:px-6 max-w-6xl scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400 mb-3">
              <Sparkles className="h-3 w-3" /> Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Everything you need to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                dominate your wealth
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Intelligent automation, crystal clear visualizations, and automated categorizations designed to give you unfair financial control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="bg-[#12151F] border border-white/[0.08] hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 group flex flex-col justify-between"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-[#181C2A] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
                      {feature.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. How It Works Section */}
        <section className="border-y border-white/[0.06] bg-[#0B0D14]/70 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
                <Zap className="h-3 w-3" /> Seamless Setup
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Financial mastery in 3 simple steps
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Get up and running in less than 2 minutes without tedious spreadsheets or complex setups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {howItWorksData.map((step, index) => (
                <div
                  key={index}
                  className="relative p-6 sm:p-7 rounded-2xl bg-[#12151F] border border-white/[0.08] hover:border-amber-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="text-3xl font-extrabold font-mono text-white/20 group-hover:text-orange-500/40 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Testimonials Section */}
        <section id="testimonials" className="container mx-auto px-4 sm:px-6 max-w-6xl scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
              <Star className="h-3 w-3 fill-emerald-400" /> User Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Loved by ambitious individuals
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Discover how Flowoid has transformed financial management for users worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-[#12151F] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between hover:border-white/15 transition-all shadow-lg shadow-black/30"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-orange-500/30"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. Call to Action Section (Replaced blue-600 block with luxury glowing CTA) */}
        <section className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#151824] via-[#10131E] to-[#0A0C13] border border-orange-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
            {/* Ambient ember background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Ready to take total control of your money?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Join thousands of users who track expenses in red, grow income in green, and master their financial trajectory with Flowoid AI.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 h-12 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-xl shadow-orange-500/30 border-0 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <span>Get Started for Free</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Free Tier Available
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> No Credit Card Required
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Landing Footer */}
      <footer className="border-t border-white/[0.07] bg-[#0B0D14]/80 py-8 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="font-semibold text-slate-200">Flowoid AI</span>
            <span>• Intelligent Financial Management</span>
          </div>
          <p className="text-slate-500">Made with ❤️ for financial clarity</p>
        </div>
      </footer>
    </>
  );
}
