// import { Eye, EyeSlash } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { isEmpty } from '../../../helpers/is-emtpy';
import { useGetWalletInfoQuery } from '../../../lib/services/businessApi';
import { WalletInfoType } from './wallet-balance.types';

const WalletBalance2 = () => {
  // STATES
  const [balanceisHidden, setBalanceIsHidden] = useState<boolean>(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfoType>({
    currency: '',
    country: '',
    availableBalance: 0,
    previousBalance: 0,
    bookedBalance: 0,
    _id: null,
    accountID: null,
    walletID: null,
    walletRef: null,
  });

  //   DATA INITIALIZATION
  const { data, isLoading, isError } = useGetWalletInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // SIDE EFFECTS
  useEffect(() => {
    if (!isError && !isEmpty(data)) {
      setWalletInfo(data?.data);
    }
    console.log(setBalanceIsHidden);
  }, [data, isError]);

  return (
    <div className="flex items-center gap-1 ">
      <span className="font-normal text-[32px] text-[#232846]">
        {isLoading
          ? 'Loading...'
          : !balanceisHidden
          ? `₦${walletInfo.availableBalance.toLocaleString('en-US')}`
          : '******'}
      </span>
    </div>
  );
};

export default WalletBalance2;
