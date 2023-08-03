import { WalletAdd1 } from 'iconsax-react';

type Props = {
  amount: number;
  title: string;
  isSent: boolean;
};

const CollectionsMadeCard = ({ amount, title, isSent }: Props) => {
  return (
    <div
      className={`flex flex-col gap-8 ${
        !isSent ? 'bg-[#6A78D1]' : 'bg-[#FDCF69]'
      } p-6 rounded-2xl cursor-pointer`}
    >
      {/* icon and text */}
      <div className="inline-flex flex-col gap-4">
        <WalletAdd1
          size="28"
          color={!isSent ? '#FFF' : '#15171F'}
          variant="Outline"
        />

        <p
          className={`${
            !isSent ? 'text-[#CDD2F0]' : 'text-[#565A63]'
          } text-xl font-normal`}
        >
          {title}
        </p>
      </div>

      {/* amount */}
      <p
        className={`${
          !isSent ? 'text-white' : 'text-[#15171F]'
        } font-semibold text-[32px]`}
      >
        ₦{amount.toLocaleString('en-US')}
      </p>
    </div>
  );
};

export default CollectionsMadeCard;
