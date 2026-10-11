"use client";
import { useEffect, useState } from "react";

export default function PriceTicker() {
  const [mounted, setMounted] = useState(false);
  const [tickerData, setTickerData] = useState<any[]>([]);

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
      .catch((err) => console.warn("Ticker fetch error:", err));
  }, []);

  // সার্ভার এবং ক্লায়েন্টের প্রথম রেন্ডার এক রাখতে মাউন্ট হওয়ার আগে ফাঁকা বা ফলব্যাক রাখা যেতে পারে
  if (!mounted) {
    return <div className="bg-emerald-800 h-10 w-full"></div>;
  }

  return (
    <div className="bg-emerald-800 text-white overflow-hidden whitespace-nowrap py-2.5 text-sm shadow-inner relative w-full">
      <div className="flex w-max" style={{ animation: "marquee 80s linear infinite" }}>
        {tickerData.concat(tickerData).map((item, index) => {
          const isUp = item.change?.dir === "up";
          const pct = item.change?.pct ? Math.abs(item.change.pct) : 0;

          return (
            <span key={index} className="inline-flex items-center space-x-2 mx-4 bg-emerald-900/50 px-3 py-1 rounded-md border border-emerald-700">
              <span>{item.image || "🛒"}</span>
              <span className="font-medium">{item.nameBn || "পণ্য"}</span>
              <span>{item.today || "০"} টাকা/{item.unit || "kg"}</span>
              <span className={isUp ? "text-green-300 font-bold" : "text-red-300 font-bold"}>
                {isUp ? `▲ ${pct}%` : `▼ ${pct}%`}
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