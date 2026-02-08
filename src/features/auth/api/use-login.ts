import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { LoginData } from "../lib/auth-schema";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/search`,
      });

      if (res.error) {
        throw new Error("Gagal masuk");
      }

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil masuk! Selamat datang kembali.");
      router.push("/search");
      router.refresh();
    },
    onError: () => {
      toast.error("Gagal masuk");
    },
  });
};
