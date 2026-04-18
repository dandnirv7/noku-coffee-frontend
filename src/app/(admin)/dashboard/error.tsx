"use client";

import { ErrorDisplay } from "@/components/shared/error-display";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <ErrorDisplay
      Icon={AlertCircle}
      statusCode="500"
      title="Terjadi Kesalahan Data"
      message={
        error.message ||
        "Gagal memuat komponen dashboard. Mohon muat ulang halaman atau coba beberapa saat lagi."
      }
      actionText="Coba Lagi"
      onAction={reset}
    />
  );
}
