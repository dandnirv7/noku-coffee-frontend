import axios from "axios";
import { cookies } from "next/headers";

export const createServerApi = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "ngrok-skip-browser-warning": "true",
      Cookie: cookieHeader,
    },
    withCredentials: true,
  });
};
