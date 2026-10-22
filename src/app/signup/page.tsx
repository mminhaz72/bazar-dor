"client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.signup.email({
        email,
        password,
        name,
      });

      if (error) {
        toast.error(error.message || "সাইনআপ ব্যর্থ হয়েছে");
        return;
      }

      if (data) {
        localStorage.setItem("username", name || email.split("@")[0]);
        toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
        router.push("/");
      }
    } catch (err) {
      toast.error("কিছু ভুল হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">অ্যাকাউন্ট তৈরি করুন</h1>
        
        <form onSubmit={handleCredentialSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="আপনার নাম"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ইমেল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">অথবা</div>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => handleSocialSignup("google")}
            className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            Google দিয়ে চালিয়ে যান
          </button>
          
          <button
            onClick={() => handleSocialSignup("github")}
            className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-emerald-600 hover:underline">
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}