export type InvoiceStatus =
  | "PENDING"
  | "PAID"
  | "EXPIRED"
  | "REFUNDED"
  | "CANCELLED";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  status: InvoiceStatus;
  createdAt: string;
  pdidAt?: string;
  paymentMethod: string;
  shippingAddress: string;
  items: {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
}

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2024-001",
    customerName: "Budi Santoso",
    customerEmail: "budi.santoso@example.com",
    customerPhone: "081234567890",
    totalAmount: 155000,
    status: "PAID",
    createdAt: "2024-03-15T10:00:00Z",
    pdidAt: "2024-03-15T10:05:00Z",
    paymentMethod: "Transfer Bank (BCA)",
    shippingAddress: "Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta",
    subtotal: 140000,
    discount: 5000,
    tax: 10000,
    shipping: 10000,
    items: [
      {
        id: "p1",
        productName: "Kopi Gayo 250g",
        price: 70000,
        quantity: 2,
        subtotal: 140000,
      },
    ],
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2024-002",
    customerName: "Siti Rahma",
    customerEmail: "siti.rahma@example.com",
    customerPhone: "081987654321",
    totalAmount: 95000,
    status: "PENDING",
    createdAt: "2024-03-16T14:30:00Z",
    paymentMethod: "E-Wallet (Gopay)",
    shippingAddress: "Perum Sentosa Blok B2, Bandung, Jawa Barat",
    subtotal: 80000,
    discount: 0,
    tax: 5000,
    shipping: 10000,
    items: [
      {
        id: "p2",
        productName: "Kopi Mandailing 250g",
        price: 80000,
        quantity: 1,
        subtotal: 80000,
      },
    ],
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2024-003",
    customerName: "Agus Pratama",
    customerEmail: "agus.pratama@example.com",
    customerPhone: "08561234567",
    totalAmount: 210000,
    status: "EXPIRED",
    createdAt: "2024-03-10T09:00:00Z",
    paymentMethod: "Kartu Kredit",
    shippingAddress:
      "Apartemen Sudirman Park Tower A Lt. 10, Jakarta Pusat, DKI Jakarta",
    subtotal: 190000,
    discount: 0,
    tax: 10000,
    shipping: 10000,
    items: [
      {
        id: "p3",
        productName: "Arabica Blend 500g",
        price: 190000,
        quantity: 1,
        subtotal: 190000,
      },
    ],
  },
  {
    id: "inv-004",
    invoiceNumber: "INV-2024-004",
    customerName: "Dewi Lestari",
    customerEmail: "dewi.lestari@example.com",
    customerPhone: "081300001111",
    totalAmount: 125000,
    status: "REFUNDED",
    createdAt: "2024-03-05T11:15:00Z",
    paymentMethod: "Transfer Bank (Mandiri)",
    shippingAddress: "Jl. Anggrek No. 45, Surabaya, Jawa Timur",
    subtotal: 110000,
    discount: 0,
    tax: 5000,
    shipping: 10000,
    items: [
      {
        id: "p4",
        productName: "Robusta Gold 500g",
        price: 110000,
        quantity: 1,
        subtotal: 110000,
      },
    ],
  },
  {
    id: "inv-005",
    invoiceNumber: "INV-2024-005",
    customerName: "Andi Wijaya",
    customerEmail: "andi.wijaya@example.com",
    customerPhone: "087712345678",
    totalAmount: 310000,
    status: "CANCELLED",
    createdAt: "2024-03-01T16:45:00Z",
    paymentMethod: "Transfer Bank (BCA)",
    shippingAddress: "Jl. Melati No. 7, Semarang, Jawa Tengah",
    subtotal: 280000,
    discount: 10000,
    tax: 20000,
    shipping: 20000,
    items: [
      {
        id: "p5",
        productName: "Toraja Peaberry 250g",
        price: 140000,
        quantity: 2,
        subtotal: 280000,
      },
    ],
  },
];
