import React, { ReactElement, useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Tabs from '../../../../components/shared/tabs/tabs';
import { NextPageWithLayout } from '../../../_app';
import SalesProductForm from '../components/sales-product-form/sales-product-form';
import SalesServiceForm from '../components/sales-service-form/sales-service-form';
export interface ICreateExpense {
  sampleTextProp: string;
}

const CreateExpense: NextPageWithLayout = () => {
  const [tab, setTab] = useState('Item details');

  // must be of the following types
  const label: ('Item details' | 'Service details')[] & string[] = [
    'Item details',
    'Service details',
  ];

  return (
    <div className="container">
      <div className="mb-md-2">
        <Tabs label={label} click={(t: any) => setTab(t)} value={tab} />
      </div>

      <div>
        {tab === 'Item details' ? (
          <div className="itemDetails">
            <SalesProductForm type="expense" />
          </div>
        ) : (
          <div className="serviceDetails">
            <SalesServiceForm type="expense" />
          </div>
        )}
      </div>
    </div>
  );
};

CreateExpense.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default CreateExpense;
