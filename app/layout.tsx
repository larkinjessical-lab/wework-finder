import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
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
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ww-white text-ww-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-ww-border py-6 text-center text-ww-gray text-xs">
          WeWork Finder is an independent tool for All Access Basic members. Not affiliated with WeWork.
        </footer>
      </body>
    </html>
  );
}
