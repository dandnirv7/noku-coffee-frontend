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
  InvoiceSortBy,
  InvoiceStatusFilter,
  useInvoicesTable,
} from "@/features/(dashboard)/hooks/use-invoices-table";
import { useState } from "react";
import { useAdminInvoices } from "../api/get-admin-invoices";
import { adminInvoicesColumns } from "../columns/admin-invoices-columns";

export function AdminInvoicesPage() {
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
  } = useInvoicesTable();

  const [rowSelection, setRowSelection] = useState({});

  const { data: invoicesData } = useAdminInvoices({
    page: pageIndex + 1,
    limit: pageSize,
    status: statusFilter,
    sortBy,
    search: search || undefined,
  });

  const { table } = useDataTable({
    data: invoicesData?.items ?? [],
    columns: adminInvoicesColumns,
    pageIndex,
    pageSize,
    onPageChange: setPageIndex,
    onPageSizeChange: setPageSize,
    rowSelection,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: invoicesData?.total ?? 0,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Invoice</h1>
        <p className="text-muted-foreground text-sm">
          Monitor semua invoice pembayaran
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="Cari invoice atau pelanggan..."
          value={search}
          onChange={setSearch}
        />

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as InvoiceStatusFilter)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="PAID">Dibayar</SelectItem>
            <SelectItem value="PENDING">Belum Dibayar</SelectItem>
            <SelectItem value="EXPIRED">Kedaluwarsa</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as InvoiceSortBy)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
            <SelectItem value="highest">Jumlah Tertinggi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        table={table}
        columnCount={adminInvoicesColumns.length}
        emptyMessage="Tidak ada invoice ditemukan"
      />
    </div>
  );
}
