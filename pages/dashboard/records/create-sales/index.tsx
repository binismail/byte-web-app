import { ReactElement, useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Tabs from '../../../../components/shared/tabs/tabs';
import { NextPageWithLayout } from '../../../_app';
import SalesProductForm from '../components/sales-product-form/sales-product-form';
import SalesServiceForm from '../components/sales-service-form/sales-service-form';
import styles from './index.module.scss';
export interface ICreateSales {
  sampleTextProp: string;
}

const CreateSales: NextPageWithLayout = () => {
  const [tab, setTab] = useState('Product details');

  // must be of the following types
  const label: ('Product details' | 'Service records')[] & string[] = [
    'Product details',
    'Service records',
  ];

  return (
    <div className="container">
      <div className="mb-md-2">
        <Tabs label={label} click={(t: any) => setTab(t)} value={tab} />
      </div>

      <div className={styles.container}>
        {tab === 'Product details' ? (
          <div className="productDetails">
            <SalesProductForm />
          </div>
        ) : (
          <div className="serviceDetails">
            <SalesServiceForm />
          </div>
        )}
      </div>
    </div>
  );
};

CreateSales.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default CreateSales;
