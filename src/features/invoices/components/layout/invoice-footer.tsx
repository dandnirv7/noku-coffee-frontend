import { ShieldCheck, Mail } from "lucide-react";

export function InvoiceFooter() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto py-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span>
            © {new Date().getFullYear()} Noku Coffee. Transaksi aman &
            terenkripsi.
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <a
            href="mailto:support@nokucoffee.me"
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Hubungi Support
          </a>
        </div>
      </div>
    </footer>
  );
}
