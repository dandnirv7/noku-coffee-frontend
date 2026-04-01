"use client";

import { Filter, Search } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useMemo, useState, useRef, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOrdersInfinite } from "@/features/orders/api/use-get-orders";
import { orderParamsSchema } from "@/features/orders/lib/order-params";
import { OrderDetail, OrderList } from "@/features/orders/lib/order-schema";
import { OrderCard } from "../common/order-card";
import CancelOrderModal from "../order-detail/cancel-order-modal";
import { OrderEmpty } from "./order-empty";
import { OrderListSkeleton } from "../skeleton/order-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderInnerPage() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetOrdersInfinite();
  const [{ search: searchQuery, status: activeTab }, setParams] =
    useQueryStates(orderParamsSchema, {
      shallow: true,
      history: "replace",
    });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderList | null>(null);

  const filteredOrders = useMemo(() => {
    if (!data) return [];
    const allOrders = data.pages.flatMap((page) => page.data);

    return allOrders.filter((order) => {
      const matchesTab = activeTab === "all" || order.status === activeTab;
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.productNameSnapshot
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
        );
      return matchesTab && matchesSearch;
    });
  }, [data, activeTab, searchQuery]);

  const handleCancelOrder = (order: OrderList) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const handleTabChange = (value: string) => {
    setParams({ status: value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ search: e.target.value });
  };

  return (
    <>
      <main className="container px-4 py-8 mx-auto">
        <PageHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md pt-4 pb-2 -mx-4 px-4 mb-4 border-b md:border-none md:static md:bg-transparent md:backdrop-blur-none md:p-0 md:m-0 flex justify-between items-center gap-4">
            <div className="flex-1 overflow-x-auto pb-2 -mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
              <TabsList className="w-max inline-flex h-11 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground">
                <TabsTrigger value="all" className="px-4">
                  Semua
                </TabsTrigger>
                <TabsTrigger value="PENDING" className="px-4">
                  Menunggu Pembayaran
                </TabsTrigger>
                <TabsTrigger value="PAID" className="px-4">
                  Diproses
                </TabsTrigger>
                <TabsTrigger value="SHIPPED" className="px-4">
                  Dikirim
                </TabsTrigger>
                <TabsTrigger value="COMPLETED" className="px-4">
                  Selesai
                </TabsTrigger>
                <TabsTrigger value="CANCELLED" className="px-4">
                  Dibatalkan
                </TabsTrigger>
              </TabsList>

              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white/50 to-transparent md:hidden" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex shrink-0"
            >
              <Filter className="mr-2 w-4 h-4" />
              Filter
            </Button>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <OrderListSkeleton />
            ) : filteredOrders.length === 0 ? (
              <OrderEmpty searchQuery={searchQuery} activeTab={activeTab} />
            ) : (
              <div className="grid gap-4">
                {filteredOrders.map((order, index) => {
                  if (index === filteredOrders.length - 1) {
                    return (
                      <div ref={lastElementRef} key={order.id}>
                        <OrderCard order={order} onCancel={handleCancelOrder} />
                      </div>
                    );
                  }
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onCancel={handleCancelOrder}
                    />
                  );
                })}
                {isFetchingNextPage && (
                  <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <Skeleton className="w-32 h-5" />
                        <Skeleton className="w-24 h-4" />
                      </div>
                      <Skeleton className="w-20 h-6 rounded-full" />
                    </div>

                    <div className="pt-4 mt-4 space-y-4 border-t border-border">
                      <div className="flex gap-4">
                        <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="w-3/4 h-5" />
                          <Skeleton className="w-1/4 h-4" />
                          <Skeleton className="w-1/2 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-border">
                      <Skeleton className="w-32 h-6" />
                      <div className="flex gap-2">
                        <Skeleton className="w-24 h-9 rounded-xl" />
                        <Skeleton className="w-32 h-9 rounded-xl" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {showCancelModal && selectedOrder && (
        <CancelOrderModal
          order={selectedOrder as unknown as OrderDetail}
          onClose={() => setShowCancelModal(false)}
          onConfirm={() => {
            setShowCancelModal(false);
          }}
        />
      )}
    </>
  );
}

function PageHeader({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col justify-between items-start mb-6 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pesanan Saya</h1>
        <p className="text-gray-500">Lihat dan kelola riwayat pesanan Anda</p>
      </div>
      <div className="mt-4 w-full md:mt-0 md:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
          <Input
            placeholder="Cari pesanan..."
            className="pl-10 w-full md:w-64"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </div>
  );
}
