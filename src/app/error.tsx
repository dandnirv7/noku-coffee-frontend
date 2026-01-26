"use client";

import { ErrorDisplay } from "@/components/shared/error-display";
import { ServerCrash } from "lucide-react";

export default function ErrorPage() {
  return (
    <ErrorDisplay
      Icon={ServerCrash}
      statusCode="500"
      title="Gangguan Sistem"
      message="Kami sedang mengalami sedikit kendala teknis pada server kami. Mohon coba muat ulang halaman atau kembali beberapa saat lagi."
      actionText="Muat Ulang"
      actionUrl=""
    />
  );
}
