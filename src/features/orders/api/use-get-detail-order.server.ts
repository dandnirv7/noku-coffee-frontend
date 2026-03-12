import { createServerApi } from "@/lib/axios-server";
import { OrderDetailResponseSchema } from "../lib/order-schema";

export const getDetailOrder = async (id: string) => {
  const serverApi = await createServerApi();
  const { data } = await serverApi.get(`/orders/${id}`);

  const validated = OrderDetailResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data order dari server tidak valid");
  }

  return validated.data.data;
};
