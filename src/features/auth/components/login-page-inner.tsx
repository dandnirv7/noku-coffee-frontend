"use client";

import AuthWrapper from "@/features/auth/components/auth-wrapper";
import LoginForm from "@/features/auth/components/login-form";
import { useLoginForm } from "@/features/auth/hooks/use-login-form";
import ForgotPasswordModal from "./forgot-password-modal";

export default function LoginPageInner() {
  const {
    form,
    isVisible,
    setIsVisible,
    onSubmit,
    handleGoogleLogin,
    isPending,
    isForgotOpen,
    setIsForgotOpen,
  } = useLoginForm();

  return (
    <>
      <AuthWrapper
        imagePosition="left"
        imageTitle="Mulai Hari Anda dengan Rasa Terbaik."
        imageDescription="Bergabung dengan komunitas Noku dan nikmati kemudahan berlangganan biji kopi premium."
        heading="Selamat Datang Kembali"
        subHeading="Masuk ke akun Noku Coffee Anda"
        footerText="Belum punya akun?"
        footerLinkText="Daftar sekarang"
        footerLinkHref="/register"
      >
        <LoginForm
          form={form}
          onSubmit={onSubmit}
          onGoogleLogin={handleGoogleLogin}
          isPending={isPending}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setIsForgotOpen={setIsForgotOpen}
        />
      </AuthWrapper>
      <ForgotPasswordModal
        modalType="forgotPassword"
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </>
  );
}
