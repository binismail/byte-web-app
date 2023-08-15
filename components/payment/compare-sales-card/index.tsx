import { Icon } from 'iconsax-react';

type Props = {
  Icon: Icon;
  date: string;
  iconColor: string;
  title: string;
  count: number;
  textColor: string;
};

const CompareSalesCard = ({
  Icon,
  date,
  iconColor,
  title,
  count,
  textColor,
}: Props) => {
  return (
    <div className="flex flex-col gap-6 bg-white p-6 border border-[#D0D6DB] rounded-2xl">
      {/* date and icon */}
      <div className="inline-flex flex-col gap-4">
        <p className={`text-[#808691] text-base font-semibold`}>{date}</p>

        <Icon size="28" color={iconColor} variant="Outline" />
      </div>

      {/* amount */}
      <div className="inline-flex flex-col gap-4">
        <p className={`text-[#808691] text-xs font-bold`}>{title}</p>
        <p className={`${textColor} font-normal text-2xl`}>
          {count.toLocaleString('en-US')}
        </p>
      </div>
    </div>
  );
};

export default CompareSalesCard;
