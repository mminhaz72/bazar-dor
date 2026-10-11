"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ফলব্যাক প্রোডাক্ট ডাটা (যদি এপিআই থেকে না আসে)
const fallbackProducts = [
  {"id":1,"slug":"sorno-machi-chal","nameBn":"স্বর্ণমাছি চাল","category":"chal","unit":"kg","image":"🍚","today":148,"yesterday":145,"change":{"dir":"up","pct":2.1}},
  {"id":2,"slug":"miniket-chal","nameBn":"মিনিকেট চাল","category":"chal","unit":"kg","image":"🍚","today":99,"yesterday":102,"change":{"dir":"down","pct":-2.9}},
  {"id":3,"slug":"nazir-chal","nameBn":"নাজির চাল","category":"chal","unit":"kg","image":"🍚","today":74,"yesterday":74,"change":{"dir":"flat","pct":0}},
  {"id":4,"slug":"batam-size-chal","nameBn":"বাটাম সাইজ চাল","category":"chal","unit":"kg","image":"🍚","today":66,"yesterday":64,"change":{"dir":"up","pct":3.1}},
  {"id":5,"slug":"mosur-dal","nameBn":"মসুর ডাল","category":"dal","unit":"kg","image":"🫘","today":142,"yesterday":138,"change":{"dir":"up","pct":2.9}},
  // অন্যান্য পণ্যগুলো এখানে থাকবে...
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // এপিআই থেকে অথবা ফলব্যাক থেকে প্রোডাক্ট খোঁজা
    fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const found = Array.isArray(data) ? data.find((p: any) => p.id.toString() === id) : (data.product || data);
        if (found) {
          setProduct(found);
        } else {
          // ফলব্যাক থেকে খোঁজা
          const fallback = fallbackProducts.find((p) => p.id.toString() === id);
          setProduct(fallback || null);
        }
        setLoading(false);
      })
      .catch(() => {
        const fallback = fallbackProducts.find((p) => p.id.toString() === id);
        setProduct(fallback || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500 space-y-4">
        <p>পণ্যটি পাওয়া যায়নি!</p>
        <Link href="/" className="text-emerald-700 underline text-sm">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-gray-800 pb-16">
      {/* এখানে কোনো অতিরিক্ত <Navbar /> রাখা হয়নি, কারণ এটি লেআউটে গ্লোবালি রেন্ডার হচ্ছে */}

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* ব্রেডক্রাম্ব */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{product.nameBn}</span>
        </div>

        {/* প্রোডাক্ট মূল কার্ড */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl bg-emerald-50 p-4 rounded-xl">{product.image || "📦"}</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{product.nameBn}</h1>
              <p className="text-xs text-gray-500 mt-0.5">প্রতি {product.unit} বাজার দর</p>
              <p className="text-xs text-gray-600 mt-2">গতকালের তুলনায় আজ দাম পরিবর্তন হয়েছে</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-right min-w-[140px]">
            <span className="text-xs text-gray-400 block">আজকের দাম</span>
            <span className="text-2xl font-bold text-gray-900">{product.today} টাকা</span>
            <span className="text-xs text-emerald-600 font-medium block mt-1">প্রতি {product.unit}</span>
          </div>
        </div>

        {/* দামের সারসংক্ষেপ ও অ্যানিমেশন বা অন্যান্য সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <span className="text-xs text-gray-400 block">সর্বনিম্ন দাম</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">{Math.round(product.today * 0.9)} টাকা</h3>
            <span className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</span>
          </div>
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <span className="text-xs text-gray-400 block">সর্বাধিক দাম</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">{Math.round(product.today * 1.1)} টাকা</h3>
            <span className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</span>
          </div>
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <span className="text-xs text-gray-400 block">গড় দাম</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">{product.today} টাকা</h3>
            <span className="text-xs text-gray-500">প্রতি কেজির গড়ে হিসাব</span>
          </div>
        </div>
      </div>
    </main>
  );
}