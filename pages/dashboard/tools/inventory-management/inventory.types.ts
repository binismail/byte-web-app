export type InventoryContentType = {
  productImage: null | string;
  productDescription: string;
  _id: string;
  productName: string;
  productCategory: string;
  unitCostPrice: number;
  unitSellingPrice: number;
  productQuantityStocked: number;
  accountID: number;
  business: string;
  num: string;
  productQuantityRemaining: number;
  createdAt: string;
  updatedAt: string;
  [x: string | number | symbol]: unknown;
};

export type InventoryDetailsType = {
  productImage: null | string;
  productDescription: string;
  overallStock: number;
  salesCount: number;
  _id: string;
  productName: string;
  productCategory: string;
  unitCostPrice: number;
  unitSellingPrice: number;
  productQuantityStocked: number;
  accountID: number;
  business: string;
  num: string;
  productQuantityRemaining: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [x: string | number | symbol]: unknown;
};

export type CreateInventoryType = {
  productImage?: string | null;
  productName: string;
  productDescription: string;
  productCategory: string;
  unitCostPrice: number;
  unitSellingPrice: number;
  productQuantityStocked: number;
};

export type UpdateInventoryType = {
  productName: string;
  productDescription: string;
  productCategory: string;
  unitCostPrice: number;
  unitSellingPrice: number;
};
