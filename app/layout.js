import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flowoid",
  description:
    "A modern expense tracker app built with Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body className="bg-[#090A0F] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-orange-500/20 selection:text-orange-300">
        <ClerkProvider>
          <Header />

          <main className="flex-1">
            {children}
          </main>
          <Toaster richColors theme="dark" position="bottom-right" />
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
        </ClerkProvider>
      </body>
    </html>
  );
}