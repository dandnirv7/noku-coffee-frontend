import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { RegisterData } from "../lib/auth-schema";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: `/login`,
      });

      if (res.error) {
        const msg = res.error.message ?? "Gagal melakukan registrasi";
        throw new Error(msg);
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registrasi berhasil! Silakan masuk dengan akun Anda.");
      router.push("/login");
      router.refresh();
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Gagal melakukan registrasi",
      );
    },
  });
};
