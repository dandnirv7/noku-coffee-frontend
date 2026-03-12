"use client";

import { UserHeader } from "./user-header";
import { UserStats } from "./user-stats";
import { RecentOrders } from "./recent-orders";
import { PersonalizedDeals } from "./personalized-deals";
import { QuickActions } from "./quick-actions";
import { FrequentlyBought } from "./frequently-bought";
import { DeliveryPreferences } from "./delivery-preferences";

export function UserPageInner() {
  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900">
      <main className="container mx-auto px-4 md:px-10 py-12">
        <UserHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UserStats />

            <RecentOrders />

            <PersonalizedDeals />
          </div>

          <div className="space-y-6">
            <QuickActions />

            <FrequentlyBought />

            <DeliveryPreferences />
          </div>
        </div>
      </main>
    </div>
  );
}
