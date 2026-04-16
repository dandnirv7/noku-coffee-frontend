import { isAxiosError } from "axios";
import { Summary, SummaryResponseSchema } from "../lib/summary-schema";
import { useQuery } from "@tanstack/react-query";
import { api as clientApi } from "@/lib/axios";

export const getSummary = async (): Promise<Summary> => {
  try {
    const response = await clientApi.get("/dashboard/summary");

    const validated = SummaryResponseSchema.safeParse(response.data);

    if (!validated.success) {
      console.error("API Validation Error:", validated.error);
      throw new Error("Invalid data format received from server");
    }

    return validated.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized: Session expired or invalid token");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch dashboard summary",
      );
    }
    throw error;
  }
};

export const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });
};
