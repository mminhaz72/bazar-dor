"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useParams } from "next/navigation";

const categoryInfoMap: Record<string, { nameBn: string; desc: string; icon: string }> = {
  chal: { nameBn: "চাল", desc: "এই বাজার চালের দাম ও পরিমাপ", icon: "🍚" },
  dal: { nameBn: "ডাল", desc: "বিভিন্ন প্রকার ডালের বাজার দর ও তথ্য", icon: "🥣" },
  tel: { nameBn: "তেল", desc: "ভোজ্যতেল ও সরিষার তেলের বাজার দর", icon: "🛢️" },
  sobji: { nameBn: "সবজি", desc: "তাজা শাকসবজির পাইকারি ও খুচরা দর", icon: "🥬" },
  mach: { nameBn: "মাছ", desc: "নদী ও সমুদ্রের টাটকা মাছের দাম", icon: "🐟" },
  mangsho: { nameBn: "মাংস", desc: "গরু, খাসি, মুরগি ও হাঁসের মাংসের বাজার দর", icon: "🥩" },
  "dim-dui": { nameBn: "ডিম ও দুধ", desc: "ডিম, দুধ ও দুধজাত পণ্যের দাম", icon: "🥚" },
  mosla: { nameBn: "মসলা", desc: "দৈনিক রান্নার প্রয়োজনীয় মসলার দাম", icon: "🌶️" },
};

const allProducts = [
  {"id":1,"slug":"sorno-machi-chal","nameBn":"স্বর্ণমাছি চাল","category":"chal","categoryNameBn":"চাল","categoryIcon":"🍚","unit":"kg","image":"🍚","today":148,"yesterday":145,"lastWeek":142,"lastMonth":138,"change":{"dir":"up","pct":2.1}},
  {"id":2,"slug":"miniket-chal","nameBn":"মিনিকেট চাল","category":"chal","categoryNameBn":"চাল","categoryIcon":"🍚","unit":"kg","image":"🍚","today":99,"yesterday":102,"lastWeek":105,"lastMonth":100,"change":{"dir":"down","pct":-2.9}},
  {"id":3,"slug":"nazir-chal","nameBn":"নাজির চাল","category":"chal","categoryNameBn":"চাল","categoryIcon":"🍚","unit":"kg","image":"🍚","today":74,"yesterday":74,"lastWeek":72,"lastMonth":70,"change":{"dir":"flat","pct":0}},
  {"id":4,"slug":"batam-size-chal","nameBn":"বাটাম সাইজ চাল","category":"chal","categoryNameBn":"চাল","categoryIcon":"🍚","unit":"kg","image":"🍚","today":66,"yesterday":64,"lastWeek":63,"lastMonth":61,"change":{"dir":"up","pct":3.1}},
  {"id":5,"slug":"mosur-dal","nameBn":"মসুর ডাল","category":"dal","categoryNameBn":"ডাল","categoryIcon":"🫘","unit":"kg","image":"🫘","today":142,"yesterday":138,"lastWeek":135,"lastMonth":132,"change":{"dir":"up","pct":2.9}},
  {"id":6,"slug":"mug-dal","nameBn":"মুগ ডাল","category":"dal","categoryNameBn":"ডাল","categoryIcon":"🫘","unit":"kg","image":"🫘","today":135,"yesterday":135,"lastWeek":130,"lastMonth":128,"change":{"dir":"flat","pct":0}},
  {"id":7,"slug":"chola-dal","nameBn":"ছোলা","category":"dal","categoryNameBn":"ডাল","categoryIcon":"🫘","unit":"kg","image":"🫘","today":120,"yesterday":123,"lastWeek":122,"lastMonth":118,"change":{"dir":"down","pct":-2.4}},
  {"id":8,"slug":"aman-dal-khosasila","nameBn":"আমন ডাল (খোসাসিলা)","category":"dal","categoryNameBn":"ডাল","categoryIcon":"🫘","unit":"kg","image":"🫘","today":156,"yesterday":152,"lastWeek":148,"lastMonth":145,"change":{"dir":"up","pct":2.6}},
  {"id":9,"slug":"sorishar-tel","nameBn":"সরিষার তেল","category":"tel","categoryNameBn":"তেল","categoryIcon":"🛢️","unit":"litre","image":"🫙","today":192,"yesterday":188,"lastWeek":184,"lastMonth":180,"change":{"dir":"up","pct":2.1}},
  {"id":10,"slug":"pam-tel","nameBn":"পাম তেল","category":"tel","categoryNameBn":"তেল","categoryIcon":"🛢️","unit":"kg","image":"🛢️","today":168,"yesterday":172,"lastWeek":175,"lastMonth":178,"change":{"dir":"down","pct":-2.3}},
  {"id":11,"slug":"ghani-banga-sorishar-tel","nameBn":"ঘানি ভাঙা সরিষার তেল","category":"tel","categoryNameBn":"তেল","categoryIcon":"🛢️","unit":"litre","image":"🛙","today":215,"yesterday":210,"lastWeek":198,"lastMonth":195,"change":{"dir":"up","pct":2.4}},
  {"id":12,"slug":"alu","nameBn":"আলু","category":"sobji","categoryNameBn":"সবজি","categoryIcon":"🥬","unit":"kg","image":"🥔","today":30,"yesterday":32,"lastWeek":34,"lastMonth":36,"change":{"dir":"down","pct":-6.2}},
  {"id":13,"slug":"peyaj","nameBn":"পেঁয়াজ","category":"sobji","categoryNameBn":"সবজি","categoryIcon":"🥬","unit":"kg","image":"🧅","today":54,"yesterday":48,"lastWeek":45,"lastMonth":60,"change":{"dir":"up","pct":12.5}},
  {"id":14,"slug":"kaccha-moric","nameBn":"কাঁচামরিচ","category":"sobji","categoryNameBn":"সবজি","categoryIcon":"🥬","unit":"kg","image":"🌶️","today":92,"yesterday":105,"lastWeek":120,"lastMonth":140,"change":{"dir":"down","pct":-12.4}},
  {"id":15,"slug":"begun","nameBn":"বেগুন","category":"sobji","categoryNameBn":"সবজি","categoryIcon":"🥬","unit":"kg","image":"🍆","today":44,"yesterday":42,"lastWeek":40,"lastMonth":45,"change":{"dir":"up","pct":4.8}},
  {"id":16,"slug":"dhenders","nameBn":"ঢেঁড়স","category":"sobji","categoryNameBn":"সবজি","categoryIcon":"🥬","unit":"kg","image":"🟢","today":38,"yesterday":38,"lastWeek":36,"lastMonth":35,"change":{"dir":"flat","pct":0}},
  {"id":17,"slug":"rui-mach","nameBn":"রুই মাছ","category":"mach","categoryNameBn":"মাছ","categoryIcon":"🐟","unit":"kg","image":"🐟","today":46,"yesterday":44,"lastWeek":42,"lastMonth":40,"change":{"dir":"up","pct":4.5}},
  {"id":18,"slug":"telapiya-mach","nameBn":"তেলাপিয়া","category":"mach","categoryNameBn":"মাছ","categoryIcon":"🐟","unit":"kg","image":"🐟","today":36,"yesterday":36,"lastWeek":35,"lastMonth":34,"change":{"dir":"flat","pct":0}},
  {"id":19,"slug":"ilish-mach","nameBn":"ইলিশ মাছ","category":"mach","categoryNameBn":"মাছ","categoryIcon":"🐟","unit":"kg","image":"🐠","today":1850,"yesterday":1790,"lastWeek":1700,"lastMonth":1650,"change":{"dir":"up","pct":3.4}},
  {"id":20,"slug":"katla-mach","nameBn":"কাতলা মাছ","category":"mach","categoryNameBn":"মাছ","categoryIcon":"🐟","unit":"kg","image":"🐠","today":43,"yesterday":45,"lastWeek":44,"lastMonth":42,"change":{"dir":"down","pct":-4.4}},
  {"id":21,"slug":"chingri-mach","nameBn":"চিংড়ি মাছ (খোলা)","category":"mach","categoryNameBn":"মাছ","categoryIcon":"🐟","unit":"kg","image":"🦐","today":330,"yesterday":320,"lastWeek":310,"lastMonth":300,"change":{"dir":"up","pct":3.1}},
  {"id":22,"slug":"murgi-r-mangsho","nameBn":"মুরগির মাংস","category":"mangsho","categoryNameBn":"মাংস","categoryIcon":"🍗","unit":"kg","image":"🍗","today":225,"yesterday":228,"lastWeek":220,"lastMonth":215,"change":{"dir":"down","pct":-1.3}},
  {"id":23,"slug":"goru-r-mangsho","nameBn":"গরুর মাংস","category":"mangsho","categoryNameBn":"মাংস","categoryIcon":"🍗","unit":"kg","image":"🥩","today":790,"yesterday":800,"lastWeek":780,"lastMonth":760,"change":{"dir":"down","pct":-1.2}},
  {"id":24,"slug":"khasir-mangsho","nameBn":"খাসির মাংস","category":"mangsho","categoryNameBn":"মাংস","categoryIcon":"🍗","unit":"kg","image":"🍖","today":1290,"yesterday":1330,"lastWeek":1300,"lastMonth":1280,"change":{"dir":"down","pct":-3}},
  {"id":25,"slug":"hanser-mangsho","nameBn":"হাঁসের মাংস","category":"mangsho","categoryNameBn":"মাংস","categoryIcon":"🍗","unit":"kg","image":"🦆","today":285,"yesterday":295,"lastWeek":310,"lastMonth":320,"change":{"dir":"down","pct":-3.4}},
  {"id":26,"slug":"dim","nameBn":"ডিম","category":"dim-dui","categoryNameBn":"ডিম-দুধ","categoryIcon":"🥛","unit":"dozen","image":"🥚","today":158,"yesterday":152,"lastWeek":148,"lastMonth":145,"change":{"dir":"up","pct":3.9}},
  {"id":27,"slug":"dui-dudh","nameBn":"দুধ","category":"dim-dui","categoryNameBn":"ডিম-দুধ","categoryIcon":"🥛","unit":"litre","image":"🥛","today":102,"yesterday":100,"lastWeek":98,"lastMonth":96,"change":{"dir":"up","pct":2}},
  {"id":28,"slug":"doi","nameBn":"দই","category":"dim-dui","categoryNameBn":"ডিম-দুধ","categoryIcon":"🥛","unit":"🥣","today":92,"yesterday":92,"lastWeek":90,"lastMonth":88,"change":{"dir":"flat","pct":0}},
  {"id":29,"slug":"mokhhan","nameBn":"মাখন (১০০ গ্রাম)","category":"dim-dui","categoryNameBn":"ডিম-দুধ","categoryIcon":"🥛","unit":"piece","image":"🧈","today":145,"yesterday":140,"lastWeek":138,"lastMonth":135,"change":{"dir":"up","pct":3.6}},
  {"id":30,"slug":"ada","nameBn":"আদা","category":"mosla","categoryNameBn":"মসলা","categoryIcon":"🌶️","unit":"kg","image":"🫚","today":85,"yesterday":78,"lastWeek":72,"lastMonth":70,"change":{"dir":"up","pct":9}},
  {"id":31,"slug":"roshun","nameBn":"রসুন","category":"mosla","categoryNameBn":"মসলা","categoryIcon":"🌶️","unit":"kg","image":"🧄","today":125,"yesterday":135,"lastWeek":140,"lastMonth":150,"change":{"dir":"down","pct":-7.4}},
  {"id":32,"slug":"morich-gunda","nameBn":"মরিচ গুঁড়া","category":"mosla","categoryNameBn":"মসলা","categoryIcon":"🌶️","unit":"kg","image":"🌶️","today":245,"yesterday":250,"lastWeek":240,"lastMonth":235,"change":{"dir":"down","pct":-2}},
  {"id":33,"slug":"dhanepata-gunda","nameBn":"ধনেপাতা গুঁড়া","category":"mosla","categoryNameBn":"মসলা","categoryIcon":"🌶️","unit":"kg","image":"🍃","today":265,"yesterday":265,"lastWeek":258,"lastMonth":250,"change":{"dir":"flat","pct":0}}
];

function CategoryContent() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "chal";
  const [sortOrder, setSortOrder] = useState("default");

  const categoryInfo = categoryInfoMap[slug] || {
    nameBn: "বাজার দর",
    desc: "প্রয়োজনীয় পণ্যের বাজার মূল্য",
    icon: "🛒",
  };

  const filteredProducts = allProducts.filter((p) => p.category === slug);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-high") {
      return a.today - b.today;
    } else if (sortOrder === "high-low") {
      return b.today - a.today;
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <span className="text-3xl bg-gray-50 p-3 rounded-xl">{categoryInfo.icon}</span>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{categoryInfo.nameBn}</h1>
          <p className="text-gray-500 text-xs mt-0.5">{categoryInfo.desc}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-2">
        <span className="text-xs font-semibold text-gray-700">
          মোট {sortedProducts.length} টি পণ্য দেখানো হচ্ছে
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>সাজান:</span>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম কম থেকে বেশি</option>
            <option value="high-low">দাম বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";
            const pct = product.change?.pct ? Math.abs(product.change.pct) : 0;

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{product.image || "📦"}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{product.nameBn}</h3>
                      <span className="text-[11px] text-gray-500">প্রতি {product.unit}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">আজকের দাম</span>
                    <span className="font-bold text-gray-900 text-sm">{product.today} টাকা</span>
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
          })
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </div>
        )}
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