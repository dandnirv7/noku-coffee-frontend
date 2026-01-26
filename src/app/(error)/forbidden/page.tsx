"use client";

import { ErrorDisplay } from "@/components/shared/error-display";
import { Lock } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <ErrorDisplay
      Icon={Lock}
      statusCode="403"
      title="Akses Dibatasi"
      message="Maaf, Anda tidak memiliki izin untuk melihat halaman ini. Halaman ini mungkin khusus untuk Administrator atau peran tertentu."
      actionText="Kembali ke Beranda"
      actionUrl="/"
    />
  );
}
