import z from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Kata sandi minimal 8 karakter")
      .max(20, "Kata sandi maksimal 20 karakter")
      .regex(/[a-z]/, "Kata sandi harus mengandung huruf kecil")
      .regex(/[A-Z]/, "Kata sandi harus mengandung huruf besar")
      .regex(/[0-9]/, "Kata sandi harus mengandung angka")
      .regex(/[^a-zA-Z0-9]/, "Kata sandi harus mengandung simbol"),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi dibutuhkan"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
