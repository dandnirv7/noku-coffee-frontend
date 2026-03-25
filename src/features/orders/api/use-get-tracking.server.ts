import { createServerApi } from "@/lib/axios-server";
import { TrackingApiResponseSchema } from "../lib/order-schema";

export const getTracking = async (trackingNumber: string) => {
  const serverApi = await createServerApi();
  const { data } = await serverApi.get(`/tracking/${trackingNumber}`);

  const validated = TrackingApiResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data tracking dari server tidak valid");
  }

  return validated.data.data;
};
