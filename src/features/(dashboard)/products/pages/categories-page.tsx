"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/features/(dashboard)/components/data-table";
import { useDataTable } from "@/features/(dashboard)/hooks/use-data-table";
import { api } from "@/lib/axios";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Category, useCategories } from "../api/get-categories";
import { getCategoriesColumns } from "../components/columns/categories-columns";
import { useSearchFilters } from "../hooks/use-search-filters";
import { useConfirm } from "@/hooks/use-confirm";

function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => api.post("/categories", { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Kategori berhasil ditambahkan");
    },
    onError: () => toast.error("Gagal menambahkan kategori"),
  });
}

function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousQueries = queryClient.getQueriesData({ queryKey: ["categories"] });

      queryClient.setQueriesData({ queryKey: ["categories"] }, (old: any) => {
        if (!old || !old.items) return old;
        return {
          ...old,
          items: old.items.filter((item: any) => item.id !== id),
        };
      });

      return { previousQueries };
    },
    onSuccess: () => {
      toast.success("Kategori berhasil dihapus");
    },
    onError: (_err, _id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
      toast.error("Gagal menghapus kategori");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function CategoriesPage() {
  const [ConfirmDialog, confirm] = useConfirm();
  const { params, setPage, setPerPage } = useSearchFilters();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, isLoading } = useCategories(params);

  const categories = data?.items ?? [];
  const total = data?.total ?? 0;

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const columns = useMemo(
    () =>
      getCategoriesColumns({
        onDelete: async (category: Category) => {
          const ok = await confirm({
            title: "Hapus Kategori",
            description: `Yakin hapus kategori "${category.name}"? Aksi ini tidak dapat dibatalkan.`,
            variant: "destructive",
            confirmText: "Hapus",
          });
          if (ok) {
            deleteCategory(category.id);
          }
        },
      }),
    [deleteCategory, confirm],
  );

  const { table } = useDataTable({
    data: categories,
    columns,
    pageIndex: params.page - 1,
    pageSize: params.perPage,
    onPageChange: (index) => setPage(index + 1),
    onPageSizeChange: (size) => setPerPage(size),
    rowSelection,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: total,
  });

  const handleCreate = () => {
    if (!newCategoryName.trim()) return;
    createCategory(newCategoryName.trim(), {
      onSuccess: () => {
        setNewCategoryName("");
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <div className="space-y-6">
      <ConfirmDialog />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kategori</h1>
          <p className="text-muted-foreground text-sm">
            Kelola kategori produk
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <IconPlus className="mr-2 h-4 w-4" />
          Tambah Kategori
        </Button>
      </div>

      <DataTable
        table={table}
        isLoading={isLoading}
        columnCount={columns.length}
        emptyMessage="Belum ada kategori"
        showPagination={false}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kategori Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="category-name">Nama Kategori</Label>
            <Input
              id="category-name"
              placeholder="Contoh: Single Origin"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
