"use client";

import { EyeIcon, EyeOffIcon, Loader2, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterData } from "@/features/auth/lib/auth-schema";

interface RegisterFormProps {
  form: ReturnType<typeof useForm<RegisterData>>;
  onSubmit: (data: RegisterData) => void;
  onGoogleLogin: () => void;
  isPending: boolean;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export default function RegisterForm({
  form,
  onSubmit,
  onGoogleLogin,
  isPending,
  isVisible,
  setIsVisible,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        className="gap-3 w-full h-12 font-bold rounded-full"
        onClick={onGoogleLogin}
        disabled={isPending}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Daftar dengan Google
      </Button>

      <div className="relative">
        <div className="flex absolute inset-0 items-center">
          <span className="w-full border-t" />
        </div>
        <div className="flex relative justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">
            Atau daftar manual
          </span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Label htmlFor="name">
            Nama Lengkap <span className="-ml-1 text-red-500">*</span>
          </Label>
          <Input {...register("name")} placeholder="Masukkan Nama Lengkap" />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">
            Email <span className="-ml-1 text-red-500">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-muted h-4 w-4" />
            <Input
              {...register("email")}
              placeholder="Masukkan Email"
              className="pl-10"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1 w-full">
          <Label htmlFor="password" className="leading-5">
            Kata Sandi
            <span className="-ml-1 text-red-500">*</span>
          </Label>
          <div className="relative">
            <div>
              <Lock className="absolute left-3 top-2.5 text-muted h-4 w-4" />
            </div>
            <Input
              {...register("password")}
              type={isVisible ? "text" : "password"}
              placeholder="••••••••••••••••"
              className="pl-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute inset-y-0 right-0 rounded-l-none text-muted-foreground focus-visible:ring-ring/50 hover:bg-transparent"
            >
              {isVisible ? <EyeOffIcon /> : <EyeIcon />}
              <span className="sr-only">
                {isVisible ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          size="lg"
          className="w-full rounded-full"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          ) : (
            "Daftar Sekarang"
          )}
        </Button>
      </form>
    </div>
  );
}
