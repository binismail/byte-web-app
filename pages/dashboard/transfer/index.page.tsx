import { Bank, WalletMoney } from 'iconsax-react';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import WalletBalance2 from '../../../components/home/wallet-balance/wallet-balance2';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import FundWalletLayout from '../../../components/layouts/home/fund-wallet-layout';
import MakePaymentLayout from '../../../components/layouts/home/make-payment-layout';
import Layout from '../../../components/layouts/layout';
import { isEmpty } from '../../../helpers/is-emtpy';
import { useGetAnalyticsQuery } from '../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../_app.page';
import RecentTable from './recent-table/recent-table';

export interface ITransfer {
  sampleTextProp: string;
}

const Transfer: NextPageWithLayout = () => {
  // DATA INITIALIZATION: CURRENT DATA

  // STATES
  // const [businessAnalytics, setBusinessAnalytics] =
  //   useState<TransferAnalyticsRootType | null>();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalState] = useState<boolean>(false);
  const [isFundWalletModalOpen, setIsFundWalletModalState] =
    useState<boolean>(false);

  // API CALL HOOK

  const {
    data,
    isError,
  } = useGetAnalyticsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  // SIDE EFFECTS
  useEffect(() => {
    if (!isError && !isEmpty(data)) {
      // setBusinessAnalytics(data?.data);
      console.log(successModal, errorModal);
    }
  }, [data, isError, successModal, errorModal]);

  return (
    <div>
      <Head>
        <title>Transfer - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* main */}
      <div className="flex flex-col gap-4 pb-10">
        {/* Header container */}
        <div className="flex w-full flex-col">
          {/* icon container */}
          <div className="flex gap-2 items-center">
            {/* title */}
            <p className="font-normal text-base text-[#353C69]">
              Account balance
            </p>

            {/* icon */}
            <WalletMoney size="12" color="#353C69" variant="Bold" />
          </div>
          {/* Balance Amount */}
          <WalletBalance2 />
        </div>

        {/* Tabs */}
        <div className="w-full flex  gap-8">
          {/* Make Payment layout */}
          <MakePaymentLayout
            isVisible={isPaymentModalOpen}
            setSuccessModal={setSuccessModal}
            setErrorModal={setErrorModal}
            setVisibility={setIsPaymentModalState}
          />

          {/* Fund Wallet modal */}
          <FundWalletLayout
            isVisible={isFundWalletModalOpen}
            setSuccessModal={setSuccessModal}
            setErrorModal={setErrorModal}
            setVisibility={setIsFundWalletModalState}
          />

          {/* <div className="flex gap-5 mt-7">
            <Button
              type="large"
              title="Fund wallet"
              color="btnLight"
              click={() => {
                setIsFundWalletModalState(true);
              }}
            />
            <Button
              type="large"
              click={() => {
                setIsPaymentModalState(true);
              }}
              title="Make a payment"
              color="btnPrimary"
            />
          </div> */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <div
                className="flex flex-col items-center border rounded-[10px] h-[350px] w-[220px] justify-center p-4 "
                onClick={() => {
                  setIsPaymentModalState(true);
                }}
              >
                <div className="flex p-3 items-center border rounded-[50px]  w-[45px] h-[45px]">
                  <Bank size="18" color="#353C69" variant="Bold" />
                </div>
                <p className="">Transfer to bank</p>
                <p className="text-[#808691] text-[14px] font-normal text-center">
                  Send money to any bank in NIgeria
                </p>
              </div>

              <div className="flex flex-col items-center border rounded-[10px] h-[350px] w-[220px] justify-center p-4">
                <div className="flex p-3 items-center border rounded-[50px]  w-[45px] h-[45px]">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7282 12.4485L13.879 8.93262C13.7263 8.61842 13.4839 8.35091 13.1791 8.16031C12.8743 7.96972 12.5192 7.86363 12.1541 7.85402H12.0565L12.3997 7.15085C12.5561 6.82688 12.6344 6.47399 12.6287 6.11781C12.6231 5.76163 12.5337 5.4111 12.3671 5.09172L10.5209 1.57859C10.368 1.26398 10.1251 0.996189 9.81975 0.805563C9.51438 0.614936 9.15874 0.509085 8.79311 0.5H1.9882C0.8935 0.5 0 1.45813 0 2.63757V9.9944C0.00182003 10.3788 0.103426 10.7569 0.295868 11.0954L3.49411 18.0992C3.60791 18.4896 3.84978 18.8357 4.18481 19.0875C4.51984 19.3393 4.93071 19.4837 5.35808 19.5H12.1423C12.5197 19.4907 12.8864 19.3784 13.1981 19.1767C13.5099 18.9749 13.7535 18.6922 13.8997 18.3626L15.7725 14.5189C15.9296 14.1927 16.0072 13.8373 15.9995 13.4789C15.9918 13.1205 15.8991 12.7684 15.7282 12.4485ZM1.642 2.64317C1.642 2.29298 1.84619 2.06326 1.98228 2.06326H8.78718C8.85523 2.06326 8.96171 2.13049 9.04159 2.27898L10.8907 5.7921C10.9434 5.90408 10.9707 6.0253 10.9707 6.14789C10.9707 6.27049 10.9434 6.39171 10.8907 6.50369L9.46769 9.41728L9.015 10.3474C8.93808 10.5071 8.82265 10.5799 8.75164 10.5799H1.96748C1.83138 10.5799 1.62726 10.3502 1.62726 10L1.642 2.64317ZM14.2666 13.8493L12.3908 17.693C12.3139 17.8527 12.1985 17.9255 12.1275 17.9255H5.34327C5.20718 17.9255 5.00009 17.693 5.00009 17.3456V12.1348H8.76646C9.14427 12.1252 9.51108 12.0125 9.82286 11.8103C10.1346 11.608 10.3781 11.3247 10.5239 10.9945L11.2961 9.41168H12.1541C12.2221 9.41168 12.3287 9.47892 12.4086 9.6274L14.2577 13.1433C14.3118 13.2547 14.3406 13.3756 14.3421 13.4982C14.3436 13.6208 14.3179 13.7423 14.2666 13.8549V13.8493Z"
                      fill="#15171F"
                    />
                  </svg>
                </div>
                <p className="">Transfer to byte</p>
                <p className="text-[#808691] text-[14px] font-normal text-center">
                  Transfer to a Byte account
                </p>
              </div>
            </div>
          </div>

          <RecentTable />
        </div>
      </div>
    </div>
  );
};

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout headerTitle="Transfer">{page}</DashboardLayout>
    </Layout>
  );
};

export default Transfer;
