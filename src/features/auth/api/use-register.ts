import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { RegisterData } from "../lib/auth-schema";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/login",
      });

      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Registrasi berhasil! Cek email untuk verifikasi.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal melakukan registrasi");
    },
  });
};
