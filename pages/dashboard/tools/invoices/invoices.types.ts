export type InvoiceDetailsType = {
  customer: Customer;
  status: string;
  discountPercentage: number;
  taxAmount: number;
  discountAmount: number;
  _id: string;
  type: string;
  issuedDate: string;
  dueDate: string;
  products: Product[];
  subTotal: number;
  totalAmount: number;
  accountID: number;
  business: string;
  num: string;
  services: Service[];
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
};

export type SingleInvoiceDetailsType = {
  customer: Customer;
  paymentMethod: string;
  discountPercentage: number;
  taxAmount: number;
  discountAmount: number;
  type: string;
  issuedDate: string;
  dueDate: string;
  products?: Product[];
  subTotal: number;
  totalAmount: number;
  services?: Service[];
};

export type Customer = {
  name: string;
  phone: string;
  [x: string | number | symbol]: unknown;
};

export type Product = {
  taxPercentage: number;
  _id?: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export interface Service {
  taxPercentage: number;
  _id?: string;
  name: string;
  cost: number;
}
