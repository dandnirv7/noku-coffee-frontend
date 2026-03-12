"use client";

import { Button } from "@/components/ui/button";
import { PackageOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { statusLabelMap } from "../../lib/constants";

type OrderEmptyProps = {
  searchQuery: string;
  activeTab: string;
};

export function OrderEmpty({ searchQuery, activeTab }: OrderEmptyProps) {
  const isSearchEmpty = !!searchQuery;
  const isTabEmpty = activeTab !== "all";

  let title = "Belum Ada Pesanan";
  let description =
    "Anda belum melakukan pemesanan apa pun. Ayo mulai jelajahi koleksi kopi terbaik kami!";

  if (isSearchEmpty) {
    title = "Pesanan Tidak Ditemukan";
    description = `Tidak ada pesanan yang cocok dengan pencarian "${searchQuery}". Silakan coba dengan kata kunci lain.`;
  } else if (isTabEmpty) {
    title = `Tidak Ada Pesanan ${statusLabelMap[activeTab] || activeTab}`;
    description = `Anda tidak memiliki pesanan dengan status pemrosesan tersebut saat ini.`;
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-[2rem] bg-muted/5 border-muted-foreground/10 min-h-[50vh] mt-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full blur-3xl bg-primary/10 animate-glow-pulse" />
        <div className="relative p-6 rounded-full bg-primary/10 text-primary animate-float">
          <PackageOpen size={48} strokeWidth={1.5} />
        </div>
      </div>

      <div className="mb-10 space-y-3 max-w-md">
        <h3 className="text-2xl font-black tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center sm:flex-row">
        <Button
          asChild
          className="gap-3 px-8 h-12 font-bold rounded-xl shadow-none transition-all group active:scale-95"
        >
          <Link href="/search">
            <ExternalLink size={18} />
            Mulai Belanja
            <ExternalLink
              size={18}
              className="hidden transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Button>
      </div>

      <div className="px-3 py-1 mt-12 rounded-full border bg-muted/50 border-border">
        <span className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">
          {isSearchEmpty
            ? "SEARCH_EMPTY_RESULT"
            : isTabEmpty
              ? "TAB_EMPTY_RESULT"
              : "NO_ORDERS_FOUND"}
        </span>
      </div>
    </div>
  );
}
