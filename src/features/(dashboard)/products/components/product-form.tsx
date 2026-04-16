"use client";

import { IconLoader2, IconSparkles } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  PROCESSES,
  PRODUCT_CATEGORIES,
  PRODUCT_TYPES,
  ROAST_LEVELS,
} from "../constants/product-data";
import { useProductForm, UseProductFormProps } from "../hooks/use-product-form";
import { ProductPreviewSidebar } from "./product-preview-sidebar";

import { FormSelectField } from "@/features/(dashboard)/products/components/form/form-select-field";
import { FormTextField } from "@/features/(dashboard)/products/components/form/form-text-field";
import { FormTextAreaField } from "@/features/(dashboard)/products/components/form/form-textarea-field";
import { ProductImageUploader } from "./product-image-uploader";

const CATEGORY_OPTIONS = PRODUCT_CATEGORIES.map((c) => ({
  label: c.label,
  value: c.id,
}));
const TYPE_OPTIONS = PRODUCT_TYPES.map((pt) => ({
  label: pt.label,
  value: pt.id,
}));
const ROAST_OPTIONS = ROAST_LEVELS.map((rl) => ({ label: rl, value: rl }));
const PROCESS_OPTIONS = PROCESSES.map((p) => ({ label: p, value: p }));

export default function ProductForm(props: UseProductFormProps) {
  const { form, previewData, isEditMode, isPending, isGenerating, handlers } =
    useProductForm(props);

  return (
    <Form {...form}>
      <form onSubmit={handlers.onSubmit} className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <ProductPreviewSidebar
              previewData={previewData}
              isEditMode={isEditMode}
              isPending={isPending}
              onCancel={handlers.handleCancel}
            />
          </div>

          <div className="lg:col-span-8 flex flex-col gap-2">
            <ProductImageUploader
              images={previewData.images}
              isPending={isPending}
              onUpload={handlers.handleImageUpload}
              onRemove={handlers.handleRemoveImage}
            />

            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-6">Informasi Umum</h3>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormTextField
                    control={form.control}
                    name="name"
                    label="Nama Produk"
                    placeholder="Ethiopia Yirgacheffe"
                    required
                    disabled={isPending}
                  />
                  <FormSelectField
                    control={form.control}
                    name="categoryId"
                    label="Kategori"
                    placeholder="Pilih Kategori"
                    options={CATEGORY_OPTIONS}
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <FormTextField
                    control={form.control}
                    name="sku"
                    label="SKU"
                    placeholder="ETH-YIR-001"
                    className="uppercase"
                    required
                    disabled={isPending}
                  />
                  <FormSelectField
                    control={form.control}
                    name="type"
                    label="Jenis Produk"
                    placeholder="Pilih Jenis"
                    options={TYPE_OPTIONS}
                    required
                    disabled={isPending}
                  />
                  <FormTextField
                    control={form.control}
                    name="price"
                    label="Harga Jual (Rp)"
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormTextField
                    control={form.control}
                    name="stock"
                    label="Stok Awal"
                    disabled={isPending}
                  />
                  <FormTextField
                    control={form.control}
                    name="weight"
                    label="Berat (Gram)"
                    placeholder="250"
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-1">Spesifikasi Kopi</h3>
              <p className="text-sm text-slate-500 mb-6">
                Isi detail ini jika jenis produk adalah Biji Kopi.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormTextField
                  control={form.control}
                  name="origin"
                  label="Asal (Origin)"
                  placeholder="Gayo, Aceh"
                  disabled={isPending}
                />
                <FormSelectField
                  control={form.control}
                  name="roastLevel"
                  label="Tingkat Sangrai"
                  placeholder="Pilih Roast Level"
                  options={ROAST_OPTIONS}
                  disabled={isPending}
                />
                <FormSelectField
                  control={form.control}
                  name="process"
                  label="Proses"
                  placeholder="Pilih Proses"
                  options={PROCESS_OPTIONS}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-bold">Deskripsi Produk</h3>
                <Button
                  type="button"
                  onClick={handlers.handleGenerateAI}
                  disabled={isGenerating || !previewData.name || isPending}
                  variant="outline"
                  className="rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 border-orange-200 h-10"
                >
                  {isGenerating ? (
                    <IconLoader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <IconSparkles className="w-4 h-4 mr-2" />
                  )}
                  {isGenerating ? "Sedang Menulis..." : "Generate AI"}
                </Button>
              </div>
              <FormTextAreaField
                control={form.control}
                name="description"
                placeholder="Deskripsikan rasa, rekomendasi seduhan, dan cerita di balik produk ini..."
                rows={6}
                disabled={isPending}
                className={isGenerating ? "opacity-50 animate-pulse" : ""}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
