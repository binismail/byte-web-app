import { ReactElement, useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import SalesProductForm from '../../../../components/records/sales-product-form/sales-product-form';
import SalesServiceForm from '../../../../components/records/sales-service-form/sales-service-form';
import Tabs from '../../../../components/shared/tabs/tabs';
import { NextPageWithLayout } from '../../../_app.page';
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
