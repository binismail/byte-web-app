export type BusinessAnalyticsType = 'day' | 'week' | 'month' | 'year';

export interface TransferAnalyticsRootType {
  previousDateTime: string;
  currentDateTime: string;
  transactions: Transactions;
  records: Records;
  inventory: Inventory;
}

export interface Transactions {
  inbound: Inbound;
  outbound: Outbound;
}

export interface Inbound {
  currentInboundTransfers: number;
  previousInboundTransfers: number;
  inboundTransfersPercentageChange: number;
}

export interface Outbound {
  currentOutboundTransfers: number;
  previousOutboundTransfers: number;
  outboundTransfersPercentageChange: number;
}

export interface Records {
  sales: Sales;
  expenses: Expenses;
}

export interface Sales {
  productsSold: number;
  currentSalesAmount: number;
  currentSalesCount: number;
  previousSalesAmount: number;
  previousSalesCount: number;
  salesAmountPercentageChange: number;
}

export interface Expenses {
  productsAcquired: number;
  currentExpensesAmount: number;
  currentExpensesCount: number;
  previousExpensesAmount: number;
  previousExpensesCount: number;
  expensesAmountPercentageChange: number;
}

export interface Inventory {
  totalStocks: number;
  mostSold: MostSold[];
  mostAcquired: MostAcquired[];
  leastSold: LeastSold[];
  leastAcquired: LeastAcquired[];
}

export interface MostSold {
  productImage: any;
  salesCount: number;
  _id: string;
  productName: string;
  productQuantityStocked: number;
  productQuantityRemaining: number;
}

export interface MostAcquired {
  productImage: any;
  overallStock: number;
  _id: string;
  productName: string;
  productQuantityStocked: number;
  productQuantityRemaining: number;
}

export interface LeastSold {
  productImage: any;
  salesCount: number;
  _id: string;
  productName: string;
  productQuantityStocked: number;
  productQuantityRemaining: number;
}

export interface LeastAcquired {
  productImage: any;
  overallStock: number;
  _id: string;
  productName: string;
  productQuantityStocked: number;
  productQuantityRemaining: number;
}