"use client";

import { Input } from "@/components/ui/input";
import { authClient } from "@/features/auth/lib/auth-client";
import { Bell, HelpCircle, MessageCircleMore, Search } from "lucide-react";
import Image from "next/image";

export function SiteHeader() {
  const { data: session } = authClient.useSession();

  return (
    <header className="flex items-center justify-between bg-white py-4 px-6 md:px-8 rounded-2xl shadow-sm my-4 gap-4 sticky top-4 z-10">
      <div className="relative hidden md:block flex-1 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <Input
          type="text"
          placeholder="Cari Produk..."
          className="pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto md:ml-0">
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <MessageCircleMore size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User Avatar"}
              className="w-10 h-10 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
              width={40}
              height={40}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shrink-0">
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">
              {session?.user?.name || "Pengguna"}
            </p>
            <p className="text-xs text-slate-500">
              {session?.user?.role || "User"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
