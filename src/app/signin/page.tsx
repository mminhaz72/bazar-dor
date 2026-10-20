"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে!");
        setLoading(false);
        return;
      }

      if (data) {
        localStorage.setItem("userName", data.user?.name || email.split("@")[0]);
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
      }
    } catch (err) {
      toast.error("কিছু ভুল হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-md w-full space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
          <p className="text-xs text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে একাউন্টে ঢুকুন</p>
        </div>

        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষরের"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-sm"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-xs text-gray-400">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* গুগল এবং গিটহাব সোশ্যাল লগইন বাটন ও আইকন */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialSignIn("google")}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-2 rounded-xl text-xs font-medium text-gray-700 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.36 7.22 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.87 0 12s.43 3.87 1.18 5.39l4.09-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.64 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            onClick={() => handleSocialSignIn("github")}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-2 rounded-xl text-xs font-medium text-gray-700 transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <div className="text-center space-y-2 pt-1">
          <p className="text-xs text-gray-500">
            একাউন্ট নেই?{" "}
            <Link href="/signup" className="text-emerald-700 font-semibold hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
          <div>
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition">
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}