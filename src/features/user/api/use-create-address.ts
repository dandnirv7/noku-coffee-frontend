import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const createAddressSchema = z.object({
  label: z.string().min(1, "Label alamat diperlukan (misal: Rumah, Kantor)"),
  receiverName: z.string().min(1, "Nama penerima diperlukan"),
  phone: z.string().min(1, "Nomor telepon diperlukan"),
  streetLine1: z.string().min(1, "Alamat lengkap diperlukan"),
  streetLine2: z.string().optional(),
  city: z.string().min(1, "Kota diperlukan"),
  province: z.string().min(1, "Provinsi diperlukan"),
  postalCode: z.string().min(1, "Kode pos diperlukan"),
  isDefault: z.boolean().default(false),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;

export const createAddress = async (data: CreateAddressInput) => {
  const result = await api.post("/addresses", data);
  return result.data;
};

type UseCreateAddressOptions = {
  mutationConfig?: MutationConfig<typeof createAddress>;
};

export const useCreateAddress = ({
  mutationConfig,
}: UseCreateAddressOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    mutationFn: createAddress,
    ...mutationConfig,
  });
};
