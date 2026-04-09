"use client";

import { CheckCircle, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PointsGoal() {
  const userPoints = 1200;
  const POINTS_GOAL = 1500;
  const isGoalReached = userPoints >= POINTS_GOAL;
  const progressPercentage = Math.min((userPoints / POINTS_GOAL) * 100, 100);
  return (
    <div className="mb-6 space-y-4 md:hidden">
      <div
        className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-all duration-500 ${
          isGoalReached
            ? "bg-linear-to-br from-green-700 to-emerald-500 shadow-green-900/20 scale-[1.02]"
            : "bg-linear-to-br from-orange-700 to-orange-500 shadow-orange-700/20"
        }`}
      >
        <div className="absolute -top-4 -right-4 opacity-10">
          {isGoalReached ? (
            <CheckCircle className="w-24 h-24" />
          ) : (
            <Package className="w-24 h-24 rotate-12" />
          )}
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p
                className={`text-xs font-medium uppercase tracking-widest ${isGoalReached ? "text-green-100" : "text-orange-200"}`}
              >
                {isGoalReached ? "Reward Tersedia!" : "Noku Gold Member"}
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {userPoints.toLocaleString()} Poin
              </h2>
            </div>
            <Badge
              className={
                isGoalReached
                  ? "text-green-700 bg-white"
                  : "text-orange-100 bg-orange-500/20 border-orange-400/30"
              }
            >
              {isGoalReached ? "Ready" : "Level 4"}
            </Badge>
          </div>

          {!isGoalReached ? (
            <div className="mt-4">
              <div className="flex justify-between text-[10px] mb-1 text-orange-200">
                <span>
                  Tinggal {POINTS_GOAL - userPoints} poin lagi untuk Kopi
                  Gratis!
                </span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center p-3 mt-4 rounded-xl border backdrop-blur-md bg-white/10 border-white/20">
              <div>
                <p className="text-[10px] text-green-100 uppercase font-bold">
                  Kode Klaim:
                </p>
                <p className="font-mono text-lg font-black tracking-widest">
                  FREEKOPI24
                </p>
              </div>
              <Button
                size="sm"
                className="font-bold text-green-700 bg-white shadow-sm hover:bg-green-50"
              >
                Salin Kode
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
