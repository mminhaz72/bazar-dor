"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 text-gray-800 flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
          <div className="text-6xl">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900">পেজটি পাওয়া যায়নি</h1>
          <p className="text-sm text-gray-500">
            আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-3 rounded-xl transition text-sm shadow-sm"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
      </footer>
    </main>
  );
}