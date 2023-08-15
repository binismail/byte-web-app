export interface SalesRecordType {
  customer: RecordCustomer;
  description: any;
  _id: string;
  type: string;
  dealType: string;
  paymentMethod: string;
  date: string;
  services: RecordService[];
  totalAmount: number;
  accountID: number;
  business: string;
  products: RecordProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseRecordType {
  description: string;
  _id: string;
  type: string;
  dealType: string;
  date: string;
  services: RecordService[];
  totalAmount: number;
  accountID: number;
  business: string;
  products: RecordProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface SalesRecordDetailsType {
  customer: RecordCustomer;
  description?: string;
  _id?: string;
  type: string;
  dealType: string;
  paymentMethod: string;
  date: string;
  products?: RecordProduct[];
  totalAmount: number;
  accountID?: number;
  business?: string;
  services?: RecordService[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  [x: string | number]: unknown;
}

export interface ExpenseRecordDetailsType {
  description: string;
  _id?: string;
  type: string;
  dealType: string;
  expenseCategory?: string;
  date: string;
  products?: RecordProduct[];
  totalAmount: number;
  accountID?: number;
  business?: string;
  services?: RecordService[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  [x: string | number]: unknown;
}

export interface RecordService {
  _id?: string;
  name: string;
  cost: number;
}

export interface RecordProduct {
  _id?: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface RecordCustomer {
  name: string;
  phone: string;
}
