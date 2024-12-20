import { ReactElement } from 'react';

import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import SalesRecordProductFormGroup from '../../../../components/records/sales-record-product-form-group/sales-record-product-form-group';
import Button from '../../../../components/shared/butttons/button/button';
import Input from '../../../../components/shared/input/input/input';
import TotalAmount from '../../../../components/total amount/total-amount';
import { NextPageWithLayout } from '../../../_app.page';
import styles from './index.module.scss';

export interface IEditSales {
  sampleTextProp: string;
}

const EditSales: NextPageWithLayout = () => {
  return (
    <div>
      <div className={styles.container}>
        <p className="text-value text-primary-06 text-strong">
          Product details
        </p>

        {/* <SalesRecordFormGroup /> */}
        <SalesRecordProductFormGroup />

        <p>
          <a className="text-value text-primary-06 mx-md-1">
            + Add another product
          </a>
        </p>
      </div>
      <div className="flex gap-1 mt-md-2">
        <div className={styles.container}>
          <p className="text-value text-primary-06 text-strong">
            Customer Details
          </p>
          <hr className="hr"></hr>
          <div className="form-group">
            <div className="mb-md-2">
              <label>Customer name</label>
              <Input placeholder="Drop down" value="name" type="dropdown" />
            </div>
            <label>Phone number</label>
            <Input placeholder="09090909999" value="name" type="tel" />
          </div>
        </div>

        <div className={styles.container}>
          <p className="text-value text-primary-06 text-strong">
            Other Information{' '}
          </p>
          <hr className="hr"></hr>
          <div className="form-group flex gap-1">
            <div className="mb-md-2">
              <label>Customer name</label>
              <Input placeholder="Text-area" value="name" type="text-area" />
            </div>

            <div>
              <label>Date</label>
              <Input placeholder="Date" value="name" type="date" />
            </div>
          </div>
          <p className="text-value">Payment method</p>
          <div className="flex">
            <Input placeholder="" type="radio" />
            <Input placeholder="" type="radio" />
            <Input placeholder="" type="radio" />
          </div>
        </div>
      </div>
      <div className="my-md-1 ">
        <TotalAmount
          subTotal={0}
          taxAmount={0}
          discountPercentage={0}
          value="N20,000.00"
        />
      </div>
      <Button title="Save Changes" type="large" color="btnPrimary" />
    </div>
  );
};

EditSales.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default EditSales;
