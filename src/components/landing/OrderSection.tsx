import { CheckCircle, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Terverifikasi & Terkurasi",
    desc: "Setiap biji kopi melalui proses cupping ketat sebelum masuk katalog kami.",
  },
  {
    icon: <Clock size={28} />,
    title: "Pengiriman Cepat",
    desc: "Pesan sebelum jam 14.00, kami kirim di hari yang sama dengan packing aman.",
  },
  {
    icon: <CheckCircle size={28} />,
    title: "Harga Transparan",
    desc: "Tanpa biaya tersembunyi. Apa yang Anda lihat adalah apa yang Anda bayar, lengkap dengan pajak.",
  },
];

export default function OrderSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="overflow-hidden relative py-24 border-t bg-surface border-border"
    >
      <div className="absolute left-0 top-1/2 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 bg-orange-50/50 -z-10" />

      <div className="container px-4 mx-auto md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-[#1F2933] text-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div>
            <h3 className="mb-6 text-2xl font-bold md:text-3xl">
              Kenapa Memilih Noku?
            </h3>
            <div className="space-y-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="p-3 rounded-xl bg-primary/20 h-fit text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-bold">{benefit.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-full min-h-[300px] md:min-h-full rounded-2xl overflow-hidden group">
            <Image
              width={800}
              height={600}
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
              alt="Suasana Ngopi"
              className="object-cover absolute inset-0 w-full h-full opacity-80 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 to-transparent bg-linear-to-t from-black/90 via-black/20" />
            <div className="absolute right-8 bottom-8 left-8">
              <div className="flex gap-3 items-center mb-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#1F2933] bg-gray-600 overflow-hidden"
                    >
                      <Image
                        width={100}
                        height={100}
                        src={`https://i.pravatar.cc/100?img=${10 + i}`}
                        alt="User"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold">+12rb Member</span>
              </div>
              <h3 className="mb-2 text-3xl font-bold">10,000+ Cangkir</h3>
              <p className="text-sm text-gray-300">
                Telah diseduh setiap hari menggunakan biji kopi pilihan Noku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
