"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import { InvoiceData } from "../lib/invoice-schema";

type InvoiceContextType = {
  invoice: InvoiceData;
};

const InvoiceContext = createContext<InvoiceContextType | null>(null);

export function InvoiceProvider({
  invoice,
  children,
}: {
  invoice: InvoiceData;
  children: ReactNode;
}) {
  const contextValue = useMemo(() => ({ invoice }), [invoice]);

  return (
    <InvoiceContext.Provider value={contextValue}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }

  return context;
}
