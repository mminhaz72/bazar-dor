"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const fallbackProducts = [
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

export default function Home() {
  const [products, setProducts] = useState<any[]>(fallbackProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data) ? data : data.data || data.products || [];
        if (productList.length > 0) {
          setProducts(productList);
        }
      })
      .catch((err) => {
        console.warn("API fetch failed, using fallback data:", err);
      });
  }, []);

  const risers = products.filter((p) => p.change?.dir === "up").slice(0, 6);
  const fallers = products.filter((p) => p.change?.dir === "down").slice(0, 6);

  return (
    <main className="min-h-screen bg-slate-50 text-gray-800 flex flex-col justify-between">
      <div>
        {/* এখানে অতিরিক্ত Navbar রিমুভ করা হয়েছে, কারণ এটি লেআউটে গ্লোবালি আছে */}
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
          {/* Hero / Banner Section */}
          <section className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs text-emerald-800 font-medium block">
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                আজকের বাজারের দাম এক নজরে
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
              </p>
              <div className="pt-2">
                <a
                  href="#সব-পণ্য"
                  className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-5 py-2 rounded-xl transition-colors shadow-sm text-sm"
                >
                  সব পণ্য দেখুন
                </a>
              </div>
            </div>
            <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center bg-emerald-50 rounded-2xl">
              <span className="text-6xl">🛒🥬🍎</span>
            </div>
          </section>

          {/* Section A — আজ দাম বেড়েছে ▲ (৩ কলাম গ্রিড) */}
          {risers.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-red-600 flex items-center gap-2">
                ▲ আজ দাম বেড়েছে
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {risers.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Section B — আজ দাম কমেছে ▼ (৩ কলাম গ্রিড) */}
          {fallers.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-emerald-600 flex items-center gap-2">
                ▼ আজ দাম কমেছে
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {fallers.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* Section C — সব পণ্য (৩ কলাম গ্রিড) */}
          <section id="সব-পণ্য" className="space-y-4 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-3 gap-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
                <p className="text-xs text-gray-500">দৈনিক নিত্যপ্রয়োজনীয় পণ্যের বাজার দর</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                মোট {products.length} টি পণ্য দেখানো হচ্ছে
              </span>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500">লোড হচ্ছে... (Loading...)</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
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
          <span className="text-xs text-gray-400 block">আজকের  দাম</span>
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