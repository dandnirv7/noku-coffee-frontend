"use client";

import { Star } from "lucide-react";
import Image from "next/image";

import RegisterForm from "@/components/shared/form/register-form";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] grid md:grid-cols-2 bg-background animate-fade-in">
      <div className="hidden overflow-hidden relative order-2 md:block bg-primary/10">
        <Image
          src="https://images.unsplash.com/photo-1511537632536-b74c206dc199?auto=format&fit=crop&q=80&w=1200"
          alt="Coffee Beans"
          fill
          className="object-cover transition-transform duration-[20s] hover:scale-110"
          priority
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 via-transparent to-transparent bg-linear-to-t from-black/80" />

        <div className="absolute right-12 bottom-12 left-12 text-white">
          <div className="flex justify-center items-center mb-6 w-12 h-12 rounded-xl backdrop-blur-md bg-white/20">
            <Star size={24} />
          </div>
          <h2 className="mb-4 text-4xl font-bold">
            Bergabunglah dengan Revolusi Kopi.
          </h2>
          <p className="text-lg text-white/80">
            Dapatkan akses eksklusif ke biji kopi edisi terbatas dan diskon
            khusus member.
          </p>
        </div>
      </div>

      <div className="flex order-1 justify-center items-center p-6 md:p-12">
        <div className="space-y-8 w-full max-w-md">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">
              Buat Akun Baru
            </h1>
            <p className="mt-2 text-muted-foreground">
              Mulai perjalanan kopi Anda bersama Noku
            </p>
          </div>

          <RegisterForm />

          <p className="text-sm text-center text-muted-foreground">
            Sudah punya akun?{" "}
            <span
              className="font-bold cursor-pointer text-primary hover:underline"
              onClick={() => console.log("Navigate to login")}
            >
              Masuk disini
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
