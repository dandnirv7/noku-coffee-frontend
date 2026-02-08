import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { LoginData } from "../lib/auth-schema";

interface UseLoginOptions {
  callbackUrl?: string;
}

export const useLogin = (options?: UseLoginOptions) => {
  const router = useRouter();
  const redirectUrl = options?.callbackUrl || "/search";

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: redirectUrl,
      });

      if (res.error) {
        throw new Error("Gagal masuk");
      }

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil masuk! Selamat datang kembali.");
      router.push(redirectUrl);
      router.refresh();
    },
    onError: () => {
      toast.error("Gagal masuk");
    },
  });
};
