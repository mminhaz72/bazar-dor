"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const tickerProducts = [
  { name: "স্বর্ণমাছি চাল", price: "১৪৮ টাকা/কেজি", pct: "▲ ২.১%" },
  { name: "মিনিকেট চাল", price: "৯৯ টাকা/কেজি", pct: "▼ ২.৯%" },
  { name: "নাজির চাল", price: "৭৪ টাকা/কেজি", pct: "• ০%" },
  { name: "বাটাম সাইজ চাল", price: "৬৬ টাকা/কেজি", pct: "▲ ৩.১%" },
  { name: "মসুর ডাল", price: "১৪২ টাকা/কেজি", pct: "▲ ২.৯%" },
  { name: "সরিষার তেল", price: "১৯২ টাকা/লিটার", pct: "▲ ২.১%" },
  { name: "আলু", price: "৩০ টাকা/কেজি", pct: "▼ ৬.২%" },
  { name: "পেঁয়াজ", price: "৫৪ টাকা/কেজি", pct: "▲ ১২.৫%" }
];

export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<any>(null);

  useEffect(() => {
    // Better Auth থেকে কারেন্ট সেশন ফেচ করা
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      if (data?.user) {
        setSessionUser(data.user);
      } else {
        // ফলব্যাক হিসেবে লোকালস্টোরেজ চেক করা যেতে পারে
        const localName = localStorage.getItem("userName");
        if (localName) {
          setSessionUser({ name: localName, email: "user@gmail.com" });
        }
      }
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          localStorage.removeItem("userName");
          setSessionUser(null);
          toast.success("সফলভাবে লগআউট হয়েছে!");
          setDropdownOpen(false);
          router.push("/signin");
        },
      },
    });
  };

  const fallbackCategories = [
    { slug: "chal", nameBn: "চাল", icon: "🍚" },
    { slug: "dal", nameBn: "ডাল", icon: "🫘" },
    { slug: "tel", nameBn: "তেল", icon: "🛢️" },
    { slug: "sobji", nameBn: "সবজি", icon: "🥔" },
    { slug: "mach", nameBn: "মাছ", icon: "🐟" },
    { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
    { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥚" },
    { slug: "mosla", nameBn: "মসলা", icon: "🧄" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-emerald-700 text-white p-2 rounded-xl font-bold text-lg">🛒</div>
          <div>
            <h1 className="font-bold text-gray-900 text-base leading-tight">বাজার দর</h1>
            <span className="text-[10px] text-gray-500 block">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</span>
          </div>
        </Link>

        {sessionUser ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition"
            >
              <img
                src={sessionUser.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover border border-emerald-600"
              />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">{sessionUser.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">{sessionUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{sessionUser.email || "user@gmail.com"}</p>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                  onClick={() => setDropdownOpen(false)}
                >
                  👤 আমার প্রোফাইল
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium border-t border-gray-100 mt-1"
                >
                  🚪 লগ-আউট
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="text-xs font-semibold text-gray-700 hover:text-emerald-700 px-3 py-1.5 transition"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <nav className="bg-slate-50 border-t border-gray-100 py-2 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex items-center space-x-6 whitespace-nowrap text-xs font-medium text-gray-600">
          <Link href="/" className="hover:text-emerald-700 flex items-center gap-1">
            <span>🏠</span> সব
          </Link>
          {fallbackCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              className="hover:text-emerald-700 flex items-center gap-1 transition-colors"
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="bg-slate-100 border-t border-gray-200 py-2 overflow-hidden relative">
        <div className="flex w-max animate-marquee items-center">
          {[...tickerProducts, ...tickerProducts].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-700 px-4">
              <span className="font-semibold text-gray-900">{item.name}</span>
              <span className="text-gray-800">{item.price}</span>
              <span className={`font-bold ${item.pct.includes('▲') ? 'text-red-600' : item.pct.includes('▼') ? 'text-emerald-600' : 'text-gray-500'}`}>
                {item.pct}
              </span>
              <span className="ml-4 text-gray-300">|</span>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </header>
  );
}