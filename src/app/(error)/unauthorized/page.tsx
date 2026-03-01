"use client";

import { Suspense } from "react";
import { ErrorDisplay } from "@/components/shared/error-display";
import { Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";

function UnauthorizedContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const loginUrl = callbackUrl
    ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/login";

  return (
    <ErrorDisplay
      Icon={Lock}
      statusCode="401"
      title="Masuk Diperlukan"
      message="Silakan masuk ke akun Anda untuk mengakses riwayat pesanan, keranjang belanja, atau halaman profil Anda."
      actionText="Masuk ke Akun"
      actionUrl={loginUrl}
    />
  );
}

export default function UnauthorizedPage() {
  return (
    <Suspense fallback={null}>
      <UnauthorizedContent />
    </Suspense>
  );
}
