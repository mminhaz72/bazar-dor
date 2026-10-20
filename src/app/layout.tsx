import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-gray-800 flex flex-col min-h-screen`}>
        {/* গ্লোবাল নেভবার */}
        <Navbar />
        
        {/* গ্লোবাল অ্যানিমেটেড প্রাইস টিকার (এককভাবে কাজ করবে) */}
        <PriceTicker />
        
        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto py-6">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2 text-center md:text-left">
            <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
            <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
          </div>
        </footer>
      </body>
    </html>
  );
}