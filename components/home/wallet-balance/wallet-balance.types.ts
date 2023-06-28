export type WalletInfoType = {
  currency: string;
  country: string;
  availableBalance: number;
  previousBalance: number;
  bookedBalance: number;
  _id: string | null;
  accountID: number | null;
  walletID: number | null;
  walletRef: string | null;
  [x: string | number | symbol]: unknown;
};
