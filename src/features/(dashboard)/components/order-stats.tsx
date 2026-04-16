"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrderStats } from "../api/get-order-stats";
import { OrderPeriodUI, useOrdersFilter } from "../hooks/use-orders-filter";

export default function OrderStats() {
  const [period, setPeriod] = useOrdersFilter();

  const { data: orderStats, isLoading, isFetching } = useOrderStats({ period });

  const handleChange = (value: string) => {
    setPeriod(value as OrderPeriodUI);
  };

  if (isLoading) {
    return (
      <div className="bg-white px-6 py-4 rounded-xl shadow-sm border flex flex-col w-full h-[430px]">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-40 bg-muted animate-pulse rounded" />
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        </div>
        <div className="grow flex items-center justify-center py-2">
          <div className="w-48 h-48 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-auto pt-4">
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  const selesai = orderStats?.data.selesai ?? 0;
  const menunggu = orderStats?.data.menunggu ?? 0;
  const gagal = orderStats?.data.gagal ?? 0;

  const total = selesai + menunggu + gagal;

  const selesaiPct = total ? (selesai / total) * 100 : 0;
  const menungguPct = total ? (menunggu / total) * 100 : 0;
  const gagalPct = total ? (gagal / total) * 100 : 0;

  return (
    <div className="bg-white px-6 py-4 rounded-xl shadow-sm border flex flex-col w-full relative">
      {isFetching && !isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-all">
          <span className="text-sm font-medium text-muted-foreground">
            Memperbarui data...
          </span>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Statistik Pesanan</h2>

        <Select value={period} onValueChange={handleChange}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Pilih" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="monthly">Bulanan</SelectItem>
              <SelectItem value="weekly">Mingguan</SelectItem>
              <SelectItem value="daily">Harian</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grow flex items-center justify-center py-2">
        <div className="w-48 h-48 relative">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 42 42"
            className="-rotate-90"
          >
            <circle
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke="#4f46e5"
              strokeWidth="8"
              strokeDasharray={`${selesaiPct} 100`}
            />

            <circle
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke="#fb923c"
              strokeWidth="8"
              strokeDasharray={`${menungguPct} 100`}
              strokeDashoffset={`-${selesaiPct}`}
            />

            <circle
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke="#ef4444"
              strokeWidth="8"
              strokeDasharray={`${gagalPct} 100`}
              strokeDashoffset={`-${selesaiPct + menungguPct}`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-slate-800">{total}</span>
            <span className="text-xs text-slate-500 font-medium">Total</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-auto text-xs md:text-sm pt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#4f46e5]" />
          <span className="text-slate-500 font-medium">
            Selesai ({selesai})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#fb923c]" />
          <span className="text-slate-500 font-medium">
            Menunggu ({menunggu})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#ef4444]" />
          <span className="text-slate-500 font-medium">Gagal ({gagal})</span>
        </div>
      </div>
    </div>
  );
}
