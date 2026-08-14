import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flowoid",
  description:
    "A modern expense tracker app built with Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        {/* header */}
        {children}
        {/* footer */}
      </body>
    </html>
  );
}
