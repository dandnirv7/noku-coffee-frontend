"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/features/(dashboard)/components/data-table";
import { useDataTable } from "@/features/(dashboard)/hooks/use-data-table";
import {
  usePromosTable,
  PromoStatusFilter,
} from "@/features/(dashboard)/hooks/use-promos-table";
import { getPromosColumns } from "../columns/promos-columns";
import {
  useAdminPromos,
  useCreatePromo,
  useUpdatePromo,
  useDeletePromo,
  AdminPromo,
  CreatePromoDto,
} from "../api/promos-api";
import { IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { SearchInput } from "@/features/(dashboard)/components/search-input";

const defaultForm: CreatePromoDto = {
  code: "",
  description: "",
  discountType: "PERCENTAGE",
  discountValue: 10,
  minOrderAmount: 0,
  maxUsage: undefined,
  expiresAt: "",
};

export function PromosPage() {
  const [ConfirmDialog, confirm] = useConfirm();
  const [form, setForm] = useState<CreatePromoDto>(defaultForm);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);

  const {
    search,
    statusFilter,
    pageIndex,
    pageSize,
    setSearch,
    setStatusFilter,
    setPageIndex,
    setPageSize,
  } = usePromosTable();

  const isActiveParam =
    statusFilter === "active"
      ? true
      : statusFilter === "inactive"
        ? false
        : undefined;

  const { data: promosData } = useAdminPromos({
    page: pageIndex + 1,
    limit: pageSize,
    search: search || undefined,
    isActive: isActiveParam,
  });

  const { mutate: createPromo, isPending: isCreating } = useCreatePromo();
  const { mutate: updatePromo } = useUpdatePromo();
  const { mutate: deletePromo } = useDeletePromo();

  const columns = useMemo(
    () =>
      getPromosColumns({
        onEdit: (promo: AdminPromo) => {
          setForm({
            code: promo.code,
            description: promo.description ?? "",
            discountType: promo.discountType,
            discountValue: promo.discountValue,
            minOrderAmount: promo.minOrderAmount ?? 0,
            maxUsage: promo.maxUsage ?? undefined,
            expiresAt: promo.expiresAt ?? "",
          });
          setEditingPromoId(promo.id);
        },
        onToggle: (promo: AdminPromo) => {
          updatePromo({ id: promo.id, dto: { isActive: !promo.isActive } });
        },
        onDelete: async (promo: AdminPromo) => {
          const ok = await confirm({
            title: "Hapus Promo",
            description: `Yakin hapus promo "${promo.code}"?`,
            variant: "destructive",
            confirmText: "Hapus",
          });
          if (ok) deletePromo(promo.id);
        },
      }),
    [updatePromo, deletePromo, confirm],
  );

  const { table } = useDataTable({
    data: promosData?.items ?? [],
    columns,
    pageIndex,
    pageSize,
    onPageChange: setPageIndex,
    onPageSizeChange: setPageSize,
    manualPagination: true,
    rowCount: promosData?.total ?? 0,
  });

  const isModalOpen = isCreateModalOpen || !!editingPromoId;

  const handleSave = () => {
    if (editingPromoId) {
      updatePromo(
        { id: editingPromoId, dto: form },
        {
          onSuccess: () => {
            setEditingPromoId(null);
            setForm(defaultForm);
          },
        },
      );
    } else {
      createPromo(form, {
        onSuccess: () => {
          setIsCreateModalOpen(false);
          setForm(defaultForm);
        },
      });
    }
  };

  const handleClose = () => {
    setEditingPromoId(null);
    setIsCreateModalOpen(false);
    setForm(defaultForm);
  };

  return (
    <div className="space-y-6">
      <ConfirmDialog />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Promo & Diskon</h1>
          <p className="text-muted-foreground text-sm">
            Kelola kode promo dan diskon
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <IconPlus className="mr-2 h-4 w-4" />
          Buat Promo
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="Cari kode promo..."
          value={search}
          onChange={setSearch}
        />
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as PromoStatusFilter)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Nonaktif</SelectItem>
            <SelectItem value="expired">Kedaluwarsa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        table={table}
        columnCount={columns.length}
        emptyMessage="Belum ada promo dibuat"
      />

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && handleClose()}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingPromoId ? "Edit Promo" : "Buat Promo Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="code">Kode Promo</Label>
                <Input
                  id="code"
                  placeholder="NOKU20"
                  value={form.code}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      code: e.target.value.toUpperCase(),
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Tipe Diskon</Label>
                <Select
                  value={form.discountType}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      discountType: v as "PERCENTAGE" | "FIXED",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Persentase (%)</SelectItem>
                    <SelectItem value="FIXED">Nominal (Rp)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="discountValue">
                  Nilai Diskon{" "}
                  {form.discountType === "PERCENTAGE" ? "(%)" : "(Rp)"}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  min={0}
                  value={form.discountValue}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      discountValue: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="minOrder">Min. Order (Rp)</Label>
                <Input
                  id="minOrder"
                  type="number"
                  min={0}
                  value={form.minOrderAmount ?? 0}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      minOrderAmount: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="maxUsage">Maks. Penggunaan</Label>
                <Input
                  id="maxUsage"
                  type="number"
                  min={1}
                  placeholder="Tidak terbatas"
                  value={form.maxUsage ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      maxUsage: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="expiresAt">Berlaku Hingga</Label>
                <Input
                  id="expiresAt"
                  type="datetime-local"
                  value={form.expiresAt ? form.expiresAt.slice(0, 16) : ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      expiresAt: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : "",
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Deskripsi (opsional)</Label>
              <Input
                id="description"
                placeholder="Promo pelanggan baru..."
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button onClick={handleSave} disabled={isCreating}>
              {isCreating ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
