import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "WeWork Finder — All Access Basic",
  description:
    "Discover WeWork locations available to All Access Basic members across the US. Browse amenities, read reviews, and find your next workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-navy text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 py-6 text-center text-white/30 text-xs">
          WeWork Finder is an independent tool for All Access Basic members. Not affiliated with WeWork.
        </footer>
      </body>
    </html>
  );
}
