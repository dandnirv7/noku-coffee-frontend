import { IconLoader2 } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toRupiah } from "@/lib/utils";
import { ProductFormData } from "../lib/product-form-schema";
import ImagePreview from "./image-preview";

interface ProductPreviewSidebarProps {
  previewData: ProductFormData;
  isEditMode: boolean;
  isPending: boolean;
  onCancel: () => void;
}

export function ProductPreviewSidebar({
  previewData,
  isEditMode,
  isPending,
  onCancel,
}: ProductPreviewSidebarProps) {
  const images = previewData.images || [];

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 sticky top-8">
      <div className="w-full aspect-square bg-slate-100 rounded-2xl mb-5 overflow-hidden relative flex flex-col items-center justify-center border border-slate-200">
        {images.length > 0 ? (
          <ImagePreview
            src={images[0]}
            alt="Preview Produk Utama"
            width={500}
            height={500}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <Image
            src="https://placehold.co/500x500/f8fafc/94a3b8?text=500x500\n+Preview+Produk"
            alt="Preview Produk Utama"
            width={500}
            height={500}
            className="w-full h-full object-cover"
            unoptimized
          />
        )}
      </div>

      <div className="px-1">
        <h2 className="text-xl font-bold leading-tight mb-2 wrap-break-words">
          {previewData.name || "Nama Produk"}
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-lg text-orange-600 line-clamp-1">
            {toRupiah(previewData.price || 0)}
          </span>
        </div>

        <p className="text-sm text-slate-500 mb-6 line-clamp-3 min-h-[60px] whitespace-pre-wrap">
          {previewData.description || "Deskripsi produk akan tampil di sini."}
        </p>

        <div className="bg-stone-50 rounded-xl p-4 mb-8 space-y-3 border border-stone-100">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">SKU</span>
            <span className="font-semibold uppercase">
              {previewData.sku || "-"}
            </span>
          </div>
          {previewData.origin && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Asal</span>
              <span className="font-semibold text-right max-w-[150px] truncate">
                {previewData.origin}
              </span>
            </div>
          )}
          {previewData.roastLevel && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Sangrai</span>
              <span className="font-semibold">{previewData.roastLevel}</span>
            </div>
          )}
          {previewData.process && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Proses</span>
              <span className="font-semibold">{previewData.process}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-xs pt-3 border-t border-stone-200">
            <span className="text-slate-500">Berat / Stok</span>
            <span className="font-semibold">
              {previewData.weight || 0}g / {previewData.stock || 0} pcs
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1 rounded-xl h-12"
            disabled={isPending}
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-xl h-12 bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isPending && (
              <IconLoader2 className="animate-spin mr-2" size={18} />
            )}
            {isEditMode ? "Perbarui" : "Simpan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
