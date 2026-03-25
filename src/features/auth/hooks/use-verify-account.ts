"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/features/auth/lib/auth-client";

export function useVerifyAccount(token: string | null) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Token verifikasi tidak ditemukan di URL.");
      return;
    }

    const verifyAccount = async () => {
      try {
        const { error } = await authClient.verifyEmail({ query: { token } });

        if (error) {
          throw new Error("Gagal memverifikasi akun");
        }

        setStatus("success");
      } catch (error: unknown) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan sistem saat memverifikasi.",
        );
      }
    };

    verifyAccount();
  }, [token]);

  return { status, errorMessage };
}
