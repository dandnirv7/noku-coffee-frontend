import Image from "next/image";

export default function AboutSection({ id }: { id?: string }) {
  return (
    <section id={id} className="py-24 bg-surface">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col gap-16 items-center md:flex-row">
          <div className="relative order-2 md:w-1/2 md:order-1">
            <div className="overflow-hidden relative z-10 rounded-2xl shadow-2xl aspect-5/4">
              <Image
                width={800}
                height={600}
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800"
                alt="Proses Cupping"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 p-8 w-full to-transparent bg-linear-to-t from-black/80">
                <p className="font-serif text-lg italic text-white">
                  "Quality over quantity, always."
                </p>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-2xl bg-primary/10 -z-10" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full blur-2xl -z-10" />
          </div>

          <div className="order-1 space-y-6 md:w-1/2 md:order-2">
            <span className="text-sm font-bold tracking-widest uppercase text-primary">
              Tentang Kami
            </span>
            <h2 className="text-3xl font-bold md:text-4xl text-foreground">
              Berawal Dari Sebuah Dedikasi Untuk Kopi Indonesia.
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              Noku Coffee lahir dari keinginan sederhana: menghubungkan penikmat
              kopi rumahan dengan biji kopi terbaik nusantara tanpa perantara
              yang rumit.
            </p>
            <p className="text-lg leading-relaxed text-muted">
              Kami bermitra langsung dengan petani di dataran tinggi Gayo,
              Flores, dan Toraja. Setiap biji yang kami kirim adalah hasil
              kurasi ketat tim Q-Grader kami.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <h4 className="text-2xl font-bold text-foreground">20+</h4>
                <p className="text-sm text-muted">Mitra Petani</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">100%</h4>
                <p className="text-sm text-muted">Fair Trade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
