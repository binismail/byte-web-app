import { Eye, EyeSlash } from 'iconsax-react';
import { useState } from 'react';

type Props = {
  balance?: number;
  loading: boolean;
};

const TransactionBalance = ({ balance = 0, loading }: Props) => {
  // STATES
  const [balanceisHidden, setBalanceIsHidden] = useState<boolean>(true);

  return (
    <div className="flex items-center gap-1">
      <span className="font-normal text-[32px] text-[#232846]">
        {loading
          ? 'Loading...'
          : !balanceisHidden
          ? `₦${balance.toLocaleString('en-US')}`
          : '******'}
      </span>

      {/* icon */}
      <div>
        {balanceisHidden ? (
          <Eye
            onClick={() => setBalanceIsHidden(false)}
            className="cursor-pointer"
            size="18"
            color="#232846"
          />
        ) : (
          <EyeSlash
            onClick={() => setBalanceIsHidden(true)}
            className="cursor-pointer ml-2"
            size="18"
            color="#232846"
          />
        )}
      </div>
    </div>
  );
};

export default TransactionBalance;
