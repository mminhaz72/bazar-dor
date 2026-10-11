"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });
      if (error) {
        toast.error(error.message || "সাইন আপ ব্যর্থ হয়েছে");
      } else {
        toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
        router.push("/profile");
      }
    } catch (err) {
      toast.error("কোথাও কোনো সমস্যা হয়েছে।");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-gray-800 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="text-xs text-gray-500 mt-1">বিনামূল্যে বাজার দর পেতে রেজিস্ট্রেশন করুন।</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
              placeholder="আপনার পূর্ণ নাম দিন"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
              placeholder="কমপক্ষে ৬ অক্ষরের"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1b5e39] text-white py-2.5 rounded-md hover:bg-[#14472c] transition text-sm font-medium mt-2"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/signin" className="text-emerald-700 font-semibold hover:underline">সাইন ইন করুন</Link>
        </div>
      </div>
    </main>
  );
}