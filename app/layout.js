import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flowoid",
  description:
    "A modern expense tracker app built with Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClerkProvider>
          <Header />

          <main className="min-h-screen">
            {children}
          </main>

          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with ❤️ by Flowoid</p>
            </div>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  );
}