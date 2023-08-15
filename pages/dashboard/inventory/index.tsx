import { ReactElement, useState } from 'react';
import Filter from '../../../components/filter/filter';
import UpdateStock from '../../../components/inventory/update-stock.modal/update-stock';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import Button from '../../../components/shared/butttons/button/button';
import SearchInput from '../../../components/shared/input/search-input/search-input';
import Modal from '../../../components/shared/modal/modal';
import InventoryTable from '../../../components/shared/table/inventory-table/inventory-table';
import { NextPageWithLayout } from '../../_app.page';

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
      productImage: null,
      productDescription: 'Great picture quality!!!',
      _id: '637a2b59d1f310069dcde81b',
      productName: 'LG Smart TV',
      productCategory: 'Electronics',
      unitCostPrice: 325000,
      unitSellingPrice: 350000,
      productQuantityStocked: 5,
      accountID: 1661889474968,
      business: '630e6bc2408b6d09b095ca0f',
      num: '000003',
      productQuantityRemaining: 0,
      createdAt: '2022-11-20T13:27:53.596Z',
      updatedAt: '2022-11-20T13:27:53.596Z',
    },
    {
      productImage: null,
      productDescription: 'Sleek design',
      _id: '637a2a68d1f310069dcde815',
      productName: 'Samsung A71',
      productCategory: 'Phones',
      unitCostPrice: 70000,
      unitSellingPrice: 85000,
      productQuantityStocked: 15,
      accountID: 1661889474968,
      business: '630e6bc2408b6d09b095ca0f',
      num: '000002',
      productQuantityRemaining: 15,
      createdAt: '2022-11-20T13:23:52.066Z',
      updatedAt: '2022-11-20T13:23:52.066Z',
    },
    {
      productImage: null,
      productDescription: 'Sleek design',
      _id: '637a2a03d1f310069dcde80f',
      productName: 'iphone 20',
      productCategory: 'Phones',
      unitCostPrice: 800000,
      unitSellingPrice: 1500000,
      productQuantityStocked: 10,
      accountID: 1661889474968,
      business: '630e6bc2408b6d09b095ca0f',
      num: '000001',
      productQuantityRemaining: 10,
      createdAt: '2022-11-20T13:22:12.000Z',
      updatedAt: '2022-11-20T13:22:12.000Z',
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
        <Filter placeholder="" value="Filter" />
      </div>
      <div>
        <InventoryTable
          filter={'num'}
          header={header}
          contents={contents}
          isAscending={true}
          loading={true}
        />
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
