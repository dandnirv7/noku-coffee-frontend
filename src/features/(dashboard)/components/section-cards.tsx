"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toRupiah } from "@/lib/utils";
import {
  IconArrowUpRight,
  IconCaretDownFilled,
  IconCaretUpFilled,
} from "@tabler/icons-react";
import {
  CircleDollarSign,
  LucideProps,
  PackageOpen,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSummary } from "../api/get-summary";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type StatConfig = {
  key: "revenue" | "products" | "orders" | "customers";
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconColor: string;
  iconBg: string;
  href: string;
  isCurrency?: boolean;
};

const STATS_CONFIG: StatConfig[] = [
  {
    key: "revenue",
    title: "Total Pendapatan",
    icon: CircleDollarSign,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    href: "/dashboard/revenue",
    isCurrency: true,
  },
  {
    key: "products",
    title: "Total Produk",
    icon: PackageOpen,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    href: "/dashboard/products",
  },
  {
    key: "orders",
    title: "Total Pesanan",
    icon: ShoppingBag,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
    href: "/dashboard/orders",
  },
  {
    key: "customers",
    title: "Total Pelanggan",
    icon: Users,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    href: "/dashboard/customers",
  },
];

export function SectionCards() {
  const { data: summary } = useSummary();

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {STATS_CONFIG.map((stat) => {
        const metric = summary?.[stat.key];

        const value = metric?.value ?? 0;
        const trend = metric?.trend ?? 0;

        const isTrendUp = trend >= 0;
        const TrendIcon = isTrendUp ? IconCaretUpFilled : IconCaretDownFilled;

        const trendTextColor = isTrendUp ? "text-green-500" : "text-red-500";

        const periodLabel =
          stat.key === "revenue" || stat.key === "orders"
            ? "Bulan Lalu"
            : "Minggu Lalu";

        return (
          <Card key={stat.key} className="py-2 w-[230px]">
            <CardHeader className="flex justify-between px-4">
              <CardDescription className="text-lg font-semibold">
                {stat.title}
              </CardDescription>

              <CardTitle
                className={cn(
                  "text-2xl font-semibold p-2 rounded-lg",
                  stat.iconBg,
                )}
              >
                <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4">
              <h2 className="text-2xl font-bold">
                {stat.isCurrency ? toRupiah(value) : value}
              </h2>
            </CardContent>

            <CardFooter className="flex items-center justify-between px-4 text-sm">
              <div className="flex items-center gap-1">
                <TrendIcon className={cn("w-4 h-4", trendTextColor)} />

                <span className={cn("text-xs font-medium", trendTextColor)}>
                  {trend}%
                </span>

                <span className="text-xs text-muted-foreground">
                  {periodLabel}
                </span>
              </div>

              <Link
                href={stat.href}
                className="flex items-center text-xs hover:text-orange-500 transition-colors"
              >
                <span>Detail</span>
                <IconArrowUpRight className="w-4 h-4" />
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
