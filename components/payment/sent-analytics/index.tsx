import {
  ArrangeHorizontalCircle,
  Receive,
  ShoppingCart,
  Transmit,
} from 'iconsax-react';
import { Dispatch, SetStateAction, useState } from 'react';
import Select from 'react-select';
import {
  BusinessAnalyticsType,
  Inventory,
} from '../../../pages/dashboard/payment/payement.types';
import CollectionsMadeCard from '../collections-made-card';
import CompareModal from '../compare-modal';
import InventoryContent from '../inventory-content';
import ProductsCard from '../products-card';
import RecordsCard from '../records-card';

type Props = {
  outboundCollectionsMade: number;
  outboundProductsAcquired: number;
  periodType: BusinessAnalyticsType;
  currentSalesAmount: number;
  salesAmountPercentageChange: number;
  currentExpensesAmount: number;
  expensesAmountPercentageChange: number;
  inventory: Inventory;
  isSent: boolean;
  typeOption: { label: string; value: string }[];
  setType: Dispatch<SetStateAction<BusinessAnalyticsType>>;
  previousDate: string;
  currentDate: string;
};

const SentAnalytics = ({
  outboundCollectionsMade,
  outboundProductsAcquired,
  periodType,
  currentSalesAmount,
  salesAmountPercentageChange,
  currentExpensesAmount,
  expensesAmountPercentageChange,
  inventory,
  isSent,
  typeOption,
  setType,
  previousDate,
  currentDate,
}: Props) => {
  // STATES
  const [compareModalState, setCompareModalState] = useState(false);

  return (
    <div className="w-full h-full flex flex-col gap-16">
      {compareModalState && (
        <CompareModal
          previousDate={previousDate}
          currentDate={currentDate}
          periodType={periodType}
          setCompareModalState={setCompareModalState}
        />
      )}

      {/* Analytics */}
      <div className="w-full flex flex-col gap-4">
        {/* title */}
        <div className="w-full flex items-center justify-between">
          <h3 className="font-normal text-xl text-[#30333B]">Analytics</h3>

          <div className="inline-flex items-center gap-2">
            <h3 className="font-normal text-base text-[#808691]">Period</h3>

            {/* select period */}
            <Select
              classNames={{
                control: (state: any) =>
                  state.isFocused
                    ? 'border-red-600 h-[28px] w-full text-sm mt-0 !rounded-xl'
                    : 'border-grey-300 h-[28px] w-full text-sm mt-0 !rounded-xl',
                indicatorSeparator: () => '!bg-transparent',
                valueContainer: () => '!px-3',
              }}
              name="period"
              value={typeOption.find((type) => type.value === periodType)}
              onChange={(selectedOption: any) => {
                setType(selectedOption?.value as BusinessAnalyticsType);
              }}
              placeholder="Select period"
              options={typeOption}
            />
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 items-center gap-x-6 w-full">
          {/* Collections made */}
          <CollectionsMadeCard
            isSent={isSent}
            title="Outbound"
            amount={outboundCollectionsMade}
          />

          {/* Products sold */}
          <ProductsCard
            Icon={ShoppingCart}
            title="Products acquired"
            amount={outboundProductsAcquired}
          />
        </div>
      </div>

      {/* Sales and Expenses */}
      <div className="w-full flex flex-col gap-4">
        {/* title */}
        <div className="w-full flex items-center justify-between">
          <h3 className="font-normal text-xl text-[#30333B]">
            Sales and Expenses
          </h3>

          {/* compare modal toggle */}
          <div
            onClick={() => setCompareModalState(!compareModalState)}
            className="inline-flex tiems-center gap-2 cursor-pointer rounded-xl hover:bg-gray-100 py-2 px-3"
          >
            <ArrangeHorizontalCircle
              size="28"
              color="#565A63"
              variant="Outline"
            />

            <span className="font-normal text-base my-auto text-[#808691]">
              Compare
            </span>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 items-center gap-x-6 w-full">
          <RecordsCard
            periodType={periodType}
            Icon={Receive}
            amount={currentSalesAmount}
            title="Sales"
            recordPercentage={salesAmountPercentageChange}
          />

          <RecordsCard
            periodType={periodType}
            Icon={Transmit}
            amount={currentExpensesAmount}
            title="Expenses"
            recordPercentage={expensesAmountPercentageChange}
          />
        </div>
      </div>

      {/* Inventory */}
      <InventoryContent
        leftTabText="Most acquired"
        rightTabText="Least acquired"
        mostInventories={inventory.mostAcquired}
        leastInventories={inventory.leastAcquired}
        isSent={isSent}
      />
    </div>
  );
};

export default SentAnalytics;
