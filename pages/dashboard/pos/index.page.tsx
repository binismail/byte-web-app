import {
  ArrowCircleRight,
  Calculator,

} from 'iconsax-react';
import Head from 'next/head';
import { ReactElement, useState } from 'react';
import TransactionHistory from '../../../components/home/transaction-history';
import VirtualBank from '../../../components/home/virtual-bank/virtual-bank';
import WalletBalance2 from '../../../components/home/wallet-balance/wallet-balance2';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import MakePaymentLayout from '../../../components/layouts/pos/request-pos/request-pos-layout';
import FailedModal from '../../../components/shared/modal/components/failed/failed.modal';
import SuccessModal from '../../../components/shared/modal/components/success/success.modal';
import Modal from '../../../components/shared/modal/modal';
import { NextPageWithLayout } from '../../_app.page';

export interface IPos {
  sampleTextProp: string;
}

const Pos: NextPageWithLayout = () => {
  // STATES
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalState] = useState<boolean>(false);
  // const [isFundWalletModalOpen, setIsFundWalletModalState] =
  //   useState<boolean>(false);

  return (
    <div>
      <Head>
        <title>Pos - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col gap-10 py-2 px-3">
        {/* Payment Status Modal */}
        {successModal ? (
          <Modal>
            <SuccessModal
              title="Transfer successful"
              message="The money is on its way to the recipient bank account."
              buttonTitle="Done"
              buttonOnClick={() => setSuccessModal(false)}
            />
          </Modal>
        ) : errorModal ? (
          <Modal>
            <FailedModal
              title="Transfer failed"
              message="Something went wrong. Please try again"
              buttonTitle="Try again"
              buttonOnClick={() => setErrorModal(false)}
            />
          </Modal>
        ) : null}

        {/* Make Payment layout */}
        <MakePaymentLayout
          isVisible={isPaymentModalOpen}
          setSuccessModal={setSuccessModal}
          setErrorModal={setErrorModal}
          setVisibility={setIsPaymentModalState}
        />

        {/* Header container */}
        <div className="">
          {/* Balance Amount */}
          <div className="flex gap-8">
            <div>
              <div className="flex gap-2 items-center">
                {/* title */}
                <p className="font-normal text-base text-[#353C69]">
                  POS Account
                </p>
              </div>
              <WalletBalance2 />
            </div>

            {/* Pos wallet */}
            <div className="border-l-4 px-8 ">
              <div className="flex gap-2 items-center">
                {/* title */}
                <p className="font-normal text-base text-[#353C69]">
                  Primary Account
                </p>
              </div>
              <WalletBalance2 />
            </div>

            {/* Virtual account */}
            <div className="ml-auto">
              <VirtualBank />
            </div>
          </div>
        </div>

        <div className="flex mt-4 gap-x-5">
          <div>
            {/* POS Request flow card */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div
                className="flex flex-col items-center border rounded-[10px] h-[220px] w-[220px] justify-center p-4 "
                onClick={() => {
                  setIsPaymentModalState(true);
                }}
              >
                <div className="flex p-3 items-center border rounded-[50px]  w-[45px] h-[45px]">
                  <Calculator size="30" color="#353C69" variant="Bold" />
                </div>
                <p className="">Request for POS</p>
                <p className="text-[#808691] text-[14px] font-normal text-center">
                  Transfer to a Byte account
                </p>
              </div>

              <div className="flex flex-col items-center border rounded-[10px] h-[220px] w-[220px] justify-center p-4">
                <div className="flex p-3 items-center border rounded-[50px]  w-[45px] h-[45px]">
                  <ArrowCircleRight size="30" color="#353C69" variant="Bold" />
                </div>
                <p className="">Continue request</p>
                <p className="text-[#808691] text-[14px] font-normal text-center">
                  Transfer to a Byte account
                </p>
              </div>

              {/* <div className="flex flex-col items-center border rounded-[10px] h-[220px] w-[220px] justify-center p-4">
                <div className="flex p-3 items-center border rounded-[50px]  w-[45px] h-[45px]">
                  <TickSquare size="30" color="#353C69" variant="Bold" />
                </div>
                <p className="">Request status</p>
                <p className="text-[#808691] bg-[#B9E1EB] text-[14px] font-normal text-center rounded-[20px] p-2">
                  Pending
                </p>
              </div> */}
            </div>
            {/* Transaction History */}
            <TransactionHistory />
          </div>

          {/* unknown */}
          <div className="flex flex-column">
            <div className="w-[14rem] h-[14rem] bg-[#F0F2F5] mb-4"></div>
            <div className="w-[14rem] h-[14rem] bg-[#F0F2F5]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

Pos.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Pos;
