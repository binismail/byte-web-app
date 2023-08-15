import { ReactElement, useState } from 'react';
import Filter from '../../../components/filter/filter';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import Button from '../../../components/shared/butttons/button/button';
import SearchInput from '../../../components/shared/input/search-input/search-input';
import SuccessModal from '../../../components/shared/modal/components/success/success.modal';
import Modal from '../../../components/shared/modal/modal';
import { NextPageWithLayout } from '../../_app.page';

export interface IInvoice {
  sampleTextProp: string;
}

const Invoice: NextPageWithLayout = () => {
  const [status, setStatus] = useState(false);
  // const [tab, setTab] = useState('');
  const header = [
    'Incvoice name',
    'Customer name',
    'Amount',
    'Expiry date',
    'Date issued',
    'Status',
  ];

  const contents = [
    {
      item: '#l23234',
      name: 'Chike & River ',
      amount: 'N1,000',
      expiryDate: '09/09/2021',
      deliveryDate: '09/09/2021',
      status: 'Paid',
    },

    {
      item: '#l23234',
      name: 'Chike & River ',
      amount: 'N1,000',
      expiryDate: '09/09/2021',
      deliveryDate: '09/09/2021',
      status: 'Unpaid',
    },

    {
      item: '#l23234',
      name: 'Chike & River ',
      amount: 'N1,000',
      expiryDate: '09/09/2021',
      deliveryDate: '09/09/2021',
      status: 'Overpaid',
    },
  ];

  return (
    <div>
      {status && (
        <Modal closeModal={() => setStatus(false)} header={''}>
          <SuccessModal
            title="You’ve generated your invoice!"
            message="Congratulations! Your invoice has been successfully generated. Tap the share button below to share it to your customer."
            closeModal={() => setStatus(false)}
          />
        </Modal>
      )}
      <div className="mb-md-2">
        <SearchInput type="text" placeholder="Find Record" />
      </div>
      <div className="flex flex-space-between mb-md-1">
        <Button
          color="btnPrimary"
          title="Create an invoice"
          icon={'add'}
          type="large"
          iconColor="var(--white)"
          click={() => {
            setStatus(true);
          }}
        />
        <Filter placeholder="" value="Filter" />
      </div>
      <div>{/* <InvoiceTable header={header} contents={contents} /> */}</div>
    </div>
  );
};

Invoice.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Invoice;
