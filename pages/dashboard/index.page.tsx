import { WalletMoney } from 'iconsax-react';
import { ReactElement, useState } from 'react';
import QuickLinkCard from '../../components/cards/quicklink.card';
import WalletBalance from '../../components/home/wallet-balance/wallet-balance';
import DashboardLayout from '../../components/layouts/dashboard-layout';
import FundWalletLayout from '../../components/layouts/home/fund-wallet-layout';
import MakePaymentLayout from '../../components/layouts/home/make-payment-layout';
import Layout from '../../components/layouts/layout';
import Button from '../../components/shared/butttons/button/button';
import FailedModal from '../../components/shared/modal/components/failed/failed.modal';
import SuccessModal from '../../components/shared/modal/components/success/success.modal';
import Modal from '../../components/shared/modal/modal';
import Table from '../../components/shared/table/table';
import { NextPageWithLayout } from '../_app.page';

export interface IDashboard {
  sampleTextProp: string;
}

const Dashboard: NextPageWithLayout = () => {
  // STATES
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalState] = useState<boolean>(false);
  const [isFundWalletModalOpen, setIsFundWalletModalState] =
    useState<boolean>(false);

  return (
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

      {/* Fund Wallet modal */}
      <FundWalletLayout
        isVisible={isFundWalletModalOpen}
        setSuccessModal={setSuccessModal}
        setErrorModal={setErrorModal}
        setVisibility={setIsFundWalletModalState}
      />

      {/* Header container */}
      <div className="">
        {/* icon container */}
        <div className="flex gap-2 items-center">
          {/* icon */}
          <WalletMoney size="12" color="#353C69" variant="Bold" />

          {/* title */}
          <p className="font-normal text-base text-[#353C69]">Byte Pocket</p>
        </div>

        {/* Balance Amount */}
        <WalletBalance />

        {/* Funding Wallet */}
        <div className="flex gap-5 mt-7">
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
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col gap-2">
        <p className="font-normal text-[#30333B] text-xl">Quick links</p>
        <div className="flex gap-3">
          <QuickLinkCard
            title="Record sales"
            color="var(--danger-light)"
            name="edit-2"
            iconColor="#D595A6"
            size="20"
          />
          <QuickLinkCard
            title="Add inventory"
            color="var(--primary01)"
            name="clipboard-text"
            iconColor="#6A99B3"
            size="20"
          />
          <QuickLinkCard
            title="Create invoice"
            color="var(--neon)"
            name="receipt-text"
            iconColor="#C49267"
            size="20"
          />
          <QuickLinkCard
            title="Record expense"
            color="var(--success-light)"
            name="receipt-edit"
            iconColor="#19A97B"
            size="20"
          />
        </div>
      </div>

      {/* Transaction History */}
      <div className="w-full flex flex-col gap-2">
        <p className="font-normal text-xl text-[#30333B]">
          Transaction-history
        </p>
        <Table />
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Dashboard;
