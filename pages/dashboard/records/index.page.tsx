import { ReactElement, useState } from 'react';

import Filter from '../../../components/filter/filter';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import RecordDetails from '../../../components/records/record-details.modal/record-details ';
import Button from '../../../components/shared/butttons/button/button';
import SearchInput from '../../../components/shared/input/search-input/search-input';
import Modal from '../../../components/shared/modal/modal';
import RecordTable from '../../../components/shared/table/record-table/record-table';
import Tabs from '../../../components/shared/tabs/tabs';
import { NextPageWithLayout } from '../../_app.page';

export interface IRecords {
  sampleTextProp: string;
}

const Records: NextPageWithLayout = () => {
  const [status, setStatus] = useState(false);
  const [tab, setTab] = useState('');
  const header = ['Customer name', 'Item/s purchased', 'Amount', 'Date '];

  const contents = [
    {
      name: 'Fife Animashaun',
      items: 'Smart Watch + 2 others',
      amount: 'N1,000',
      date: 'Yesterday - 10:00 AM',
      type: 'negative',
    },
    {
      name: 'Fife Animashaun',
      items: 'Smart Watch + 2 others',
      amount: 'N1,000',
      date: 'Yesterday - 10:00 AM',
      type: 'negative',
    },
  ];

  return (
    <div>
      {status && (
        <Modal closeModal={() => setStatus(false)} header={''}>
          <RecordDetails />
        </Modal>
      )}
      <div className="mb-md-2">
        <Tabs
          label={['Sales', 'Expense']}
          click={(t: any) => setTab(t)}
          value={tab}
        />
      </div>
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
        <Filter placeholder="" value="Filter" />
      </div>
      <div>
        <RecordTable header={header} contents={contents} />
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
