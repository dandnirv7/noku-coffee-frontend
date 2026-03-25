"use client";

import z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/features/auth/lib/auth-client";

export const ForgotPasswordSchema = z.object({
  email: z
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email dibutuhkan" }),
});

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;

export function useForgotPassword({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      await authClient.requestPasswordReset(
        {
          email: data.email,
          redirectTo: "/reset-password",
        },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setIsLoading(false);
            toast.success("Link reset kata sandi telah dikirim ke email Anda.");
            form.reset();
            onClose();
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(
              ctx.error.message || "Terjadi kesalahan, silakan coba lagi.",
            );
          },
        },
      );
    } catch {
      setIsLoading(false);
      toast.error("Terjadi kesalahan internal.");
    }
  };

  return {
    form,
    isLoading,
    handleForgotSubmit,
  };
}
