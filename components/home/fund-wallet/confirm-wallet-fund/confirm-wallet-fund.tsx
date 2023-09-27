import { Card, Lock1 } from 'iconsax-react';
import { useMemo, useState } from 'react';
import Switch from 'react-switch';
import Button from '../../../shared/butttons/button/button';
import Input from '../../../shared/input/input/input';

type Props = {
  amount: number;
  onProceedClick: (chargedAmount: number) => void;
};

const ConfirmWalletFund = ({ amount, onProceedClick }: Props) => {
  console.log(onProceedClick);
  // STATES
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // HOOKS
  const chargedAmount = useMemo<number>(() => {
    const charge = 0.015 * +amount > 3000 ? 3000 : 0.015 * +amount;
    const chargedAmount = !isSwitchOn ? +amount + charge : +amount - charge;

    return chargedAmount;
  }, [amount, isSwitchOn]);

  return (
    <div className="flex flex-col w-full mt-8 mb-4 p-5">
      {/* container */}
      <div className="flex w-full flex-col gap-7 mt-2">
        {/* icon */}
        <div className="w-full flex flex-col items-center">
          <span className="bg-[#EFF1FA] inline-flex items-center justify-center rounded-[50%] w-[72px] h-[72px]">
            <Card size="28" color="#6A78D1" variant="Bold" />
          </span>
        </div>

        {/* title */}
        <p className="w-full text-[#15171F] font-normal text-sm">
          How much would you like to fund your Byte Pocket with?
        </p>

        {/* data fields */}
        <div className="flex w-full flex-col gap-5">
          <label htmlFor="amount" className="flex w-full gap-2 flex-col">
            {/* title */}
            <span className="text-sm font-normal text-[#30333B]">Amount</span>

            {/* input */}
            <Input
              name="amount"
              value={`₦ ${chargedAmount.toLocaleString('en-US')}`}
              placeholder="Amount"
              type="text"
              readOnly={true}
            />
            <span className="text-sm font-normal text-[#808691]">
              You will be charged{' '}
              <span className="text-red-500">
                ₦
                {(0.015 * amount > 3000 ? 3000 : 0.015 * amount).toLocaleString(
                  'en-US'
                )}
              </span>{' '}
              transaction fee to fund this amount via card.
            </span>
          </label>

          {/* deduct fee from amount */}
          <div className="flex w-full justify-between gap-2 items-center">
            <span className="text-[#565A63] text-sm font-normal">
              Deduct fee from amount
            </span>

            <Switch
              onColor="#19A97B"
              offColor="#D0D6DB"
              checkedIcon={false}
              uncheckedIcon={false}
              activeBoxShadow="0 0 1px 1px #D0D6DB"
              onChange={() => setIsSwitchOn((prevState) => !prevState)}
              checked={isSwitchOn}
            />
          </div>

          {/* button */}
          <div className="flex w-full flex-col items-stretch">
            <Button
              click={(chargedAmount:number) => onProceedClick(chargedAmount)}
              color="btnPrimary"
              title="Proceed"
              type="block"
            />
          </div>
        </div>

        {/* extra information */}
        <div className="flex w-full gap-5 items-center">
          {/* icon */}
          <span className="bg-[#F4E1D4] inline-flex items-center justify-center rounded-xl w-[35px] h-[35px]">
            <Lock1 size="18" color="#6A78D1" variant="TwoTone" />
          </span>

          <p className="w-[70%] font-normal text-sm text-[#565A63]">
            Your card information is protected by the best security. We do not
            have access to it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWalletFund;
