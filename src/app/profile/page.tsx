"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      if (data?.user) {
        setSessionUser(data.user);
        setName(data.user.name || "");
      } else {
        const localName = localStorage.getItem("userName") || "md minhaz";
        setSessionUser({ name: localName, email: "minhazbangladesh72@gmail.com" });
        setName(localName);
      }
    };
    fetchSession();
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("userName", name);
      if (sessionUser) {
        setSessionUser({ ...sessionUser, name });
      }
      toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
      setLoading(false);
    }, 500);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          localStorage.removeItem("userName");
          toast.success("সফলভাবে লগ-আউট হয়েছে!");
          router.push("/signin");
        },
      },
    });
  };

  return (
    <div className="min-h-[80vh] bg-white flex flex-col items-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-xs text-gray-500">আপনার ব্যক্তিগত তথ্য এবং সেটিংস পরিচালনা করুন</p>
        </div>

        {/* ইউজার ইনফো কার্ড */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={sessionUser?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600"
            />
            <div>
              <h2 className="font-bold text-gray-900">{sessionUser?.name || "লোড হচ্ছে..."}</h2>
              <p className="text-xs text-gray-500">{sessionUser?.email || "minhazbangladesh72@gmail.com"}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            সাইন আউট
          </button>
        </div>

        {/* তথ্য আপডেট ফর্ম */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900">তথ্য</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-sm"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}