import { useState } from 'react';
import {
  LeastAcquired,
  LeastSold,
  MostAcquired,
  MostSold,
} from '../../../pages/dashboard/payment/payement.types';
import InventoryAnalyticsTable from '../inventory-analytics-table';

type Props = {
  mostInventories: MostSold[] | MostAcquired[];
  leastInventories: LeastSold[] | LeastAcquired[];
  leftTabText: string;
  rightTabText: string;
  isSent: boolean;
};

const InventoryContent = ({
  mostInventories,
  leastInventories,
  isSent,
  leftTabText,
  rightTabText,
}: Props) => {
  // STATES
  const [isMost, setIsMost] = useState(false);
  return (
    <div className="w-full flex flex-col gap-4">
      {/* title */}
      <div className="w-full flex flex-col gap-3">
        <h3 className="font-normal text-xl text-[#30333B]">Inventory</h3>

        {/*  */}
        <div className="flex items-center gap-3">
          {/* Received */}
          <button
            onClick={() => setIsMost(false)}
            className={`${
              !isMost
                ? 'bg-[#15171F] text-white hover:opacity-70'
                : 'bg-gray-100 text-[#565A63] hover:bg-gray-200'
            } py-2 px-5 font-normal text-base rounded-[32px] transition-all`}
          >
            {leftTabText}
          </button>

          {/* Sent */}
          <button
            onClick={() => setIsMost(true)}
            className={`${
              isMost
                ? 'bg-[#15171F] text-white hover:opacity-70'
                : 'bg-gray-100 text-[#565A63] hover:bg-gray-200'
            } py-2 px-5 font-normal text-base rounded-[32px] transition-all`}
          >
            {rightTabText}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-x-6 w-full">
        <InventoryAnalyticsTable
          isSent={isSent}
          inventories={isMost ? mostInventories : leastInventories}
        />
      </div>
    </div>
  );
};

export default InventoryContent;
