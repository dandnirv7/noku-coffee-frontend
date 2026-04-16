"use client";

import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RowSelectionState } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DebouncedInput } from "@/components/shared/debounced-input";
import { DataTable } from "@/features/(dashboard)/components/data-table";
import { useDataTable } from "@/features/(dashboard)/hooks/use-data-table";
import { Product } from "@/features/product/lib/products-schema";
import { api } from "@/lib/axios";
import { useAdminProducts } from "../api/get-admin-products";
import { useCategories } from "../api/get-categories";
import { getProductsColumns } from "../components/columns/products-columns";
import { useSearchFilters } from "../hooks/use-search-filters";

function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Produk berhasil dinonaktifkan");
    },
    onError: () => toast.error("Gagal menonaktifkan produk"),
  });
}

function useRestoreProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/products/${id}/restore`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Produk berhasil dipulihkan");
    },
    onError: () => toast.error("Gagal memulihkan produk"),
  });
}

export function AdminProductsPage() {
  const router = useRouter();

  const {
    params,
    setPage,
    setPerPage,
    updateSearch,
    updateSort,
    updateCategory,
    updateType,
  } = useSearchFilters();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data: categoriesData = [], isLoading: loadingCategories } =
    useCategories();

  const formatFilterParam = (
    value: string | string[] | undefined | null,
  ): string[] | undefined => {
    if (!value) return undefined;

    if (Array.isArray(value)) {
      return value.includes("all") ? undefined : value;
    }

    if (value === "all") return undefined;

    return [value];
  };

  const { data: productsData, isLoading: loadingProducts } = useAdminProducts({
    page: params.page,
    perPage: params.perPage,
    search: params.search || undefined,
    category: formatFilterParam(params.category),
    type: formatFilterParam(params.type),
    sort: params.sort === "newest" ? undefined : params.sort,
  });

  const isLoading = loadingCategories || loadingProducts;

  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: restoreProduct } = useRestoreProduct();

  const columns = useMemo(
    () =>
      getProductsColumns({
        onEdit: (product: Product) => {
          router.push(`/dashboard/products/${product.slug}/edit`);
        },
        onDelete: (product: Product) => deleteProduct(product.id),
        onRestore: (product: Product) => restoreProduct(product.id),
      }),
    [deleteProduct, restoreProduct, router],
  );

  const tableData = useMemo(() => productsData?.items ?? [], [productsData]);

  const { table } = useDataTable({
    data: tableData,
    columns,
    pageIndex: params.page - 1,
    pageSize: params.perPage,
    onPageChange: (index) => setPage(index + 1),
    onPageSizeChange: (size) => setPerPage(size),
    rowSelection,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: productsData?.total ?? 0,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Katalog Produk</h1>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/create">
            <IconPlus className="mr-2 h-4 w-4" />
            Tambah Produk
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <DebouncedInput
            value={params.search}
            onChange={updateSearch}
            placeholder="Cari produk..."
            className="rounded-lg"
          />
        </div>

        <Select
          value={params.category ?? "all"}
          onValueChange={(val) => {
            updateCategory(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]" size="lg">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categoriesData.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug ?? cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={params.type || "all"}
          onValueChange={(val) => {
            updateType(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[140px]" size="lg">
            <SelectValue placeholder="Semua Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="BEAN">BEAN</SelectItem>
            <SelectItem value="GEAR">GEAR</SelectItem>
            <SelectItem value="BUNDLE">BUNDLE</SelectItem>
          </SelectContent>
        </Select>

        <Select value={params.sort} onValueChange={updateSort}>
          <SelectTrigger className="w-[160px]" size="lg">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Terbaru</SelectItem>
            <SelectItem value="name_asc">Nama (A-Z)</SelectItem>
            <SelectItem value="name_desc">Nama (Z-A)</SelectItem>
            <SelectItem value="price_asc">Harga Terendah</SelectItem>
            <SelectItem value="price_desc">Harga Tertinggi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        key={
          params.page +
          params.perPage +
          params.search +
          params.category +
          params.type +
          params.sort
        }
        table={table}
        isLoading={isLoading}
        columnCount={columns.length}
        emptyMessage="Tidak ada produk ditemukan"
      />
    </div>
  );
}
