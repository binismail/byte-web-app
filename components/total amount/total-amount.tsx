import { useEffect, useMemo } from 'react';
import styles from './total-amount.module.scss';
export interface ITotalAmount {
  value: string;
  subTotal: number;
  taxAmount: number;
  discountPercentage: number;
  setFields?: (total: number, discountAmount: number) => void;
}

const TotalAmount: React.FC<ITotalAmount> = ({
  value,
  subTotal,
  taxAmount,
  discountPercentage,
  setFields,
}) => {
  // HOOKS
  const { total, discountAmount } = useMemo(() => {
    const discountAmount = discountPercentage
      ? (subTotal * discountPercentage) / 100
      : 0;
    const total = subTotal + taxAmount - discountAmount;

    // return total
    return { total, discountAmount };
  }, [subTotal, taxAmount, discountPercentage]);

  // SIDE EFFECTS
  useEffect(() => {
    setFields ? setFields(total, discountAmount) : null;
  }, [total, discountAmount]);
  return (
    <div className={styles.container}>
      <p className="text-[#808691] text-base font-normal">Total Amount</p>
      <p className="text-[#19A97B] text-xl font-normal">{`₦${total.toLocaleString(
        'en-US'
      )}`}</p>
    </div>
  );
};

export default TotalAmount;
