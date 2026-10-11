"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data } = authClient.useSession();
  const user = data?.user;
  
  const [name, setName] = useState("");

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("প্রোফাইল আপডেট সফল হয়েছে!");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 font-sans">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-xs text-gray-500 mt-1">আপনার ব্যক্তিগত তথ্য এবং সেটিংস পরিচালনা করুন</p>
      </div>

      {/* ফিগমার হুবহু ডিজাইনের ইউজার কার্ড */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : "U")}
            </div>
          )}
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              {user?.name || user?.email || "লোড হচ্ছে..."}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <button
          onClick={() => authClient.signOut()}
          className="border border-red-300 text-red-500 hover:bg-red-50 text-xs px-4 py-2 rounded-md font-medium transition"
        >
          সাইন আউট
        </button>
      </div>

      {/* তথ্য ফর্ম সেকশন */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">তথ্য</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white text-gray-800"
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1b5e39] text-white py-2.5 rounded-md hover:bg-[#14472c] transition text-sm font-medium mt-2"
          >
            আপডেট করুন
          </button>
        </form>
      </div>
    </div>
  );
}