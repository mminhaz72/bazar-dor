"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";

const categoryInfoMap: Record<string, { nameBn: string; desc: string; icon: string }> = {
  chal: { nameBn: "চাল", desc: "এই বাজার চালের দাম ও পরিমাপ", icon: "🍚" },
  dal: { nameBn: "ডাল", desc: "বিভিন্ন প্রকার ডালের বাজার দর ও তথ্য", icon: "🥣" },
  tel: { nameBn: "তেল", desc: "ভোজ্যতেল ও সরিষার তেলের বাজার দর", icon: "🛢️" },
  sobji: { nameBn: "সবজি", desc: "তাজা শাকসবজির পাইকারি ও খুচরা দর", icon: "🥬" },
  mach: { nameBn: "মাছ", desc: "নদী ও সমুদ্রের টাটকা মাছের দাম", icon: "🐟" },
  mangsho: { nameBn: "মাংস", desc: "গরু, খাসি, মুরগি ও হাঁসের মাংসের বাজার দর", icon: "🥩" },
  "dim-dui": { nameBn: "ডিম ও দুধ", desc: "ডিম, দুধ ও দুধজাত পণ্যের দাম", icon: "🥚" },
  mosla: { nameBn: "মসলা", desc: "দৈনিক রান্নার প্রয়োজনীয় মসলার দাম", icon: "🌶️" },
};

const allProducts = [
  { id: 1, slug: "sorno-machi-chal", nameBn: "স্বর্ণমাছি চাল", category: "chal", unit: "kg", image: "", todayPrice: 148, change: "+২.১%", trend: "up" },
  { id: 2, slug: "miniket-chal", nameBn: "মিনিকেট চাল", category: "chal", unit: "kg", image: "", todayPrice: 99, change: "▼ ২.৯%", trend: "down" },
  { id: 3, slug: "nazir-chal", nameBn: "নাজির চাল", category: "chal", unit: "kg", image: "", todayPrice: 74, change: "• ০%", trend: "stable" },
  { id: 4, slug: "batam-chal", nameBn: "বাটাম সাইজ চাল", category: "chal", unit: "kg", image: "", todayPrice: 66, change: "▲ ৩.১%", trend: "up" },
  { id: 5, slug: "moshur-dal", nameBn: "মসুর ডাল", category: "dal", unit: "kg", image: "", todayPrice: 142, change: "▲ ২.৯%", trend: "up" },
  { id: 6, slug: "sorisha-tel", nameBn: "সরিষার তেল", category: "tel", unit: "litre", image: "", todayPrice: 192, change: "▲ ২.১%", trend: "up" },
  { id: 7, slug: "alu", nameBn: "আলু", category: "sobji", unit: "kg", image: "", todayPrice: 30, change: "▼ ৬.২%", trend: "down" },
  { id: 8, slug: "peyaj", nameBn: "পেঁয়াজ", category: "sobji", unit: "kg", image: "", todayPrice: 54, change: "▲ ১২.৫%", trend: "up" },
];

function CategoryContent() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "chal";

  const categoryInfo = categoryInfoMap[slug] || {
    nameBn: "বাজার দর",
    desc: "প্রয়োজনীয় পণ্যের বাজার মূল্য",
    icon: "🛒",
  };

  const filteredProducts = allProducts.filter((p) => p.category === slug);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* Category Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex items-center gap-4">
          <span className="text-4xl">{categoryInfo.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{categoryInfo.nameBn}</h1>
            <p className="text-gray-600 text-sm mt-1">{categoryInfo.desc}</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{product.nameBn}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      product.trend === "up" ? "bg-red-50 text-red-600" : product.trend === "down" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {product.change}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xl font-bold text-emerald-600">{product.todayPrice} টাকা <span className="text-xs text-gray-500 font-normal">/{product.unit}</span></span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>}>
      <CategoryContent />
    </Suspense>
  );
}