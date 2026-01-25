import LoginForm from "@/components/shared/form/login-form";
import { Button } from "@/components/ui/button";
import { Coffee, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] grid md:grid-cols-2 bg-background animate-fade-in">
      {/* Left: Artistic Image */}
      <div className="hidden overflow-hidden relative md:block bg-primary/10">
        <Image
          height={512}
          width={512}
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200"
          alt="Coffee Art"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] hover:scale-110"
        />
        <div className="absolute inset-0 mix-blend-multiply bg-primary/40" />
        <div className="absolute inset-0 via-transparent to-transparent bg-linear-gradient-to-t from-black/80" />
        <div className="absolute right-12 bottom-12 left-12 text-white">
          <h2 className="mb-4 text-4xl font-bold">
            Mulai Hari Anda dengan Rasa Terbaik.
          </h2>
          <p className="text-lg text-white/80">
            Bergabung dengan komunitas Noku dan nikmati kemudahan berlangganan
            biji kopi premium.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex justify-center items-center p-6 md:p-12">
        <div className="space-y-6 w-full max-w-md">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Selamat Datang Kembali
            </h1>
            <p className="mt-2 text-muted">Masuk ke akun Noku Coffee Anda</p>
          </div>

          <LoginForm />

          <p className="text-sm text-center text-muted">
            Belum punya akun?{" "}
            <Button
              variant="link"
              className="font-bold text-primary hover:underline"
            >
              <Link href="/register">Daftar sekarang</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
