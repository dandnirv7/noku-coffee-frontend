export type Address = {
  id: string;
  label: string;
  receiverName: string;
  phone: string;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
};

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  phone?: string;
  notifOrder?: boolean;
  notifPromo?: boolean;
}
