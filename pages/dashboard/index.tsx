import { Eye, EyeSlash, WalletMoney } from 'iconsax-react';
import { ReactElement, useState } from 'react';
import QuickLinkCard from '../../components/cards/quicklink.card';
import DashboardLayout from '../../components/layouts/dashboard-layout';
import Layout from '../../components/layouts/layout';
import Button from '../../components/shared/butttons/button/button';
import Modal from '../../components/shared/modal/modal';
import Table from '../../components/shared/table/table';
import VerifyPhone from '../../components/verify-phone/verify-phone';
import { NextPageWithLayout } from '../_app';

export interface IDashboard {
  sampleTextProp: string;
}

const Dashboard: NextPageWithLayout = () => {
  // STATES
  const [balanceisHidden, setBalanceIsHidden] = useState(false);
  const [status, setStatus] = useState(false);

  return (
    <div className="flex flex-col gap-10 py-2 px-3">
      {status && (
        <Modal closeModal={() => setStatus(false)} header={'Make a payment'}>
          <VerifyPhone />
        </Modal>
      )}

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
        <div className="flex items-center gap-1">
          <span className="font-normal text-[32px] text-[#232846]">
            {balanceisHidden ? '******' : '₦150,000.00'}
          </span>

          {/* icon */}
          <div>
            {balanceisHidden ? (
              <Eye
                onClick={() => setBalanceIsHidden(false)}
                className="cursor-pointer"
                size="18"
                color="#232846"
              />
            ) : (
              <EyeSlash
                onClick={() => setBalanceIsHidden(true)}
                className="cursor-pointer ml-2"
                size="18"
                color="#232846"
              />
            )}
          </div>
        </div>

        {/* Funding Wallet */}
        <div className="flex gap-5 mt-7">
          <Button type="large" title="Fund wallet" color="btnLight" />
          <Button
            type="large"
            click={() => {
              setStatus(true);
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
