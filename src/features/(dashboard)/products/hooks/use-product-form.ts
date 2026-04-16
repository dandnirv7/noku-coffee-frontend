import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { generateProductDescription } from "../api/generate-description.server";
import { useCreateProduct } from "../api/use-create-product";
import { useUpdateProduct } from "../api/use-update-product";
import { ProductFormData, productFormSchema } from "../lib/product-form-schema";

const MAX_IMAGES = 6;

export interface UseProductFormProps {
  initialData?: ProductFormData & { id?: string };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function useProductForm({
  initialData,
  onSuccess,
  onCancel,
}: UseProductFormProps) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const isEditMode = !!initialData?.id;

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const isPending = isCreating || isUpdating;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormData>,
    defaultValues: initialData || {
      name: "",
      categoryId: "",
      type: "",
      sku: "",
      price: 0,
      stock: 0,
      weight: 0,
      origin: "",
      roastLevel: "",
      process: "",
      description: "",
      images: [],
    },
  });

  const previewData = form.watch();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentImages = form.getValues("images") || [];

    if (currentImages.length + files.length > MAX_IMAGES) {
      toast.error(`Maksimal ${MAX_IMAGES} gambar per produk`);
      return;
    }

    form.setValue("images", [...currentImages, ...files], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRemoveImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    indexToRemove: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    form.setValue(
      "images",
      previewData.images.filter((_, index) => index !== indexToRemove),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const handleGenerateAI = async () => {
    if (!previewData.name) {
      toast.error("Nama produk wajib diisi sebelum menggunakan AI.");
      return;
    }

    setIsGenerating(true);
    try {
      const generatedText = await generateProductDescription({
        name: previewData.name,
        category: previewData.categoryId,
        origin: previewData.origin || "",
        roastLevel: previewData.roastLevel || "",
        process: previewData.process || "",
      });
      form.setValue("description", generatedText, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengenerate deskripsi.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    const handleSuccess = (message: string) => {
      toast.success(message);
      if (onSuccess) onSuccess();
      else router.push("/dashboard/products");
    };

    const handleError = (action: string, error: unknown) => {
      const errorMsg =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      toast.error(`Gagal ${action} produk`, { description: errorMsg });
    };

    if (isEditMode && initialData?.id) {
      updateProduct(
        { id: initialData.id, data },
        {
          onSuccess: () => handleSuccess("Produk berhasil diperbarui"),
          onError: (error) => handleError("memperbarui", error),
        },
      );
    } else {
      createProduct(data, {
        onSuccess: () => handleSuccess("Produk berhasil ditambahkan"),
        onError: (error) => handleError("menambahkan", error),
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  return {
    form,
    previewData,
    isEditMode,
    isPending,
    isGenerating,
    handlers: {
      handleImageUpload,
      handleRemoveImage,
      handleGenerateAI,
      onSubmit: form.handleSubmit(onSubmit),
      handleCancel,
    },
  };
}
