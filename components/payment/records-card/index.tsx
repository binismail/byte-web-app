import { Icon } from 'iconsax-react';
import { BusinessAnalyticsType } from '../../../pages/dashboard/payment/payement.types';

type Props = {
  Icon: Icon;
  title: string;
  amount: number;
  periodType: BusinessAnalyticsType;
  recordPercentage: number;
};

const RecordsCard = ({
  Icon,
  title,
  amount,
  periodType,
  recordPercentage,
}: Props) => {
  // DATA INITIALIZATION
  const period = {
    day: 'Yesterday',
    week: 'Last week',
    month: 'Last month',
    year: 'Last Year',
  };
  return (
    <div className="flex flex-col gap-6 bg-white p-6 border border-[#D0D6DB] rounded-2xl">
      {/* icon and text */}
      <div className="inline-flex flex-col gap-4">
        <Icon size="28" color="#30333B" variant="Outline" />

        <p className="text-[#808691] text-xs font-normal">{title}</p>
      </div>

      {/* amount */}
      <div className="inline-flex flex-col gap-4">
        <p className="text-[#30333B] font-semibold text-[32px]">
          {amount.toLocaleString('en-US')}
        </p>

        <div className="text-sm text-[#808691] font-normal inline-flex items-center gap-1">
          <span
            className={
              recordPercentage < 0
                ? 'text-[#CF4F66]'
                : recordPercentage === 0
                ? 'text-[#808691]'
                : 'text-[#19A97B]'
            }
          >
            {recordPercentage <= 0
              ? `${recordPercentage}`
              : `+${recordPercentage}`}
            %
          </span>{' '}
          than {period[`${periodType}`]}
        </div>
      </div>
    </div>
  );
};

export default RecordsCard;
