export type BankType = {
  code: string;
  id: number;
  name: string;
};

export type PosDetailTypes = {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  amount: number | string;
  note: string;
};

export type FundWalletDetailTypes = {
  transPin: string;
  cardChargeAmount: number;
  creditAmount: number;
  cardToken: string;
};

export type RequestPosTypes = {
  transPin: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  amount: number | null;
  note: string;
};

export type ResolveBankType = {
  accountNumber: string;
  bankCode: string;
};
