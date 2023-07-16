import { ReactElement, useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import Chart from '../../../components/payment/chart/chart';
import TopCustomer from '../../../components/payment/top-customer/top-costumer';
import Button from '../../../components/shared/butttons/button/button';
import ByteIcon from '../../../components/shared/icon/byte.icon';
import Modal from '../../../components/shared/modal/modal';
import { NextPageWithLayout } from '../../_app.page';

export interface IPayment {
  sampleTextProp: string;
}

const Payment: NextPageWithLayout = () => {
  const [status, setStatus] = useState(false);

  return (
    <div>
      {status && (
        <Modal
          closeModal={() => setStatus(false)}
          header={'Make a payment'}
        ></Modal>
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
        <p className="balance text-h4">
          ₦150,000.00<span></span>
        </p>
        <div className="flex gap">
          <Button
            icon="receipt-text"
            type="large"
            title="Fund wallet"
            color="btnLight"
          />
          <Button
            icon="link-circle1"
            type="large"
            click={() => {
              setStatus(true);
            }}
            title="Payment link"
            color="btnPrimary"
          />

          <Button
            icon="receipt-2"
            iconColor="var(--white)"
            type="large"
            click={() => {
              setStatus(true);
            }}
            title="QR Payment"
            color="btnPrimary"
          />
        </div>
      </div>
      {/* <div className={styles.grid} ></div> */}
      <p className="text-h6" style={{ marginBottom: '10px' }}>
        Analytics
      </p>
      <div className="chart-table">
        <div className="flex gap-1 mb-md-2 mt-md-2">
          <div className="chart">
            <Chart title="Inflow" />
          </div>
          <div className="chart">
            <Chart title="Outflow" />
          </div>
        </div>

        <div className="flex gap-1">
          <div className="w-50">
            <TopCustomer title={'Top customers'} />
          </div>
          <div className="w-50">
            <TopCustomer title={'Top Product'} />
          </div>
          <div className="products"></div>
        </div>
        <p className="text-h6" style={{ marginBottom: '-10px' }}>
          Transaction-history
        </p>
        <div className="float-right">
          <div className="flex gap-1">
            <p className="mt-0 mb-0 text-byte"> View all</p>
            <ByteIcon color="var(--byte)" icon="arrow-right-1" size={20} />
          </div>
        </div>
        {/* <Table /> */}
      </div>
    </div>
  );
};

Payment.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Payment;
