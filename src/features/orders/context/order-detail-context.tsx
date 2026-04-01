"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import { OrderDetail } from "../lib/order-schema";

type OrderDetailContextType = {
  order: OrderDetail;
};

const OrderDetailContext = createContext<OrderDetailContextType | null>(null);

export function OrderDetailProvider({
  order,
  children,
}: {
  order: OrderDetail;
  children: ReactNode;
}) {
  const contextValue = useMemo(() => ({ order }), [order]);

  return (
    <OrderDetailContext.Provider value={contextValue}>
      {children}
    </OrderDetailContext.Provider>
  );
}

export function useOrderDetail() {
  const context = useContext(OrderDetailContext);
  if (!context) {
    throw new Error(
      "useOrderDetail must be used within an OrderDetailProvider",
    );
  }

  return context;
}
