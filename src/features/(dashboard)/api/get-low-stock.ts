import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const lowStockSchema = z.object({
  id: z.string(),
  name: z.string(),
  stock: z.number(),
  image: z.string().nullable(),
});

const lowStockResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(lowStockSchema),
});

export type LowStockResponse = z.infer<typeof lowStockResponseSchema>;
export type LowStock = z.infer<typeof lowStockSchema>;

export const getLowStock = async () => {
  const { data } = await api.get("/dashboard/low-stock");

  const validated = lowStockResponseSchema.parse(data);

  if (!validated.success) {
    throw new Error("Failed to fetch low stock");
  }

  return validated.data;
};

export const useLowStock = () => {
  return useQuery({
    queryKey: ["low-stock"],
    queryFn: getLowStock,
  });
};
