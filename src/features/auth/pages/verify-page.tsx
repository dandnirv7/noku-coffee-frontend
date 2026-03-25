import { Metadata } from "next";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import VerifyInnerPage from "../components/verify-inner-page";

export function generateMetaData(): Metadata {
  return {
    title: "Verifikasi Akun | Noku Coffee",
    description:
      "Verifikasi email Anda untuk mengaktifkan akun Noku Coffee. Masuk ke akun Anda setelah verifikasi berhasil.",
    openGraph: {
      title: "Verifikasi Akun | Noku Coffee",
      description: "Verifikasi email Anda untuk mengaktifkan akun Noku Coffee.",
      url: "https://nokucoffee.me/verify",
      siteName: "Noku Coffee",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Verifikasi Akun | Noku Coffee",
      description: "Verifikasi email Anda untuk mengaktifkan akun Noku Coffee.",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-md shadow-lg border-muted/60 p-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full mt-6" />
            </div>
          </Card>
        }
      >
        <VerifyInnerPage />
      </Suspense>
    </div>
  );
}
