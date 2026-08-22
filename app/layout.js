import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
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
          <main className="flex-1">
            {children}
          </main>
          <Toaster richColors theme="dark" position="bottom-right" />
        </ClerkProvider>
      </body>
    </html>
  );
}