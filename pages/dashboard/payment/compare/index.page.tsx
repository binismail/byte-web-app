import { Receive } from 'iconsax-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import CompareSalesCard from '../../../../components/payment/compare-sales-card';
import InventoryAnalyticsTable from '../../../../components/payment/inventory-analytics-table';
import LoadingState from '../../../../components/shared/loading-state';
import { isEmpty } from '../../../../helpers/is-emtpy';
import { useGetAnalyticsQuery } from '../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../_app.page';
import { MostSold, PaymentAnalyticsRootType } from '../payement.types';

const Payment: NextPageWithLayout = () => {
  // DATA INITIALIZATION: CURRENT DATA
  const router = useRouter();
  const { type, endDate, startDate } = router.query;

  // STATES
  const [businessAnalytics, setBusinessAnalytics] =
    useState<PaymentAnalyticsRootType | null>();

  // API CALL HOOK
  const params = new URLSearchParams();
  params.append('previousDate', `${startDate}`);
  params.append('currentDate', `${endDate}`);
  params.append('type', `${type}`);
  const paramsUrl = params.toString();
  const {
    data,
    isLoading: getBusinessAnalyticsLoading,
    isError,
  } = useGetAnalyticsQuery(paramsUrl, {
    refetchOnMountOrArgChange: true,
  });

  // SIDE EFFECTS
  useEffect(() => {
    if (!isError && !isEmpty(data)) {
      setBusinessAnalytics(data?.data);
    }
  }, [data, isError]);

  return (
    <div>
      <Head>
        <title>Compare - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* main */}
      <div className="flex flex-col gap-12 pb-10">
        {getBusinessAnalyticsLoading ? (
          <LoadingState heightTailwind="h-[70vh]" />
        ) : !isEmpty(businessAnalytics) ? (
          <>
            {/* Sales and Expenses */}
            <div className="w-full flex flex-col gap-4">
              {/* title */}
              <h3 className="font-normal text-xl text-[#30333B]">
                Sales and Expenses
              </h3>

              <div className="grid grid-cols-4 items-center gap-x-6 w-full">
                <CompareSalesCard
                  date={endDate as string}
                  title="Sales"
                  Icon={Receive}
                  iconColor="#19A97B"
                  count={
                    businessAnalytics?.records.sales.currentSalesCount as number
                  }
                  textColor="text-[#19A97B]"
                />
                <CompareSalesCard
                  date={endDate as string}
                  title="Expense"
                  Icon={Receive}
                  iconColor="#944A05"
                  count={
                    businessAnalytics?.records.expenses
                      .currentExpensesCount as number
                  }
                  textColor="text-[#944A05]"
                />
                <CompareSalesCard
                  date={startDate as string}
                  title="Sales"
                  Icon={Receive}
                  iconColor="#19A97B"
                  count={
                    businessAnalytics?.records.sales
                      .previousSalesCount as number
                  }
                  textColor="text-[#19A97B]"
                />
                <CompareSalesCard
                  date={startDate as string}
                  title="Expense"
                  Icon={Receive}
                  iconColor="#944A05"
                  count={
                    businessAnalytics?.records.expenses
                      .previousExpensesCount as number
                  }
                  textColor="text-[#944A05]"
                />
              </div>
            </div>

            {/* Inventory */}
            <div className="w-full flex flex-col gap-2">
              <h3 className="font-normal text-xl text-[#30333B]">Most sold</h3>

              <div className="flex flex-col gap-x-6 w-full">
                <InventoryAnalyticsTable
                  isSent={true}
                  inventories={
                    businessAnalytics?.inventory?.mostSold as MostSold[]
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-[70vh] text-base text-[#565A63] flex items-center justify-center">
            No available analytics
          </div>
        )}
      </div>
    </div>
  );
};

Payment.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Compare">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default Payment;
