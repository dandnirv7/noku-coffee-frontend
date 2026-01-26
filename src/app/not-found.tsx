"use client";

import { ErrorDisplay } from "@/components/shared/error-display";
import { FileWarning } from "lucide-react";

export default function ErrorPage() {
  return (
    <ErrorDisplay
      Icon={FileWarning}
      statusCode="404"
      title="Halaman Tidak Ditemukan"
      message="Produk atau halaman yang Anda cari mungkin telah dipindahkan, habis terjual, atau tautannya sudah tidak berlaku."
      actionText="Kembali ke Beranda"
      actionUrl="/"
    />
  );
}
