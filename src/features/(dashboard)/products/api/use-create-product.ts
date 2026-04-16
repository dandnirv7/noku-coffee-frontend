import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductFormData } from "../lib/product-form-schema";

export const createProduct = async (data: ProductFormData) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key !== "images" && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  data.images.forEach((file: unknown) => {
    if (
      file instanceof File ||
      (typeof file === "object" && file !== null && "size" in file)
    ) {
      formData.append(
        "image",
        file as Blob,
        (file as File).name || "product_image.jpg",
      );
    }
  });

  const result = await api.post("/products", formData);
  return result.data;
};

type UseCreateProductOptions = {
  mutationConfig?: MutationConfig<typeof createProduct>;
};

export const useCreateProduct = ({
  mutationConfig,
}: UseCreateProductOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation<UseCreateProductOptions, Error, ProductFormData>({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    mutationFn: createProduct,
    ...mutationConfig,
  });
};
