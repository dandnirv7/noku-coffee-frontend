"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Coffee, Award, CalendarClock, ChevronRight } from "lucide-react";

export function LoyaltyTab() {
  return (
    <div className="m-0 space-y-6">
      <Card className="bg-linear-to-br from-primary/10 via-background to-background border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span className="flex gap-2 items-center">
              <Award className="w-5 h-5 text-primary" />
              Noku Points
            </span>
            <Badge
              variant="default"
              className="text-sm font-semibold bg-primary/20 text-primary hover:bg-primary/30"
            >
              Level: Gold
            </Badge>
          </CardTitle>
          <CardDescription>
            Kumpulkan poin setiap kali Anda berbelanja dan tukarkan dengan
            diskon atau merchandise.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <div className="flex gap-2 items-baseline">
              <h2 className="text-4xl font-bold tracking-tight">2,450</h2>
              <span className="font-medium text-muted-foreground">Pts</span>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  50 Pts lagi menuju Platinum
                </span>
                <span className="font-medium">2,450 / 2,500</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>

            <div className="flex gap-3 mt-6">
              <Button>Tukar Poin</Button>
              <Button variant="outline">Riwayat Poin</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center pt-2">
        <div>
          <h3 className="text-lg font-medium">
            Langganan Biji Kopi (Coffee Subscription)
          </h3>
          <p className="text-sm text-muted-foreground">
            Atur pengiriman biji kopi rutin Anda tanpa repot checkout berulang
            kali.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col gap-6 justify-between items-start p-6 border-b sm:flex-row sm:items-center">
            <div className="flex gap-4">
              <div className="flex justify-center items-center w-16 h-16 bg-orange-50 rounded-lg dark:bg-orange-950/20 shrink-0">
                <Coffee className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <div className="flex gap-2 items-center mb-1">
                  <h4 className="text-lg font-semibold cursor-pointer hover:underline">
                    Noku Signature Espresso Blend
                  </h4>
                  <Badge
                    variant="secondary"
                    className="text-green-800 bg-green-100 hover:bg-green-100"
                  >
                    Aktif
                  </Badge>
                </div>
                <div className="flex items-center text-sm divide-x text-muted-foreground divide-border">
                  <span className="pr-3">1 Kg / Bulan</span>
                  <span className="px-3">Biji Utuh</span>
                  <span className="pl-3">Rp 250.000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-between items-center p-4 px-6 text-sm rounded-b-lg bg-secondary/30 sm:flex-row">
            <div className="flex gap-2 items-center text-muted-foreground">
              <CalendarClock className="w-4 h-4" />
              <span>
                Pengiriman selanjutnya:{" "}
                <strong className="text-foreground">15 Nov 2026</strong>
              </span>
            </div>
            <div className="flex gap-4">
              <button className="font-medium text-primary hover:underline">
                Lewati Bulan Ini
              </button>
              <button className="flex items-center font-medium text-primary hover:underline">
                Atur <ChevronRight className="h-4 w-4 ml-1 pl-0.5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
