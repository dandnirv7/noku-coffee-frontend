import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InvoiceNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-gray-600 hover:text-gray-900 -ml-3"
        >
          <Link href="/orders">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Pesanan
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-gray-500 hover:text-blue-600"
        >
          <Link href="/support">
            <HelpCircle className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Bantuan</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
}
