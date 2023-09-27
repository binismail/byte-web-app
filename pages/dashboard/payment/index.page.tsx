import { WalletMoney } from 'iconsax-react';
import Head from 'next/head';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import AnalyticsContents from '../../../components/layouts/payment/analytics-contents';
import AnalyticsTab from '../../../components/payment/analytics-tab';
import TransactionBalance from '../../../components/payment/transaction-balance';
import { isEmpty } from '../../../helpers/is-emtpy';
import { subtractFromDate } from '../../../helpers/subtract-from-date';
import { useGetAnalyticsQuery } from '../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../_app.page';
import {
  BusinessAnalyticsType,
  PaymentAnalyticsRootType,
} from './payement.types';

export interface IPayment {
  sampleTextProp: string;
}

const Payment: NextPageWithLayout = () => {
  // DATA INITIALIZATION: CURRENT DATA
  const currentDate = new Date().toLocaleDateString('en-CA');

  // STATES
  const [businessAnalytics, setBusinessAnalytics] =
    useState<PaymentAnalyticsRootType | null>();
  const [type, setType] = useState<BusinessAnalyticsType>('day');
  const [isSent, setIsSent] = useState<boolean>(false);

  // HOOKS
  const previousDate = useMemo(() => {
    let newPrevDate;
    if (type === 'day') {
      newPrevDate = subtractFromDate(new Date(currentDate), {
        days: 1,
      }).toLocaleDateString('en-CA');

      return newPrevDate;
    } else if (type === 'month') {
      newPrevDate = subtractFromDate(new Date(currentDate), {
        months: 1,
      }).toLocaleDateString('en-CA');

      return newPrevDate;
    } else if (type === 'year') {
      newPrevDate = subtractFromDate(new Date(currentDate), {
        years: 1,
      }).toLocaleDateString('en-CA');

      return newPrevDate;
    } else {
      newPrevDate = subtractFromDate(new Date(currentDate), {
        days: 1,
      }).toLocaleDateString('en-CA');

      return newPrevDate;
    }
  }, [type, currentDate]);

  // API CALL HOOK
  const params = new URLSearchParams();
  params.append('previousDate', `${previousDate}`);
  params.append('currentDate', `${currentDate}`);
  params.append('type', type);
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
        <title>Payment - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* main */}
      <div className="flex flex-col gap-4 pb-10">
        {/* Header container */}
        <div className="flex w-full flex-col">
          {/* icon container */}
          <div className="flex gap-2 items-center">
            {/* icon */}
            <WalletMoney size="12" color="#353C69" variant="Bold" />

            {/* title */}
            <p className="font-normal text-base text-[#353C69]">Transactions</p>
          </div>

          {/* Balance Amount */}
          <TransactionBalance
            loading={getBusinessAnalyticsLoading}
            balance={
              isSent
                ? businessAnalytics?.transactions.inbound.currentInboundPayments
                : businessAnalytics?.transactions.outbound
                    .currentOutboundPayments
            }
          />
        </div>

        {/* Tabs */}
        <div className="w-full flex flex-col gap-8">
          <AnalyticsTab isSent={isSent} setIsSent={setIsSent} />
          <AnalyticsContents
            previousDate={previousDate}
            currentDate={currentDate}
            setType={setType}
            periodType={type}
            businessAnalytics={businessAnalytics as PaymentAnalyticsRootType}
            getAnalyticsLoading={getBusinessAnalyticsLoading}
            isAnalyticsEmpty={isEmpty(businessAnalytics)}
            isSent={isSent}
          />
        </div>
      </div>
    </div>
  );
};

Payment.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout headerTitle="Payment">{page}</DashboardLayout>
    </Layout>
  );
};

export default Payment;
