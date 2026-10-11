"use client";
export const dynamic = 'force-dynamic';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const categoryInfoMap: Record<string, { nameBn: string; desc: string; icon: string }> = {
  chal: { nameBn: "চাল", desc: "এই বাজার চালের দাম ও পরিমাণ", icon: "🍚" },
  dal: { nameBn: "ডাল", desc: "বিভিন্ন প্রকার ডালের বাজার দর ও তথ্য", icon: "🫘" },
  tel: { nameBn: "তেল", desc: "ভোজ্যতেল ও সরিষার তেলের বাজার দর", icon: "🛢️" },
  sobji: { nameBn: "সবজি", desc: "তাজা শাকসবজির পাইকারি ও খুচরা দর", icon: "🥔" },
  mach: { nameBn: "মাচ", desc: "নদী ও সমুদ্রের টাটকা মাছের দাম", icon: "🐟" },
  mangsho: { nameBn: "মাংস", desc: "গরু, খাসি, মুরগি ও হাঁসের মাংসের বাজার দর", icon: "🍗" },
  "dim-dui": { nameBn: "ডিম-দুধ", desc: "ডিম, দুধ ও দুধজাত পণ্যের দাম", icon: "🥚" },
  mosla: { nameBn: "মসলা", desc: "দৈনিক রান্নার প্রয়োজনীয় মসলার দাম", icon: "🫚" },
};

const allProducts = [
  {"id":1,"slug":"sorno-machi-chal","nameBn":"স্বর্ণমাছি চাল","category":"chal","unit":"kg","image":"🍚","today":148,"yesterday":145,"change":{"dir":"up","pct":2.1}},
  {"id":2,"slug":"miniket-chal","nameBn":"মিনিকেট চাল","category":"chal","unit":"kg","image":"🍚","today":99,"yesterday":102,"change":{"dir":"down","pct":-2.9}},
  {"id":3,"slug":"nazir-chal","nameBn":"নাজির চাল","category":"chal","unit":"kg","image":"🍚","today":74,"yesterday":74,"change":{"dir":"flat","pct":0}},
  {"id":4,"slug":"batam-size-chal","nameBn":"বাটাম সাইজ চাল","category":"chal","unit":"kg","image":"🍚","today":66,"yesterday":64,"change":{"dir":"up","pct":3.1}},
  {"id":5,"slug":"mosur-dal","nameBn":"মসুর ডাল","category":"dal","unit":"kg","image":"🫘","today":142,"yesterday":138,"change":{"dir":"up","pct":2.9}},
  {"id":6,"slug":"mug-dal","nameBn":"মুগ ডাল","category":"dal","unit":"kg","image":"🫘","today":135,"yesterday":135,"change":{"dir":"flat","pct":0}},
  {"id":7,"slug":"chola-dal","nameBn":"ছোলা","category":"dal","unit":"kg","image":"🫘","today":120,"yesterday":123,"change":{"dir":"down","pct":-2.4}},
  {"id":8,"slug":"aman-dal-khosasila","nameBn":"আমন ডাল (খোসাসিলা)","category":"dal","unit":"kg","image":"🫘","today":156,"yesterday":152,"change":{"dir":"up","pct":2.6}},
  {"id":9,"slug":"sorishar-tel","nameBn":"সরিষার তেল","category":"tel","unit":"litre","image":"🛢️","today":192,"yesterday":188,"change":{"dir":"up","pct":2.1}},
  {"id":10,"slug":"pam-tel","nameBn":"পাম তেল","category":"tel","unit":"kg","image":"🛢️","today":168,"yesterday":172,"change":{"dir":"down","pct":-2.3}},
  {"id":11,"slug":"ghani-banga-sorishar-tel","nameBn":"ঘানি ভাঙা সরিষার তেল","category":"tel","unit":"litre","image":"🛙","today":215,"yesterday":210,"change":{"dir":"up","pct":2.4}},
  {"id":12,"slug":"alu","nameBn":"আলু","category":"sobji","unit":"kg","image":"🥔","today":30,"yesterday":32,"change":{"dir":"down","pct":-6.2}},
  {"id":13,"slug":"peyaj","nameBn":"পেঁয়াজ","category":"sobji","unit":"kg","image":"🧅","today":54,"yesterday":48,"change":{"dir":"up","pct":12.5}},
  {"id":14,"slug":"kaccha-moric","nameBn":"কাঁচামরিচ","category":"sobji","unit":"kg","image":"🌶️","today":92,"yesterday":105,"change":{"dir":"down","pct":-12.4}},
  {"id":15,"slug":"begun","nameBn":"বেগুন","category":"sobji","unit":"kg","image":"🍆","today":44,"yesterday":42,"change":{"dir":"up","pct":4.8}},
  {"id":16,"slug":"dhenders","nameBn":"ঢেঁড়স","category":"sobji","unit":"kg","image":"🟢","today":38,"yesterday":38,"change":{"dir":"flat","pct":0}},
  {"id":17,"slug":"rui-mach","nameBn":"রুই মাছ","category":"mach","unit":"kg","image":"🐟","today":46,"yesterday":44,"change":{"dir":"up","pct":4.5}},
  {"id":18,"slug":"telapiya-mach","nameBn":"তেলাপিয়া","category":"mach","unit":"kg","image":"🐟","today":36,"yesterday":36,"change":{"dir":"flat","pct":0}},
  {"id":19,"slug":"ilish-mach","nameBn":"ইলিশ মাছ","category":"mach","unit":"kg","image":"🐠","today":1850,"yesterday":1790,"change":{"dir":"up","pct":3.4}},
  {"id":20,"slug":"katla-mach","nameBn":"কাতলা মাছ","category":"mach","unit":"kg","image":"🐠","today":43,"yesterday":45,"change":{"dir":"down","pct":-4.4}},
  {"id":21,"slug":"chingri-mach","nameBn":"চিংড়ি মাছ (খোলা)","category":"mach","unit":"kg","image":"🦐","today":330,"yesterday":320,"change":{"dir":"up","pct":3.1}},
  {"id":22,"slug":"murgi-r-mangsho","nameBn":"মুরগির মাংস","category":"mangsho","unit":"kg","image":"🍗","today":225,"yesterday":228,"change":{"dir":"down","pct":-1.3}},
  {"id":23,"slug":"goru-r-mangsho","nameBn":"গরুর মাংস","category":"mangsho","unit":"kg","image":"🥩","today":790,"yesterday":800,"change":{"dir":"down","pct":-1.2}},
  {"id":24,"slug":"khasir-mangsho","nameBn":"খাসির মাংস","category":"mangsho","unit":"kg","image":"🍖","today":1290,"yesterday":1330,"change":{"dir":"down","pct":-3}},
  {"id":25,"slug":"hanser-mangsho","nameBn":"হাঁসের মাংস","category":"mangsho","unit":"kg","image":"🦆","today":285,"yesterday":295,"change":{"dir":"down","pct":-3.4}},
  {"id":26,"slug":"dim","nameBn":"ডিম","category":"dim-dui","unit":"dozen","image":"🥚","today":158,"yesterday":152,"change":{"dir":"up","pct":3.9}},
  {"id":27,"slug":"dui-dudh","nameBn":"দুধ","category":"dim-dui","unit":"litre","image":"🥛","today":102,"yesterday":100,"change":{"dir":"up","pct":2}},
  {"id":28,"slug":"doi","nameBn":"দই","category":"dim-dui","unit":"litre","image":"🥣","today":92,"yesterday":92,"change":{"dir":"flat","pct":0}},
  {"id":29,"slug":"mokhhan","nameBn":"মাখন (১০০ গ্রাম)","category":"dim-dui","unit":"piece","image":"🧈","today":145,"yesterday":140,"change":{"dir":"up","pct":3.6}},
  {"id":30,"slug":"ada","nameBn":"আদা","category":"mosla","unit":"kg","image":"🫚","today":85,"yesterday":78,"change":{"dir":"up","pct":9}},
  {"id":31,"slug":"roshun","nameBn":"রসুন","category":"mosla","unit":"kg","image":"🧄","today":125,"yesterday":135,"change":{"dir":"down","pct":-7.4}},
  {"id":32,"slug":"morich-gunda","nameBn":"মরিচ গুঁড়া","category":"mosla","unit":"kg","image":"🌶️","today":245,"yesterday":250,"change":{"dir":"down","pct":-2}},
  {"id":33,"slug":"dhanepata-gunda","nameBn":"ধনেপাতা গুঁড়া","category":"mosla","unit":"kg","image":"🍃","today":265,"yesterday":265,"change":{"dir":"flat","pct":0}}
];

export default function CategoryPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "chal";

  const categoryInfo = categoryInfoMap[slug] || {
    nameBn: "অন্যান্য",
    desc: "নির্বাচিত ক্যাটাগরির পণ্যের বাজার দর",
    icon: "📦",
  };

  const filteredProducts = allProducts.filter((p) => p.category === slug);

  return (
    <main className="min-h-screen bg-slate-50 text-gray-800 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* ব্রেডক্রাম্ব */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{categoryInfo.nameBn}</span>
        </div>

        {/* ক্যাটাগরি হেডার ব্যানার */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <span className="text-4xl bg-emerald-50 p-4 rounded-xl">{categoryInfo.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{categoryInfo.nameBn}</h1>
            <p className="text-xs text-gray-500 mt-0.5">{categoryInfo.desc}</p>
          </div>
        </div>

        {/* পণ্যের তালিকা */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700">এই শ্রেণীর পণ্যসমূহ</h2>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 py-8 text-center bg-white rounded-xl border">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function ProductCard({ item }: { item: any }) {
  const isUp = item.change?.dir === "up";
  const isDown = item.change?.dir === "down";
  const pct = item.change?.pct ? Math.abs(item.change.pct) : 0;

  return (
    <Link
      href={`/product/${item.id}`}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{item.image || "📦"}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{item.nameBn}</h3>
            <span className="text-xs text-gray-500">প্রতি {item.unit}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block">আজকের দাম</span>
          <span className="font-bold text-gray-900">{item.today} টাকা</span>
        </div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-md ${
            isUp ? "bg-red-50 text-red-600" : isDown ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? `▲ ${pct}%` : isDown ? `▼ ${pct}%` : "• ০%"}
        </span>
      </div>
    </Link>
  );
}