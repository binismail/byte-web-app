import { Icon } from 'iconsax-react';

type Props = {
  Icon: Icon;
  title: string;
  amount: number;
};

const ProductsCard = ({ Icon, title, amount }: Props) => {
  return (
    <div className="flex flex-col gap-8 bg-white p-6 border border-[#D0D6DB] rounded-2xl cursor-pointer">
      {/* icon and text */}
      <div className="inline-flex flex-col gap-4">
        <Icon size="28" color="#30333B" variant="Outline" />

        <p className="text-[#808691] text-xl font-normal">{title}</p>
      </div>

      {/* amount */}
      <p className="text-[#30333B] font-semibold text-[32px]">
        {amount.toLocaleString('en-US')}
      </p>
    </div>
  );
};

export default ProductsCard;
