import { api } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TrackingApiResponseSchema } from "../lib/order-schema";
import { QueryConfig } from "@/lib/react-query";

export const getTracking = async (trackingNumber: string) => {
  const { data } = await api.get(`/tracking/${trackingNumber}`);

  const validated = TrackingApiResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data tracking dari server tidak valid");
  }

  return validated.data.data;
};

export const getTrackingOptions = (trackingNumber: string) =>
  queryOptions({
    queryKey: ["tracking", trackingNumber],
    queryFn: () => getTracking(trackingNumber),
  });

export const useGetTracking = (
  trackingNumber: string,
  queryConfig?: QueryConfig<typeof getTracking>,
) => {
  return useQuery({
    ...getTrackingOptions(trackingNumber),
    ...queryConfig,
  });
};
