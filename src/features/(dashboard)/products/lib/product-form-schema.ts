import z from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  type: z.string().min(1, "Jenis produk wajib dipilih"),
  sku: z
    .string()
    .min(3, "SKU minimal 3 karakter")
    .max(12, "SKU maksimal 12 karakter"),

  price: z.coerce.number().min(1, "Harga tidak boleh 0"),
  stock: z.coerce.number().min(0).optional(),
  weight: z.coerce.number().min(0).optional(),

  origin: z.string().optional(),
  roastLevel: z.string().optional(),
  process: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.any()).default([]),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
