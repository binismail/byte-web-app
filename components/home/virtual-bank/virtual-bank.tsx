import { Copy } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { isEmpty } from '../../../helpers/is-emtpy';
import { useGetVirtualBankQuery } from '../../../lib/services/businessApi';
import { VirtualBankInfoType } from './virtual-bank.types';

const VirtualBank = () => {
  // STATES
  const [VirtualBankInfo, setVirtualBankInfo] = useState<VirtualBankInfoType>({
    bankName: '',
    accountNumber: '',
    orderRef: '',
    flwRef: '',
    transRef: '',
    _id: null,
    accountID: null,
    userType: '',
    provider: '',
  });

  //   DATA INITIALIZATION
  const { data, isError } = useGetVirtualBankQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // SIDE EFFECTS
  useEffect(() => {
    if (!isError && !isEmpty(data)) {
      setVirtualBankInfo(data?.data[0]);
    }
  }, [data, isError]);

  return (
    <div className="flex items-center gap-1 ">
      <div>
        <p className="text-[#808691] capitalize">{VirtualBankInfo.provider}</p>
        <p className="tracking-[.5em] text-[#838ED9]">
          {VirtualBankInfo.accountNumber}
        </p>
        <p className="text-[#30333B]">{VirtualBankInfo.bankName}</p>
      </div>
      <p className="flex rounded-full px-4 py-2 bg-[#F0F2F5] text-sm ">
        <span className="mr-2">Copy </span>
        <Copy size="15" color="#30333B" variant="Bold" />
      </p>
    </div>
  );
};

export default VirtualBank;
