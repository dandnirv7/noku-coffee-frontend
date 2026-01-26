"use client";

import { ErrorDisplay } from "@/components/shared/error-display";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <ErrorDisplay
      Icon={Lock}
      statusCode="401"
      title="Masuk Diperlukan"
      message="Silakan masuk ke akun Anda untuk mengakses riwayat pesanan, keranjang belanja, atau halaman profil Anda."
      actionText="Masuk ke Akun"
      actionUrl="/login"
    />
  );
}
