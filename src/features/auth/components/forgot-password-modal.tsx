"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { useResendVerification } from "../hooks/use-resend-verification";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: "forgotPassword" | "resendVerification";
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  modalType,
}: ForgotPasswordModalProps) {
  const {
    form: forgotPasswordForm,
    isLoading: forgotPasswordLoading,
    handleForgotSubmit,
  } = useForgotPassword({ onClose });
  const {
    form: resendVerificationForm,
    isLoading: resendVerificationLoading,
    handleResendSubmit,
  } = useResendVerification({ onClose });

  const form =
    modalType === "forgotPassword"
      ? forgotPasswordForm
      : resendVerificationForm;
  const isLoading =
    modalType === "forgotPassword"
      ? forgotPasswordLoading
      : resendVerificationLoading;
  const handleSubmit =
    modalType === "forgotPassword" ? handleForgotSubmit : handleResendSubmit;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            {modalType === "forgotPassword"
              ? "Lupa Kata Sandi"
              : "Kirim Ulang Verifikasi"}
          </CardTitle>
          <CardDescription>
            {modalType === "forgotPassword"
              ? "Masukkan email Anda dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi."
              : "Masukkan email Anda dan kami akan mengirimkan link untuk verifikasi ulang."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan email"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : modalType === "forgotPassword" ? (
                    "Kirim"
                  ) : (
                    "Kirim Ulang"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
