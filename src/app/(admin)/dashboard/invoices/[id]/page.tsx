"use client";

import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import {
  Calendar,
  ChevronLeft,
  CreditCard,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Package,
  Undo2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Invoice,
  InvoiceStatus,
  MOCK_INVOICES,
} from "@/features/(dashboard)/invoices/mocks/data";

const STATUS_LABELS: Record<
  InvoiceStatus,
  {
    label: string;
    variant:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "success"
      | "warning";
  }
> = {
  PENDING: { label: "Menunggu", variant: "warning" },
  PAID: { label: "Terbayar", variant: "success" },
  EXPIRED: { label: "Kedaluwarsa", variant: "outline" },
  REFUNDED: { label: "Refunded", variant: "secondary" },
  CANCELLED: { label: "Batal", variant: "destructive" },
};

const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
  const { label, variant } = STATUS_LABELS[status];

  let className = "";
  if (status === "PAID")
    className =
      "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100";
  if (status === "PENDING")
    className =
      "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100";
  if (status === "REFUNDED")
    className = "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100";

  return (
    <Badge
      variant={
        variant === "success" || variant === "warning" ? "outline" : variant
      }
      className={className}
    >
      {label}
    </Badge>
  );
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const found = MOCK_INVOICES.find((inv) => inv.id === params.id);
    setTimeout(() => {
      setInvoice(found || null);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-muted rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="h-64 bg-muted rounded" />
            <div className="h-96 bg-muted rounded" />
          </div>
          <div className="h-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-semibold">Invoice tidak ditemukan</h2>
        <Button variant="link" onClick={() => router.back()}>
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                {invoice.invoiceNumber}
              </h1>
              <StatusBadge status={invoice.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              Dibuat pada{" "}
              {format(new Date(invoice.createdAt), "dd MMMM yyyy, HH:mm", {
                locale: localeID,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Unduh PDF
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Kirim Ulang
          </Button>
          {invoice.status === "PAID" && (
            <Button variant="destructive">
              <Undo2 className="mr-2 h-4 w-4" />
              Refund
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Informasi Pelanggan
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Nama Pelanggan
                </p>
                <p className="text-base">{invoice.customerName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-base">{invoice.customerEmail}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Nomor Telepon
                </p>
                <p className="text-base">{invoice.customerPhone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                Alamat Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">
                {invoice.shippingAddress}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                Item Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-center">Kuantitas</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.productName}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(item.price)}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(item.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(invoice.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Diskon</span>
                  <span className="text-emerald-600">
                    -
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(invoice.discount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pajak (PPN 11%)</span>
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(invoice.tax)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Biaya Ongkir</span>
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(invoice.shipping)}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Tagihan</span>
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(invoice.totalAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                Status & Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Metode Pembayaran
                </p>
                <p className="text-base font-medium">{invoice.paymentMethod}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Tanggal Jatuh Tempo
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">
                    {format(new Date(invoice.createdAt), "dd MMM yyyy", {
                      locale: localeID,
                    })}
                  </p>
                </div>
              </div>
              {invoice.pdidAt && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Dibayar Pada
                  </p>
                  <p className="text-base text-emerald-600 font-medium">
                    {format(new Date(invoice.pdidAt), "dd MMM yyyy, HH:mm", {
                      locale: localeID,
                    })}
                  </p>
                </div>
              )}
              <Separator />
              <div className="pt-2 flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link
                    href={`/dashboard/orders/${invoice.id.replace("inv", "ord")}`}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Lihat Pesanan Terkait
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Lihat Log Pembayaran
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
                Catatan Admin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic">
                &quot;Invoice ini dihasilkan secara otomatis. Pastikan
                pembayaran diterima sebelum memproses pengiriman produk.&quot;
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
