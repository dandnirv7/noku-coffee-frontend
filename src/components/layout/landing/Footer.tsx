import { MapPin } from "lucide-react";

interface FooterColumns {
  title: string;
  links: string[];
}

const footerColumns: FooterColumns[] = [
  {
    title: "Produk",
    links: [
      "Semua Produk",
      "Biji Kopi",
      "Peralatan",
      "Aksesoris",
      "Promo Bundle",
    ],
  },
  {
    title: "Tentang",
    links: ["Cerita Kami", "Karir", "Blog"],
  },
  {
    title: "Bantuan",
    links: ["FAQ", "Pengiriman", "Pengembalian", "Syarat & Ketentuan"],
  },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-12 border-t border-border bg-surface">
      <div className="container px-4 mx-auto md:px-6">
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center w-8 h-8 text-white rounded bg-primary">
                <span className="font-serif font-bold">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Noku Coffee
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Menyediakan pengalaman kopi terbaik dari hulu ke hilir. Temukan
              rasa otentik di setiap seduhan.
            </p>

            <div className="flex gap-2 items-center text-sm text-muted">
              <MapPin size={16} /> Bekasi, Indonesia
            </div>
          </div>

          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h4 className="mb-6 font-bold text-foreground">{col.title}</h4>
              <ul className="space-y-4 text-sm text-muted">
                {col.links.map((l) => (
                  <li key={l}>
                    <button className="transition-colors hover:text-primary">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 text-sm text-center border-t border-border text-muted">
          &copy; {new Date().getFullYear()} Noku Coffee Indonesia.
        </div>
      </div>
    </footer>
  );
}
