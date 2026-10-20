"use client";
import { useEffect, useState } from "react";

const fallbackTicker = [
  { id: 1, nameBn: "স্বর্ণমাছি চাল", today: 148, unit: "kg", image: "🍚", change: { dir: "up", pct: 2.1 } },
  { id: 2, nameBn: "মিনিকেট চাল", today: 99, unit: "kg", image: "🍚", change: { dir: "down", pct: 2.9 } },
  { id: 5, nameBn: "মসুর ডাল", today: 142, unit: "kg", image: "🫘", change: { dir: "up", pct: 2.9 } },
  { id: 9, nameBn: "সরিষার তেল", today: 192, unit: "litre", image: "🛢️", change: { dir: "up", pct: 2.1 } },
  { id: 12, nameBn: "আলু", today: 30, unit: "kg", image: "🥔", change: { dir: "down", pct: 6.2 } },
  { id: 13, nameBn: "পেঁয়াজ", today: 54, unit: "kg", image: "🧅", change: { dir: "up", pct: 12.5 } },
];

export default function PriceTicker() {
  const [mounted, setMounted] = useState(false);
  const [tickerData, setTickerData] = useState<any[]>(fallbackTicker);

  useEffect(() => {
    setMounted(true);
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data) ? data : data.data || data.products || [];
        if (productList.length > 0) {
          setTickerData(productList);
        }
      })
      .catch((err) => console.warn("Ticker fetch error, using fallback:", err));
  }, []);

  if (!mounted) {
    return <div className="bg-white border-b border-gray-200 h-10 w-full"></div>;
  }

  return (
    <div className="bg-white text-gray-800 border-b border-gray-200 overflow-hidden whitespace-nowrap py-2 text-sm shadow-sm relative w-full">
      <div 
        style={{ 
          display: "flex", 
          width: "max-content", 
          animation: "marquee 50s linear infinite" 
        }}
      >
        {tickerData.concat(tickerData).map((item, index) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";
          const pct = item.change?.pct ? Math.abs(item.change.pct) : 0;

          return (
            <span key={index} className="inline-flex items-center space-x-2 mx-4 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
              <span>{item.image || "🛒"}</span>
              <span className="font-medium text-gray-700">{item.nameBn || "পণ্য"}</span>
              <span className="font-semibold text-gray-900">{item.today || item.todayPrice || "০"} টাকা/{item.unit || "kg"}</span>
              <span className={isUp ? "text-red-600 font-bold" : isDown ? "text-emerald-600 font-bold" : "text-gray-500 font-bold"}>
                {isUp ? `▲ ${pct}%` : isDown ? `▼ ${pct}%` : "• ০%"}
              </span>
            </span>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}