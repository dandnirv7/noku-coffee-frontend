import { ArrowRight, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="overflow-hidden relative pt-16 pb-24 md:pt-24 md:pb-32"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full transform translate-x-20 -skew-x-12 bg-orange-50/50 -z-10" />
      <div className="absolute left-10 top-20 w-64 h-64 rounded-full blur-3xl bg-primary/5 -z-10" />

      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col gap-16 items-center md:flex-row">
          <div className="relative z-10 space-y-8 text-center md:w-1/2 md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm text-sm font-semibold text-foreground animate-fade-in">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span>Rating 4.9/5 dari 1,200+ Pecinta Kopi</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight">
              Revolusi Rasa <br />
              <span className="bg-clip-text text-primary">Kopi Rumahan.</span>
            </h1>

            <p className="mx-auto max-w-lg text-lg leading-relaxed md:text-xl text-muted md:mx-0">
              Biji kopi <span className="font-bold">specialty grade</span> yang
              dipanggang segar dan dikirim langsung ke pintu Anda. Nikmati
              kualitas kafe tanpa harus keluar rumah.
            </p>

            <div className="flex flex-col gap-4 justify-center items-center pt-2 sm:flex-row md:justify-start">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Belanja Sekarang <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white rounded-full"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lihat Katalog
              </Button>
            </div>

            <div className="flex gap-8 justify-center items-center pt-6 border-t md:justify-start border-border/50">
              <div>
                <p className="text-2xl font-bold text-foreground">15rb+</p>
                <p className="text-xs font-medium tracking-wider uppercase text-muted">
                  Terjual
                </p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div>
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-xs font-medium tracking-wider uppercase text-muted">
                  Arabika
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-1/2">
            <div className="relative mx-auto w-full max-w-lg aspect-4/3">
              <div className="absolute inset-0 bg-[#E8E0D5] rounded-3xl shadow-2xl overflow-hidden transform md:rotate-3 border-4 border-white transition-transform duration-500 hover:rotate-0">
                <Image
                  height={600}
                  width={600}
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000"
                  alt="Kopi Latte Art Estetik"
                  className="object-cover w-full h-full"
                />

                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-[160px] animate-bounce-slow border border-white/50">
                  <div className="flex gap-2 items-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-xs font-bold text-foreground">
                      Baru Dipanggang
                    </span>
                  </div>
                  <p className="text-xs text-muted">
                    Batch #204 dikirim hari ini untuk kesegaran maksimal.
                  </p>
                </div>

                <div className="absolute bottom-6 left-6 bg-[#1F2933] text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 pr-6 transform md:-translate-x-8 hover:scale-105 transition-transform cursor-pointer border border-white/10">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Truck size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/60">
                      Pengiriman
                    </p>
                    <p className="text-sm font-bold">Gratis Ongkir</p>
                  </div>
                </div>
              </div>
              <div
                className="absolute -inset-4 rounded-full border-2 opacity-50 border-primary/20 -z-10 animate-spin-slow"
                style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
