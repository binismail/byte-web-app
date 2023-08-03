import { Dispatch, SetStateAction } from 'react';
import {
  BusinessAnalyticsType,
  PaymentAnalyticsRootType,
} from '../../../pages/dashboard/payment/payement.types';
import ReceivedAnalytics from '../../payment/received-analytics';
import SentAnalytics from '../../payment/sent-analytics';
import LoadingState from '../../shared/loading-state';

type Props = {
  getAnalyticsLoading: boolean;
  isAnalyticsEmpty: boolean;
  isSent: boolean;
  businessAnalytics: PaymentAnalyticsRootType;
  periodType: BusinessAnalyticsType;
  setType: Dispatch<SetStateAction<BusinessAnalyticsType>>;
  previousDate: string;
  currentDate: string;
};

const AnalyticsContents = ({
  getAnalyticsLoading,
  isAnalyticsEmpty,
  isSent,
  businessAnalytics,
  periodType,
  setType,
  previousDate,
  currentDate,
}: Props) => {
  // DATA INITIALIZATION
  const typeOption = [
    {
      label: 'Day',
      value: 'day',
    },
    {
      label: 'Month',
      value: 'month',
    },
    {
      label: 'Year',
      value: 'year',
    },
  ];
  return (
    <>
      {getAnalyticsLoading ? (
        <LoadingState heightTailwind="h-[70vh]" />
      ) : !isAnalyticsEmpty ? (
        <>
          {isSent ? (
            <SentAnalytics
              previousDate={previousDate}
              currentDate={currentDate}
              setType={setType}
              typeOption={typeOption}
              inventory={businessAnalytics.inventory}
              currentSalesAmount={
                businessAnalytics.records.sales.currentSalesAmount
              }
              salesAmountPercentageChange={
                businessAnalytics.records.sales.salesAmountPercentageChange
              }
              currentExpensesAmount={
                businessAnalytics.records.expenses.currentExpensesAmount
              }
              expensesAmountPercentageChange={
                businessAnalytics.records.expenses
                  .expensesAmountPercentageChange
              }
              periodType={periodType}
              outboundCollectionsMade={
                businessAnalytics.transactions.outbound.currentOutboundPayments
              }
              outboundProductsAcquired={
                businessAnalytics.records.expenses.productsAcquired
              }
              isSent={isSent}
            />
          ) : (
            <ReceivedAnalytics
              previousDate={previousDate}
              currentDate={currentDate}
              setType={setType}
              typeOption={typeOption}
              inventory={businessAnalytics.inventory}
              currentSalesAmount={
                businessAnalytics.records.sales.currentSalesAmount
              }
              salesAmountPercentageChange={
                businessAnalytics.records.sales.salesAmountPercentageChange
              }
              currentExpensesAmount={
                businessAnalytics.records.expenses.currentExpensesAmount
              }
              expensesAmountPercentageChange={
                businessAnalytics.records.expenses
                  .expensesAmountPercentageChange
              }
              periodType={periodType}
              inboundCollectionsMade={
                businessAnalytics.transactions.inbound.currentInboundPayments
              }
              inboundProductsSold={businessAnalytics.records.sales.productsSold}
              inboundTotalStock={businessAnalytics.inventory.totalStocks}
              isSent={isSent}
            />
          )}
        </>
      ) : (
        <div className="w-full h-[70vh] text-base text-[#565A63] flex items-center justify-center">
          No available analytics
        </div>
      )}
    </>
  );
};

export default AnalyticsContents;
