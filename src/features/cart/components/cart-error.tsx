"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, ShoppingBag, RefreshCw } from "lucide-react";

interface CartErrorProps {
  reset: () => void;
  message?: string;
}

export function CartError({ reset, message }: CartErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-[2rem] bg-muted/5 border-muted-foreground/10 animate-fade-in-up min-h-[60vh]">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full blur-3xl bg-destructive/20 animate-glow-pulse" />
        <div className="relative p-6 rounded-full bg-destructive/10 text-destructive animate-float">
          <ShoppingBag size={48} strokeWidth={1.5} />
          <AlertCircle className="absolute right-0 bottom-0 w-6 h-6 fill-white" />
        </div>
      </div>

      <div className="mb-10 space-y-3 max-w-md">
        <h3 className="text-2xl font-black tracking-tight uppercase text-slate-900">
          Keranjang Belanja Tidak Tersedia
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {message ||
            "Kami gagal memuat keranjang belanja Anda. Tenang — produk favorit Anda masih tersimpan dengan aman. Silakan coba lagi."}
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center sm:flex-row">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="gap-2 px-8 h-12 font-bold rounded-xl text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={18} />
          Kembali
        </Button>

        <Button
          onClick={() => reset()}
          className="gap-3 px-8 h-12 font-bold rounded-xl shadow-none transition-all group active:scale-95"
        >
          <RefreshCw
            size={18}
            className="transition-transform duration-500 group-hover:rotate-180"
          />
          Muat Ulang Keranjang
        </Button>
      </div>

      <div className="px-3 py-1 mt-12 rounded-full border bg-muted/50 border-border">
        <span className="text-[10px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">
          ERR_CART_LOAD_FAILED
        </span>
      </div>
    </div>
  );
}
