"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../api/use-login";
import { LoginData, loginSchema } from "../lib/auth-schema";
import { authClient } from "../lib/auth-client";

export function useLoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || undefined;

  const { mutate: login, isPending, reset } = useLogin({ callbackUrl });

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginData) => {
    login(data);
    reset();
  };

  const handleGoogleLogin = async () => {
    const redirectUrl = callbackUrl || "/search";
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}${redirectUrl}`,
    });
  };

  return {
    form,
    isVisible,
    setIsVisible,
    onSubmit,
    handleGoogleLogin,
    isPending,
  };
}
