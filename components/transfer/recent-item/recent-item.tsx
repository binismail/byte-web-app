import { ArrowRight2, Bank } from 'iconsax-react';
import { useEffect, useMemo } from 'react';
export interface IRecentItem {
  value: string;
  subTotal: number;
  taxAmount: number;
  discountPercentage: number;
  setFields?: (total: number, discountAmount: number) => void;
}

const RecentItem: React.FC<IRecentItem> = ({
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
  }, [total, discountAmount, setFields]);
  return (
    <div className="flex justify-between mt-4">
      <div className="flex justify-center flex-center">
        <div className="mr-md-1 w-[30px] h-[30px] bg-gray-200 rounded-[50%] inline-flex items-center justify-center">
          <Bank size="16" color="#19A97B" variant="Bold" />
        </div>
        <div>
          <p className="text-[16px]">Khalid Ismail</p>
          <p className="text-[#808691] text-[12px]">
            <span>Sent N20,000</span>*<span>12th, Oct. 2023. - 2:00pm</span>
          </p>
        </div>
      </div>
      <ArrowRight2 size="18" color="#565A63" />
    </div>
  );
};

export default RecentItem;
