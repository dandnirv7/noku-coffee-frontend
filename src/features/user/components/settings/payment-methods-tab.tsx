"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Wallet, Plus, Trash2 } from "lucide-react";

export function PaymentMethodsTab() {
  return (
    <div className="space-y-6 m-0">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Metode Pembayaran</h3>
          <p className="text-sm text-muted-foreground">
            Kelola metode pembayaran langganan dan proses checkout lebih cepat.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Tambah Metode Baru
        </Button>
      </div>

      <div className="grid gap-4">
        {}
        <Card>
          <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-4">
              <div className="h-12 w-16 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-slate-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">Visa berakhiran 4242</h4>
                  <Badge variant="secondary" className="text-xs">
                    Utama
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Kedaluwarsa 12/2028
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
              <Button variant="outline" className="flex-1 sm:flex-none">
                Edit
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-4">
              <div className="h-12 w-16 bg-green-50 dark:bg-green-950/20 rounded-md flex items-center justify-center">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold">GoPay</h4>
                <p className="text-sm text-muted-foreground">
                  Terhubung: +62 812-3456-7890
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground w-full sm:w-auto"
              >
                Jadikan Utama
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
