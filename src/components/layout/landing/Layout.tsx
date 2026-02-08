"use client";

import { MapPin } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { Badge } from "@/components/ui/badge";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Promo Banner */}
      <div className="relative overflow-hidden bg-[#1F2933] py-2.5 text-center text-sm font-medium text-white px-4">
        <div className="absolute inset-0 opacity-10 -translate-x-1/2 skew-x-12 bg-primary" />
        <div className="flex relative z-10 flex-wrap gap-2 justify-center items-center">
          <Badge className="bg-primary text-[10px] text-white">Promo</Badge>
          <p>
            Diskon <span className="font-bold text-primary">30%</span> untuk
            pembelian pertama!
          </p>
          <button className="ml-1 font-bold underline transition-colors cursor-pointer decoration-primary hover:text-primary">
            <Link href="/login">Klaim</Link>
          </button>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="px-4">{children}</main>

      {/* Footer */}
      <footer className="px-4 pt-16 pb-12 border-t border-border bg-surface">
        <div className="container mx-auto md:px-6">
          <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-5">
            {/* Branding */}
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

            {/* Footer Links */}
            {[
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
              { title: "Tentang", links: ["Cerita Kami", "Karir", "Blog"] },
              {
                title: "Bantuan",
                links: [
                  "FAQ",
                  "Pengiriman",
                  "Pengembalian",
                  "Syarat & Ketentuan",
                ],
              },
            ].map((col, idx) => (
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
    </div>
  );
}
