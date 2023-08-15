import { Bank, Copy } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { copyToClipBoard } from '../../../../helpers/copy-to-clipboard';
import { isEmpty } from '../../../../helpers/is-emtpy';
import { useGetVirtualBankQuery } from '../../../../lib/services/businessApi';

const FundWalletBank = () => {
  // STATES
  const [virtualBank, setVirtualBank] = useState({
    accountNumber: '',
    walletName: '',
    bankName: '',
  });

  // DATA INITIALIZATION
  const { data, isError, isLoading } = useGetVirtualBankQuery();

  // SIDE EFFECTS
  useEffect(() => {
    if (!isError && !isEmpty(data)) {
      const obj = data.data[0];
      setVirtualBank({
        accountNumber: obj.accountNumber,
        walletName: obj.walletName,
        bankName: obj.bankName,
      });
    }
  }, [data, isError]);

  return (
    <div className="flex flex-col w-full mt-8 mb-4 p-5">
      {/* container */}
      {isLoading ? (
        <div className="flex w-full h-[50vh] items-center justify-center text-sm text-gray-500">
          loading...
        </div>
      ) : !isEmpty(virtualBank) ? (
        <div className="flex w-full flex-col gap-7 mt-2">
          {/* icon */}
          <div className="w-full flex flex-col items-center">
            <span className="bg-[#EFF1FA] inline-flex items-center justify-center rounded-[50%] w-[72px] h-[72px]">
              <Bank size="28" color="#6A78D1" variant="Bold" />
            </span>
          </div>

          {/* title */}
          <p className="w-full text-[#15171F] font-normal text-sm">
            You can fund your Byte Pocket by sending money from any bank to the
            bank details provided below:
          </p>

          {/* secondary information */}
          <div className="w-full flex flex-col gap-6">
            {/* Bank */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-label">Bank</label>
              <p className="text-value">{virtualBank.bankName}</p>
            </div>

            {/* Account Number */}
            <div className="w-full flex items-start justify-between gap-3">
              {/* account number */}
              <div className="inline-flex flex-col gap-2">
                <label className="text-label">Account number</label>
                <p className="text-value">{virtualBank.accountNumber}</p>
              </div>

              {/* copy icon */}
              <div
                onClick={async () => {
                  copyToClipBoard(virtualBank.accountNumber);
                }}
                className="inline-flex gap-1 items-center cursor-pointer"
              >
                <span className="text-[#6A78D1] text-[13px] font-normal">
                  Copy
                </span>
                <Copy size="18" color="#6A78D1" variant="Bold" />
              </div>
            </div>

            {/* Account Name */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-label">Wallet name</label>
              <p className="text-value">{virtualBank.walletName}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[50vh] flex items-center justify-center text-sm text-gray-500">
          {"You haven't created a virtual account yet"}
        </div>
      )}
    </div>
  );
};

export default FundWalletBank;
