"use client";

import { authClient } from "@/features/auth/lib/auth-client";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Produk",
    links: [
      { label: "Semua Produk", href: "/search" },
      { label: "Biji Kopi", href: "/search?type=BEAN" },
      { label: "Peralatan", href: "/search?type=GEAR" },
      { label: "Promo Bundle", href: "/search?type=BUNDLE" },
    ],
  },
  {
    title: "Tentang",
    links: [
      { label: "Cerita Kami", href: "/#about" },
      { label: "Karir", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Pengiriman", href: "/shipping" },
      { label: "Syarat & Ketentuan", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const { data: session } = authClient.useSession();

  if (session?.user) return null;

  return (
    <footer className="pt-16 pb-6 border-t border-border bg-card">
      <div className="px-4 mx-auto md:px-6">
        <div className="grid grid-cols-2 gap-8 mb-16 md:grid-cols-5">
          <div className="col-span-2 space-y-6">
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center w-8 h-8 text-white rounded bg-primary">
                <span className="font-serif font-bold">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Noku Coffee
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Menyediakan pengalaman kopi terbaik dari hulu ke hilir. Temukan
              rasa otentik di setiap seduhan.
            </p>

            <div className="flex gap-2 items-center text-sm text-muted-foreground">
              <MapPin size={16} /> Bekasi, Indonesia
            </div>
          </div>

          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h4 className="mb-6 font-bold text-foreground">{col.title}</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 text-sm text-center border-t border-border text-muted-foreground">
          &copy; {new Date().getFullYear()} Noku Coffee Indonesia.
        </div>
      </div>
    </footer>
  );
}
