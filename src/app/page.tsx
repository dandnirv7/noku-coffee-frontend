"use client";

import AboutSection from "@/components/landing/about-section";
import HeroSection from "@/components/landing/hero-section";
import OrderSection from "@/components/landing/order-section";
import ProductList from "@/components/landing/product-list";
import BottomNav from "@/components/layout/landing/BottomNav";
import Navbar from "@/components/layout/landing/Navbar";
import { Badge } from "@/components/ui/badge";
import { Award, MapPin } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/features/auth/lib/auth-client";
import UserDashboardPage from "@/features/user/pages/user-page";
import UserDashboardLayout from "@/features/user/components/dashboard/layout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface FooterColumns {
  title: string;
  links: string[];
}

const awards: string[] = [
  "Specialty Coffee Assn",
  "Organic Certified",
  "Fair Trade",
  `Best Roaster ${new Date().getFullYear() - 1}`,
];

const footerColumns: FooterColumns[] = [
  {
    title: "Produk",
    links: [
      "Semua Produk",
      "Biji Kopi",
      "Peralatan",
      "Aksesoris",
      "Promo Bundle",
    ],
  },
  {
    title: "Tentang",
    links: ["Cerita Kami", "Karir", "Blog"],
  },
  {
    title: "Bantuan",
    links: ["FAQ", "Pengiriman", "Pengembalian", "Syarat & Ketentuan"],
  },
];

export default function HomePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      !isPending &&
      session?.user &&
      (session.user as { role?: string }).role?.toLowerCase() === "admin"
    ) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return null;
  }

  if (
    session?.user &&
    (session.user as { role?: string }).role?.toLowerCase() === "user"
  ) {
    return (
      <UserDashboardLayout>
        <UserDashboardPage />
      </UserDashboardLayout>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-white pb-16 md:pb-0">
      <div className="relative overflow-hidden bg-[#1F2933] py-2.5 px-4 text-center text-sm font-medium text-white">
        <div className="absolute inset-0 opacity-10 -translate-x-1/2 skew-x-12 bg-primary" />
        <div className="flex relative z-10 flex-wrap gap-2 justify-center items-center">
          <Badge className="bg-primary text-[10px] text-white">Promo</Badge>
          <p>
            Diskon <span className="font-bold text-primary">30%</span> untuk
            pembelian pertama!
          </p>
          <button className="ml-1 font-bold underline transition-colors cursor-pointer decoration-background hover:decoration-primary hover:text-primary">
            <Link href="/login">Klaim</Link>
          </button>
        </div>
      </div>

      <Navbar />

      <HeroSection id="hero" />
      <div className="py-10 bg-white border-y border-border">
        <div className="flex flex-wrap gap-8 justify-center items-center px-4 mx-auto opacity-60 grayscale transition-all hover:grayscale-0 md:justify-between">
          {awards.map((b, i) => (
            <div
              key={i}
              className="flex gap-2 items-center text-lg font-bold cursor-default"
            >
              <Award size={24} /> {b}
            </div>
          ))}
        </div>
      </div>

      <AboutSection id="about" />
      <ProductList id="products" />
      <OrderSection id="order" />

      <footer className="pt-16 pb-12 border-t border-border bg-surface">
        <div className="px-4 mx-auto md:px-6">
          <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-5">
            <div className="space-y-6 md:col-span-2">
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center w-8 h-8 text-white rounded bg-primary">
                  <span className="font-serif font-bold">N</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Noku Coffee
                </span>
              </div>

              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Menyediakan pengalaman kopi terbaik dari hulu ke hilir. Temukan
                rasa otentik di setiap seduhan.
              </p>

              <div className="flex gap-2 items-center text-sm text-muted">
                <MapPin size={16} /> Bekasi, Indonesia
              </div>
            </div>

            {footerColumns.map((col, idx) => (
              <div key={idx}>
                <h4 className="mb-6 font-bold text-foreground">{col.title}</h4>
                <ul className="space-y-4 text-sm text-muted">
                  {col.links.map((l) => (
                    <li key={l}>
                      <button className="transition-colors hover:text-primary">
                        {l}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 text-sm text-center border-t border-border text-muted">
            &copy; {new Date().getFullYear()} Noku Coffee Indonesia.
          </div>
        </div>
      </footer>
      <BottomNav />
    </div>
  );
}
