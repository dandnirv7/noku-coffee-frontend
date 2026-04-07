import { api } from "@/lib/axios";
import { Summary, SummaryResponseSchema } from "../lib/summary-schema";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const getSummary = async (): Promise<Summary> => {
  const response = await api.get("/dashboard/summary");

  const validated = SummaryResponseSchema.safeParse(response.data);

  if (!validated.success) {
    console.error("API Validation Error:", validated.error);
    throw new Error("Failed to fetch summary");
  }

  return validated.data.data;
};

export const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    placeholderData: keepPreviousData,
  });
};
