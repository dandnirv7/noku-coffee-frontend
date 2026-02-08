"use client";

import RegisterForm from "@/features/auth/components/register-form";
import { useRegisterForm } from "../hooks/use-register-form";
import AuthWrapper from "./auth-wrapper";

export default function RegisterPageInner() {
  const {
    form,
    isVisible,
    setIsVisible,
    onSubmit,
    handleGoogleLogin,
    isPending,
  } = useRegisterForm();

  return (
    <AuthWrapper
      imagePosition="right"
      imageTitle="Bergabunglah dengan Revolusi Kopi."
      imageDescription="Dapatkan akses eksklusif ke biji kopi edisi terbatas dan diskon khusus member."
      heading="Buat Akun Baru"
      subHeading="Mulai perjalanan kopi Anda bersama Noku"
      footerText="Sudah punya akun?"
      footerLinkText="Masuk disini"
      footerLinkHref="/login"
    >
      <RegisterForm
        form={form}
        onSubmit={onSubmit}
        onGoogleLogin={handleGoogleLogin}
        isPending={isPending}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </AuthWrapper>
  );
}
