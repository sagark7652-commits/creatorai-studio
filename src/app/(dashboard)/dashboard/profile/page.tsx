"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-xl shadow-lg p-8">

        <div className="flex items-center gap-6 mb-8">

          <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-bold">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user.user_metadata?.full_name || "User"}
            </h1>

            <p className="text-slate-400">
              {user.email}
            </p>
          </div>

        </div>

        <div className="space-y-5">

          <div>
            <p className="text-slate-400">Full Name</p>
            <p className="text-lg">
              {user.user_metadata?.full_name || "Not Available"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>

          <div>
            <p className="text-slate-400">User ID</p>
            <p className="break-all">{user.id}</p>
          </div>

          <div>
            <p className="text-slate-400">Joined</p>
            <p>
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}