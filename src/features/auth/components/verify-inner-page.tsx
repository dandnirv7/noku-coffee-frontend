"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import ForgotPasswordModal from "./forgot-password-modal";
import { useVerifyAccount } from "../hooks/use-verify-account";

export default function VerifyInnerPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);

  const { status, errorMessage } = useVerifyAccount(token);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-lg border-muted/60 bg-background backdrop-blur supports-backdrop-filter:bg-background/60">
        <CardHeader className="text-center pb-2">
          {status === "idle" && (
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
              <Skeleton className="h-16 w-16 rounded-full mb-6" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="rounded-full bg-emerald-100/80 p-3 mb-4 dark:bg-emerald-900/30">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-500" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Verifikasi Berhasil!
              </CardTitle>
              <CardDescription className="text-base pt-3 leading-relaxed">
                Email Anda telah berhasil diverifikasi. Akun Anda kini sudah
                aktif dan siap digunakan untuk mengeksplorasi layanan kami.
              </CardDescription>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="rounded-full bg-destructive/10 p-3 mb-4">
                <XCircle className="h-10 w-10 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Verifikasi Gagal
              </CardTitle>
              <CardDescription className="text-base pt-3 leading-relaxed">
                {errorMessage}
              </CardDescription>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {status === "success" && (
            <div className="text-sm text-center text-gray-500">
              Jika Anda tidak menerima email dalam beberapa menit, periksa
              folder spam atau coba kirim ulang email verifikasi.
            </div>
          )}

          {status === "error" && (
            <div className="text-sm text-center text-gray-500">
              Jika masalah ini terus berlanjut, silakan hubungi kami di{" "}
              <strong>support@noku.com</strong>.
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {status === "idle" && (
            <div className="w-full animate-in fade-in duration-500">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          )}

          {status === "success" && (
            <Button
              className="w-full group animate-in fade-in slide-in-from-bottom-2 duration-700"
              onClick={() => router.push("/login")}
            >
              Masuk ke Akun
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}

          {status === "error" && (
            <div className="w-full flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Button
                variant="default"
                className="w-full group"
                onClick={() => setIsResendModalOpen(true)}
              >
                <RefreshCcw className="mr-2 h-4 w-4 transition-transform group-hover:-rotate-45" />
                Kirim Ulang Verifikasi
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      {isResendModalOpen && (
        <ForgotPasswordModal
          isOpen={isResendModalOpen}
          onClose={() => setIsResendModalOpen(false)}
          modalType="resendVerification"
        />
      )}
    </div>
  );
}
