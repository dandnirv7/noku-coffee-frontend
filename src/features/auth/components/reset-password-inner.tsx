"use client";

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
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/password-input";
import { useResetPassword } from "../hooks/use-reset-password";

export default function ResetPasswordInnerPage() {
  const { form, onSubmit, isLoading, isResetSuccess } = useResetPassword();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Atur Ulang Kata Sandi</CardTitle>
          <CardDescription>Masukkan kata sandi baru Anda</CardDescription>
        </CardHeader>

        <CardContent>
          {isResetSuccess ? (
            <div className="text-center text-green-500">
              Kata sandi berhasil direset! Anda akan diarahkan ke halaman login.
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kata Sandi <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••••••••••"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Konfirmasi Kata Sandi{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="••••••••••••••••"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
