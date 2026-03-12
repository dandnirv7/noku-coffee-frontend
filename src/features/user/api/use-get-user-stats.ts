import { api } from "@/lib/axios";

import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { z } from "zod";

const UserStatsSchema = z.object({
  totalOrders: z.coerce.number(),
  totalSpent: z.coerce.number(),
  memberSince: z.string(),
});

const UserStatsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: UserStatsSchema,
});

export const getUserStats = async () => {
  const { data } = await api.get("/orders/stats");

  const validated = UserStatsResponseSchema.safeParse(data);

  if (!validated.success) {
    console.error("Schema Error:", validated.error);
    throw new Error("Format data user stats dari server tidak valid");
  }

  return validated.data.data;
};

export const getUserStatsQueryKey = () => ["user-stats"];

export const getUserStatsQueryOptions = () =>
  queryOptions({
    queryKey: getUserStatsQueryKey(),
    queryFn: getUserStats,
  });

type UseGetUserStatsParams = {
  queryConfig?: QueryConfig<typeof getUserStatsQueryOptions>;
};

export const useGetUserStats = ({
  queryConfig,
}: UseGetUserStatsParams = {}) => {
  return useQuery({
    ...getUserStatsQueryOptions(),
    ...queryConfig,
  });
};
