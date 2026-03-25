import { Metadata } from "next";
import ResetPasswordInnerPage from "../components/reset-password-inner";
import { Suspense } from "react";
import ResetPasswordSkeleton from "../components/skeleton/reset-password-skeleton";

export function generateMetaData(): Metadata {
  return {
    title: "Reset Password | Noku Coffee",
    description:
      "Reset password Anda untuk mengaktifkan akun Noku Coffee. Masuk ke akun Anda setelah verifikasi berhasil.",
    openGraph: {
      title: "Reset Password | Noku Coffee",
      description: "Reset password Anda untuk mengaktifkan akun Noku Coffee.",
      url: "https://nokucoffee.me/reset-password",
      siteName: "Noku Coffee",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Reset Password | Noku Coffee",
      description: "Reset password Anda untuk mengaktifkan akun Noku Coffee.",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordInnerPage />
    </Suspense>
  );
}
