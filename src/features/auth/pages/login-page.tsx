import { Metadata } from "next";
import LoginPageInner from "@/features/auth/components/login-page-inner";

export const generateMetadata = (): Metadata => ({
  title: "Masuk - Noku Coffee",
  description:
    "Masuk ke akun Noku Coffee untuk menikmati biji kopi premium kami.",
  openGraph: {
    title: "Masuk - Noku Coffee",
    description:
      "Masuk ke akun Noku Coffee untuk menikmati biji kopi premium kami.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    siteName: "Noku Coffee",
  },
});

export default function LoginPage() {
  return <LoginPageInner />;
}
