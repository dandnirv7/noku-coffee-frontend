"use client";

import { Button } from "@/components/ui/button";
import { Coffee, Ghost, RotateCcw, Search } from "lucide-react";

interface SearchProductEmptyProps {
  onReset: () => void;
  hasFilters: boolean;
}

export function SearchProductEmpty({
  onReset,
  hasFilters,
}: SearchProductEmptyProps) {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 md:p-16 text-center border-2 border-dashed rounded-[3rem] bg-linear-to-b from-muted/20 to-transparent border-muted-foreground/15 overflow-hidden">
      <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
        <Coffee size={200} />
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full blur-2xl animate-pulse bg-amber-500/10" />

        <div className="flex relative justify-center items-center w-24 h-24 bg-white rounded-3xl border shadow-xl transition-transform duration-500 rotate-3 shadow-slate-200/50 border-slate-100 hover:rotate-0">
          <div className="flex absolute -top-2 -right-2 justify-center items-center w-8 h-8 text-amber-700 bg-amber-100 rounded-full shadow-sm">
            <Search size={16} strokeWidth={3} />
          </div>
          <Ghost
            size={42}
            strokeWidth={1.5}
            className="animate-bounce text-slate-400"
          />
        </div>
      </div>

      <div className="mb-8 space-y-4 max-w-sm">
        <div className="inline-flex px-3 py-1 rounded-full bg-amber-50 text-[10px] font-black tracking-[0.2em] text-amber-700 uppercase mb-2">
          Oops! Hasil Nihil
        </div>
        <h3 className="text-3xl font-black tracking-tighter leading-tight text-slate-900">
          RAK KOPI LAGI <br />{" "}
          <span className="text-amber-600">KOSONG MELEMPONG</span>
        </h3>
        <p className="text-sm font-medium leading-relaxed text-slate-500">
          {hasFilters
            ? "Filter yang kamu pasang terlalu ketat, bahkan barista kami pun bingung mencarinya. Coba kurangi sedikit filternya?"
            : "Sepertinya biji kopi favoritmu lagi dalam perjalanan atau belum kami restock. Coba cek beberapa saat lagi!"}
        </p>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center sm:flex-row">
        {hasFilters ? (
          <Button
            onClick={onReset}
            className="overflow-hidden relative gap-3 px-10 h-14 font-black text-white rounded-2xl shadow-xl transition-all group shadow-amber-900/10 active:scale-95 bg-slate-900 hover:bg-amber-600"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700" />
            <RotateCcw
              size={20}
              className="transition-transform duration-500 group-hover:-rotate-180"
            />
            LIHAT SEMUA PRODUK
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="px-8 h-14 text-sm font-bold uppercase rounded-2xl border-2 transition-all border-slate-200 hover:bg-slate-50"
          >
            KEMBALI KE BERANDA
          </Button>
        )}

        <Button
          variant="ghost"
          className="px-8 h-14 font-bold capitalize text-slate-500 hover:text-slate-900"
          onClick={() => document.getElementById("search-input")?.focus()}
        >
          <Search size={18} className="mr-2" />
          Coba Kata Kunci Lain
        </Button>
      </div>

      {/* Footer Label */}
      <div className="flex gap-2 items-center mt-12">
        <div className="w-8 h-px bg-slate-200" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
          End of Search
        </span>
        <div className="w-8 h-px bg-slate-200" />
      </div>
    </div>
  );
}
