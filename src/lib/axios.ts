import { authClient } from "@/features/auth/lib/auth-client";
import axios from "axios";

type BetterAuthSession = typeof authClient.$Infer.Session;

interface AuthSessionResponse {
  data: BetterAuthSession | null;
  error?: unknown;
}

export const api = axios.create({
  baseURL:
    typeof window !== "undefined"
      ? "/api"
      : process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "ngrok-skip-browser-warning": "true",
  },
  withCredentials: true,
});

let sessionPromise: Promise<AuthSessionResponse | null> | null = null;

api.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") return config;

  if (!sessionPromise) {
    sessionPromise = authClient
      .getSession()
      .catch(() => null) as Promise<AuthSessionResponse | null>;
  }

  const response = await sessionPromise;
  const sessionData = response?.data;

  if (sessionData?.session?.token) {
    config.headers.Authorization = `Bearer ${sessionData.session.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionPromise = null;
    }
    return Promise.reject(error);
  },
);
