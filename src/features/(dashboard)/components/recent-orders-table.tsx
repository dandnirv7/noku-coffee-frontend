"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toRupiah } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SortBy, useRecentOrders } from "../api/get-recent-orders";
import { formatDate } from "@/features/user/hooks/formatDate";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const statusVariantMap: Record<string, "default" | "destructive" | "outline"> =
  {
    CANCELLED: "destructive",
  };

const statusClassMap: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100 border-red-300",
  COMPLETED:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-300",
};

const statusLabelMap: Record<string, string> = {
  COMPLETED: "Selesai",
  PENDING: "Pending",
  CANCELLED: "Dibatalkan",
};

export function RecentOrdersTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const statusQuery = searchParams.get("status");
  const sortQuery = searchParams.get("sort");

  const filter =
    statusQuery === "COMPLETED" ||
    statusQuery === "PENDING" ||
    statusQuery === "CANCELLED"
      ? statusQuery
      : "all";

  const sortBy: SortBy =
    sortQuery === "latest" || sortQuery === "oldest" || sortQuery === "highest"
      ? (sortQuery as SortBy)
      : "latest";

  const handleFilterChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (val === "all") {
      params.delete("status");
    } else {
      params.set("status", val);
    }

    if (sortBy === "latest") {
      params.delete("sort");
    }

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  const handleSortChange = (val: SortBy) => {
    const params = new URLSearchParams(searchParams.toString());

    if (val === "latest") {
      params.delete("sort");
    } else {
      params.set("sort", val);
    }
    if (filter === "all") {
      params.delete("status");
    }

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  const { data: orders = [] } = useRecentOrders(sortBy);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <Card className="flex flex-col h-full w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle>Pesanan Terbaru</CardTitle>
          <CardDescription>Menampilkan 5 pesanan terakhir</CardDescription>
        </div>
        <div className="flex items-center gap-4">
          <Tabs
            value={filter}
            onValueChange={handleFilterChange}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="COMPLETED">Selesai</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="CANCELLED">Dibatalkan</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Terbaru</SelectItem>
              <SelectItem value="oldest">Terlama</SelectItem>
              <SelectItem value="highest">Total Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">No. Pesanan</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(order.date)}
                  </TableCell>
                  <TableCell>{toRupiah(order.totalAmount)}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={statusVariantMap[order.status] ?? "outline"}
                      className={statusClassMap[order.status] ?? ""}
                    >
                      {statusLabelMap[order.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  Tidak ada pesanan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="mt-4 mb-4 flex justify-end">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/dashboard/orders">
              Lihat semua pesanan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
