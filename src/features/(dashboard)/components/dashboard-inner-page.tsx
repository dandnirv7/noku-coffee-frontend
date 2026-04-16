"use client";

import { ChartRevenueOrders } from "@/features/(dashboard)/components/chart-revenue-orders";
import { LowStockAlert } from "@/features/(dashboard)/components/low-stock-alert";
import { RecentOrdersTable } from "@/features/(dashboard)/components/recent-orders-table";
import { SectionCards } from "@/features/(dashboard)/components/section-cards";
import { TopProducts } from "@/features/(dashboard)/components/top-products";
import OrderStats from "../components/order-stats";

export default function DashboardInnerPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="col-span-1 lg:col-span-2">
            <ChartRevenueOrders />
          </div>
          <OrderStats />
        </div>

        <div className="w-full">
          <RecentOrdersTable />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <TopProducts />
          <LowStockAlert />
        </div>
      </div>
    </div>
  );
}
