"use client";

import { authClient } from "@/features/auth/lib/auth-client";

export function UserHeader() {
  const { data: session, isPending } = authClient.useSession();
  const userName = session?.user?.name || "Pengguna";

  if (isPending) {
    return (
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Selamat datang kembali, Pengguna! ☕
        </h1>
        <p className="text-gray-600">
          Inilah perkembangan perjalanan kopi Anda
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Selamat datang kembali, {userName.split(" ")[0]}! ☕
      </h1>
      <p className="text-gray-600">Inilah perkembangan perjalanan kopi Anda</p>
    </div>
  );
}
