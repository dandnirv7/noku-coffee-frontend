"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-[2rem] bg-muted/5 border-muted-foreground/10 min-h-[60vh]">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full blur-3xl bg-primary/10 animate-glow-pulse" />
        <div className="relative p-6 rounded-full bg-primary/10 text-primary animate-float">
          <ShoppingBag size={48} strokeWidth={1.5} />
        </div>
      </div>

      <div className="mb-10 space-y-3 max-w-md">
        <h3 className="text-2xl font-black tracking-tight uppercase text-slate-900">
          Keranjang Belanja Kosong
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Belum ada produk di keranjang Anda. Yuk, mulai belanja dan temukan
          biji kopi, peralatan, dan bundle favorit Anda!
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center sm:flex-row">
        <Button
          asChild
          className="gap-3 px-8 h-12 font-bold rounded-xl shadow-none transition-all group active:scale-95"
        >
          <Link href="/search">
            <Package size={18} />
            Mulai Belanja
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Button>
      </div>

      <div className="px-3 py-1 mt-12 rounded-full border bg-muted/50 border-border">
        <span className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">
          CART_EMPTY
        </span>
      </div>
    </div>
  );
}
