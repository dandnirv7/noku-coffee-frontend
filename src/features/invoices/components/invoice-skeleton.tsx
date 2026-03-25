import React from "react";

export default function InvoiceSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center font-sans">
      <div className="w-full max-w-4xl bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-10 space-y-8">
          {/* Bagian Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-8 w-40 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Grid Info Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100"
              >
                <div className="h-3 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Detail Pelanggan & Pengiriman */}
          <div>
            <div className="h-5 w-64 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="bg-[#f8fafc] border border-blue-100/50 rounded-xl">
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {/* Kolom 1 */}
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={`col1-${item}`} className="flex gap-3">
                      <div className="w-4 h-4 bg-gray-200 rounded mt-0.5 animate-pulse"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Kolom 2 */}
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={`col2-${item}`} className="flex gap-3">
                      <div className="w-4 h-4 bg-gray-200 rounded mt-0.5 animate-pulse"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ringkasan Pesanan */}
          <div>
            <div className="h-5 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>

            {/* Tabel Desktop */}
            <div className="hidden md:block border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 h-10 border-b border-gray-200"></div>
              <div className="divide-y divide-gray-100">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kartu Mobile */}
            <div className="md:hidden space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Pembayaran */}
          <div>
            <div className="h-5 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="flex md:justify-end">
              <div className="w-full md:w-[400px] border border-gray-200 rounded-xl p-5 space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
                <div className="h-px bg-gray-100 w-full my-2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
                </div>
                {/* Metode Pembayaran Box */}
                <div className="mt-4 bg-gray-50 h-16 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Catatan & Syarat (Optional Skeleton) */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full"></div>

          {/* Footer */}
          <div className="flex flex-row justify-between items-start md:items-center gap-6 pb-4">
            <div className="space-y-3 w-full">
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2 pt-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex flex-col items-center gap-2 border border-gray-100 p-3 rounded-xl bg-gray-50 ">
              <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-2 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] text-gray-400 py-6">
          <div className="h-2 w-52 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="h-2 w-60 bg-gray-200 rounded mx-auto mt-1 animate-pulse"></div>
          <div className="h-2 w-48 bg-gray-200 rounded mx-auto mt-1 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
