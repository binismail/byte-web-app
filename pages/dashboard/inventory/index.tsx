import React, { ReactElement, useState } from 'react';
import Filter from '../../../components/filter/filter';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import Button from '../../../components/shared/butttons/button/button';
import SearchInput from '../../../components/shared/input/search-input/search-input';
import Modal from '../../../components/shared/modal/modal';
import InventoryTable from '../../../components/shared/table/inventory-table/inventory-table';
import { NextPageWithLayout } from '../../_app';
import UpdateStock from './components/update-stock.modal/update-stock';

export interface IRecords {
  sampleTextProp: string;
}

const Records: NextPageWithLayout = () => {
  const [status, setStatus] = useState(false);
  // const [tab, setTab] = useState('');
  const header = [
    '#',
    'Product name',
    'Unit Price',
    'Availability',
    'Date stocked/restocked',
  ];

  const contents = [
    {
      item: '#l23234',
      name: 'Smart Watch ',
      amount: 'N1,000',
      availability: '70/100',
      date: 'Yesterday - 10:00 AM',
    },

    {
      item: '#l23234',
      name: 'Smart Watch ',
      amount: 'N1,000',
      availability: '70/100',
      date: 'Yesterday - 10:00 AM',
    },
    {
      item: '#l23234',
      name: 'Smart Watch ',
      amount: 'N1,000',
      availability: '70/100',
      date: 'Yesterday - 10:00 AM',
    },
  ];

  return (
    <div>
      {status && (
        <Modal closeModal={() => setStatus(false)} header={''}>
          <UpdateStock closeModal={() => setStatus(false)} />
        </Modal>
      )}
      <div className="mb-md-2">
        <SearchInput type="text" placeholder="Find Record" />
      </div>
      <div className="flex flex-space-between mb-md-1">
        <Button
          color="btnPrimary"
          title="Add records"
          icon={'add'}
          type="large"
          iconColor="var(--white)"
          click={() => {
            setStatus(true);
          }}
        />
        <Filter value="Filter" />
      </div>
      <div>
        <InventoryTable header={header} contents={contents} />
      </div>
    </div>
  );
};

Records.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Records;
