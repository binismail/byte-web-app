import { Eye, EyeSlash } from 'iconsax-react';
import { ReactElement, useState } from 'react';
import QuickLinkCard from '../../components/cards/quicklink.card';
import DashboardLayout from '../../components/layouts/dashboard-layout';
import Layout from '../../components/layouts/layout';
import Button from '../../components/shared/butttons/button/button';
import ByteIcon from '../../components/shared/icon/byte.icon';
import Modal from '../../components/shared/modal/modal';
import Table from '../../components/shared/table/table';
import VerifyPhone from '../../components/verify-phone/verify-phone';
import styles from '../../styles/Home.module.scss';
import { NextPageWithLayout } from '../_app';

export interface IDashboard {
  sampleTextProp: string;
}

const Dashboard: NextPageWithLayout = () => {
  // STATES
  const [balanceisHidden, setBalanceIsHidden] = useState(false);
  const [status, setStatus] = useState(false);

  return (
    <div>
      {status && (
        <Modal closeModal={() => setStatus(false)} header={'Make a payment'}>
          <VerifyPhone />
        </Modal>
      )}
      <div className="home-header">
        <p className="balance-title">
          {' '}
          <ByteIcon
            style={{ marginBottom: '-4px' }}
            icon="wallet-21"
            size={20}
            color="var(--primary08)"
          />
          <span>Byte Pocket</span>
        </p>

        {/* Balance Amount */}
        <div className={styles.balance_amount_cont}>
          <p className="text-h4">
            {balanceisHidden ? '******' : '₦150,000.00'}

            {/* icon */}
            {balanceisHidden ? (
              <Eye
                onClick={() => setBalanceIsHidden(false)}
                className={styles.hidden_balance}
                size="18"
                color="#232846"
              />
            ) : (
              <EyeSlash
                onClick={() => setBalanceIsHidden(true)}
                className={styles.hiddenbalance}
                size="18"
                color="#232846"
              />
            )}
          </p>
        </div>

        {/* Funding Wallet */}
        <div className="flex gap">
          <Button title="Fund wallet" color="btnLight" />
          <Button
            click={() => {
              setStatus(true);
            }}
            title="Make a payment"
            color="btnPrimary"
          />
        </div>
      </div>
      <p className="text-h6 mt-md-3">Quick links</p>
      <div className={styles.grid} style={{ marginTop: '-20px' }}>
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
      <div className="chart-table">
        <p className="text-h6" style={{ marginBottom: '-10px' }}>
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
