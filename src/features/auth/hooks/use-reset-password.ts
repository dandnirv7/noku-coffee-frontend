"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/features/auth/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  ResetPasswordData,
} from "../lib/reset-password-schema";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const params = useSearchParams();
  const token = params.get("token") || "";
  const router = useRouter();

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      setIsLoading(true);

      await authClient.resetPassword(
        {
          newPassword: data.password,
          token,
        },
        {
          onSuccess: () => {
            setIsResetSuccess(true);
            toast.success("Kata sandi berhasil diatur ulang.");
            form.reset();
            setTimeout(() => router.push("/login"), 2000);
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Terjadi kesalahan, silakan coba lagi.",
            );
          },
        },
      );
    } catch {
      toast.error("Terjadi kesalahan internal.");
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading, isResetSuccess };
}
