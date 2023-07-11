import { ITotalAmount } from './total-amount';

const base: ITotalAmount = {
  value: '',
  subTotal: 0,
  taxAmount: 0,
  discountPercentage: 0,
};

export const mockTotalAmountProps = {
  base,
};
