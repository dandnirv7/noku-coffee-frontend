"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/features/(dashboard)/components/data-table";
import { useDataTable } from "@/features/(dashboard)/hooks/use-data-table";
import {
  useCustomersTable,
  CustomerSortBy,
} from "@/features/(dashboard)/hooks/use-customers-table";
import {
  useReviewsTable,
  ReviewRatingFilter,
  ReviewSortBy,
} from "@/features/(dashboard)/hooks/use-customers-table";
import { customersColumns } from "../columns/customers-columns";
import { getReviewsColumns } from "../columns/reviews-columns";
import { useAdminCustomers } from "../api/get-customers";
import { useAdminReviews, AdminReview } from "../api/get-reviews";
import { SearchInput } from "@/features/(dashboard)/components/search-input";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/reviews/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["admin-reviews"] });
      const previousQueries = queryClient.getQueriesData({ queryKey: ["admin-reviews"] });

      queryClient.setQueriesData({ queryKey: ["admin-reviews"] }, (old: any) => {
        if (!old || !old.items) return old;
        return {
          ...old,
          items: old.items.filter((item: any) => item.id !== id),
        };
      });

      return { previousQueries };
    },
    onSuccess: () => {
      toast.success("Ulasan berhasil dihapus");
    },
    onError: (_err, _id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
      toast.error("Gagal menghapus ulasan");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });
}

function CustomersTab() {
  const {
    search,
    sortBy,
    pageIndex,
    pageSize,
    setSearch,
    setSortBy,
    setPageIndex,
    setPageSize,
  } = useCustomersTable();

  const [rowSelection, setRowSelection] = useState({});

  const { data: customersData } = useAdminCustomers({
    page: pageIndex + 1,
    limit: pageSize,
    search: search || undefined,
    sortBy,
  });

  const { table } = useDataTable({
    data: customersData?.items ?? [],
    columns: customersColumns,
    pageIndex,
    pageSize,
    onPageChange: setPageIndex,
    onPageSizeChange: setPageSize,
    rowSelection,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: customersData?.total ?? 0,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="Cari nama atau email..."
          value={search}
          onChange={setSearch}
        />
        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as CustomerSortBy)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Bergabung Terbaru</SelectItem>
            <SelectItem value="oldest">Bergabung Terlama</SelectItem>
            <SelectItem value="most-orders">Pesanan Terbanyak</SelectItem>
            <SelectItem value="highest-spend">Belanja Tertinggi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        table={table}
        columnCount={customersColumns.length}
        emptyMessage="Belum ada pelanggan terdaftar"
      />
    </div>
  );
}

function ReviewsTab() {
  const [ConfirmDialog, confirm] = useConfirm();
  const {
    ratingFilter,
    sortBy,
    search,
    pageIndex,
    pageSize,
    setRatingFilter,
    setSortBy,
    setSearch,
    setPageIndex,
    setPageSize,
  } = useReviewsTable();

  const { data: reviewsData } = useAdminReviews({
    page: pageIndex + 1,
    limit: pageSize,
    rating: ratingFilter,
    sortBy,
    search: search || undefined,
  });

  const { mutate: deleteReview } = useDeleteReview();

  const reviewsColumns = useMemo(
    () =>
      getReviewsColumns({
        onDelete: async (review: AdminReview) => {
          const ok = await confirm({
            title: "Hapus Ulasan",
            description: "Yakin hapus ulasan ini?",
            variant: "destructive",
            confirmText: "Hapus",
          });
          if (ok) deleteReview(review.id);
        },
      }),
    [deleteReview, confirm],
  );

  const { table } = useDataTable({
    data: reviewsData?.items ?? [],
    columns: reviewsColumns,
    pageIndex,
    pageSize,
    onPageChange: setPageIndex,
    onPageSizeChange: setPageSize,
    manualPagination: true,
    rowCount: reviewsData?.total ?? 0,
  });

  return (
    <div className="space-y-4">
      <ConfirmDialog />
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="Cari produk atau pelanggan..."
          value={search}
          onChange={setSearch}
        />
        <Select
          value={ratingFilter}
          onValueChange={(v) => setRatingFilter(v as ReviewRatingFilter)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Semua Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Rating</SelectItem>
            <SelectItem value="5">⭐ 5</SelectItem>
            <SelectItem value="4">⭐ 4</SelectItem>
            <SelectItem value="3">⭐ 3</SelectItem>
            <SelectItem value="2">⭐ 2</SelectItem>
            <SelectItem value="1">⭐ 1</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as ReviewSortBy)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
            <SelectItem value="highest">Rating Tertinggi</SelectItem>
            <SelectItem value="lowest">Rating Terendah</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        table={table}
        columnCount={reviewsColumns.length}
        emptyMessage="Belum ada ulasan"
      />
    </div>
  );
}

export function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pelanggan</h1>
        <p className="text-muted-foreground text-sm">
          Kelola pelanggan dan ulasan produk
        </p>
      </div>
      <Tabs defaultValue="customers">
        <TabsList>
          <TabsTrigger value="customers">Semua Pelanggan</TabsTrigger>
          <TabsTrigger value="reviews">Ulasan</TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="mt-4">
          <CustomersTab />
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
