import { Metadata } from "next";
import RegisterPageInner from "../components/register-page-inner";

export const generateMetadata = (): Metadata => ({
  title: "Daftar - Noku Coffee",
  description:
    "Daftar akun Noku Coffee untuk menikmati biji kopi premium kami.",
  openGraph: {
    title: "Daftar - Noku Coffee",
    description:
      "Daftar akun Noku Coffee untuk menikmati biji kopi premium kami.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/register`,
    siteName: "Noku Coffee",
  },
});

export default function RegisterPage() {
  return <RegisterPageInner />;
}
