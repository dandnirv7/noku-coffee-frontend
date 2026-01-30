"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../api/use-register";
import { authClient } from "../lib/auth-client";
import { RegisterData, registerSchema } from "../lib/auth-schema";

export function useRegisterForm() {
  const [isVisible, setIsVisible] = useState(false);

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const { mutateAsync: register, isPending, reset } = useRegister();

  const onSubmit = async (data: RegisterData) => {
    await register(data);
    reset();
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/search`,
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
