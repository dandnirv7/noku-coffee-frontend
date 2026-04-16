import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductFormData } from "../lib/product-form-schema";

type UpdateProductInput = {
  id: string;
  data: Partial<ProductFormData>;
};

export const updateProduct = async ({ id, data }: UpdateProductInput) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key !== "images" && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (data.images) {
    data.images.forEach((img: unknown) => {
      if (
        img instanceof File ||
        (typeof img === "object" && img !== null && "size" in img)
      ) {
        formData.append(
          "image",
          img as Blob,
          (img as File).name || "product_image.jpg",
        );
      } else {
        formData.append("images", String(img));
      }
    });
  }

  const result = await api.patch(`/products/${id}`, formData);

  return result.data;
};

type UseUpdateProductOptions = {
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export const useUpdateProduct = ({
  mutationConfig,
}: UseUpdateProductOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation<UseUpdateProductOptions, Error, UpdateProductInput>({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    mutationFn: updateProduct,
    ...mutationConfig,
  });
};
