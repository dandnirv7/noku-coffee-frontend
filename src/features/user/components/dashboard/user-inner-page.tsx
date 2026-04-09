"use client";

import QuickCategories from "@/components/shared/quick-categories";
import FrequentlyBought from "./frequently-bought";
import PointsGoal from "./points-goal";
import { QuickActions } from "./quick-actions";
import UserAddress from "./user-address";
import { RecentOrders } from "./recent-orders";
import { TopSellingProducts } from "./top-selling-products";
import { UserStats } from "./user-stats";

export default function UserInnerPage() {
  return (
    <main className="px-4 py-6 mx-auto mb-20 md:mb-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <PointsGoal />

          <UserStats />

          <RecentOrders />

          <QuickCategories />

          <TopSellingProducts />
        </div>

        <div className="hidden space-y-6 md:block">
          <QuickActions />

          <FrequentlyBought />

          <UserAddress />
        </div>
      </div>
    </main>
  );
}
