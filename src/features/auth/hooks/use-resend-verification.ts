"use client";

import z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/features/auth/lib/auth-client";

export const ResendVerificationSchema = z.object({
  email: z
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email dibutuhkan" }),
});

export type ResendVerificationData = z.infer<typeof ResendVerificationSchema>;

export function useResendVerification({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<ResendVerificationData>({
    resolver: zodResolver(ResendVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResendSubmit = async (data: ResendVerificationData) => {
    setIsLoading(true);
    try {
      await authClient.sendVerificationEmail(
        {
          email: data.email,
        },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setIsLoading(false);
            toast.success("Email verifikasi baru telah dikirim ke email Anda.");
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
    handleResendSubmit,
  };
}
