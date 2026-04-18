"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/features/(dashboard)/components/data-table";
import { SearchInput } from "@/features/(dashboard)/components/search-input";
import { useDataTable } from "@/features/(dashboard)/hooks/use-data-table";
import {
  OrderSortBy,
  OrderStatusFilter,
  useOrdersTable,
} from "@/features/(dashboard)/hooks/use-orders-table";
import { useConfirm } from "@/hooks/use-confirm";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminOrder, useAdminOrders } from "../api/get-admin-orders";
import { getAdminOrdersColumns } from "../columns/admin-orders-columns";

function useManualApprove() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/orders/${id}/manual-approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Pesanan berhasil disetujui");
    },
    onError: () => toast.error("Gagal menyetujui pesanan"),
  });
}

function useApproveRefund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      api.post(`/orders/${id}/refund-approve`, { notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Refund berhasil disetujui");
    },
    onError: () => toast.error("Gagal menyetujui refund"),
  });
}

export function AdminOrdersPage() {
  const [ConfirmDialog, confirm] = useConfirm();
  const {
    statusFilter,
    sortBy,
    search,
    pageIndex,
    pageSize,
    setStatusFilter,
    setSortBy,
    setSearch,
    setPageIndex,
    setPageSize,
  } = useOrdersTable();

  const [rowSelection, setRowSelection] = useState({});

  const { data: ordersData } = useAdminOrders({
    page: pageIndex + 1,
    limit: pageSize,
    status: statusFilter,
    sortBy,
    search: search || undefined,
  });

  const { mutate: manualApprove } = useManualApprove();
  const { mutate: approveRefund } = useApproveRefund();

  const columns = useMemo(
    () =>
      getAdminOrdersColumns({
        onManualApprove: async (order: AdminOrder) => {
          const ok = await confirm({
            title: "Setujui Pesanan",
            description: `Setujui pesanan ${order.orderNumber} secara manual?`,
            confirmText: "Setujui",
          });
          if (ok) {
            manualApprove(order.id);
          }
        },
        onApproveRefund: async (order: AdminOrder) => {
          const ok = await confirm({
            title: "Setujui Refund",
            description: `Setujui refund untuk pesanan ${order.orderNumber}?`,
            confirmText: "Setujui",
          });
          if (ok) {
            approveRefund({ id: order.id, notes: "Approved by admin" });
          }
        },
      }),
    [manualApprove, approveRefund, confirm],
  );

  const { table } = useDataTable({
    data: ordersData?.items ?? [],
    columns,
    pageIndex,
    pageSize,
    onPageChange: setPageIndex,
    onPageSizeChange: setPageSize,
    rowSelection,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: ordersData?.total ?? 0,
  });

  return (
    <div className="space-y-6">
      <ConfirmDialog />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pesanan</h1>
        <p className="text-muted-foreground text-sm">
          Kelola semua pesanan pelanggan
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="Cari no. pesanan atau pelanggan..."
          value={search}
          onChange={setSearch}
        />

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as OrderStatusFilter)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PAID">Dibayar</SelectItem>
            <SelectItem value="COMPLETED">Selesai</SelectItem>
            <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
            <SelectItem value="REFUND_REQUESTED">Refund Diminta</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as OrderSortBy)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
            <SelectItem value="highest">Total Tertinggi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        table={table}
        columnCount={columns.length}
        emptyMessage="Tidak ada pesanan ditemukan"
      />
    </div>
  );
}
