import { authClient } from "@/features/auth/lib/auth-client";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "ngrok-skip-browser-warning": "true",
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const { data: session } = await authClient.getSession();

  if (session?.session?.token) {
    config.headers.Authorization = `Bearer ${session.session.token}`;
  }

  return config;
});
