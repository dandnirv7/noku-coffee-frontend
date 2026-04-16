"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/features/user/hooks/formatDate";
import { cn, toRupiah } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRecentOrders } from "../api/get-recent-orders";
import {
  useOrderSort,
  useOrderStatusFilter,
  type OrderStatusFilter,
} from "../hooks/use-recent-orders-filter";
import { RecentOrdersSkeleton } from "./dashboard-skeleton";

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
  const [statusFilter, setStatusFilter] = useOrderStatusFilter();
  const [sortBy, setSortBy] = useOrderSort();

  const { data: orders = [], isLoading } = useRecentOrders(sortBy);

  if (isLoading) {
    return <RecentOrdersSkeleton />;
  }

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <Card className="flex flex-col h-full w-full overflow-hidden">
      <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle>Pesanan Terbaru</CardTitle>
          <CardDescription>Menampilkan 5 pesanan terakhir</CardDescription>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto overflow-hidden">
          <Tabs
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val as OrderStatusFilter)}
            className="w-full sm:w-[400px]"
          >
            <TabsList className="flex w-full justify-start overflow-x-auto sm:grid sm:grid-cols-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="COMPLETED">Selesai</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="CANCELLED">Dibatalkan</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select
            value={sortBy}
            onValueChange={(val) => setSortBy(val as typeof sortBy)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
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

      <CardContent className="flex flex-1 flex-col pt-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">No. Pesanan</TableHead>
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
                        variant="outline"
                        className={cn(statusClassMap[order.status] ?? "")}
                      >
                        {statusLabelMap[order.status] ?? order.status}
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
        </div>
        <div className="mt-4 flex justify-end">
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
