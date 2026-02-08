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

      if (res.error) throw new Error("Gagal melakukan registrasi");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registrasi berhasil! Cek email untuk verifikasi.");
      router.push("/login");
      router.refresh();
    },
    onError: () => {
      toast.error("Gagal melakukan registrasi");
    },
  });
};
