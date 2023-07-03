import { ReactElement } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import SalesRecordProductFormGroup from '../../../../components/records/sales-record-product-form-group/sales-record-product-form-group';
import Button from '../../../../components/shared/butttons/button/button';
import Checkbox from '../../../../components/shared/checkbox/checkbox';
import Input from '../../../../components/shared/input/input/input';
import PhoneInput from '../../../../components/shared/input/phone-input/phone-input';
import TotalAmount from '../../../../components/total amount/total-amount';
import { NextPageWithLayout } from '../../../_app.page';
import styles from './index.module.scss';

const EditInvoice: NextPageWithLayout = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className="container-border">
          <p className="text-value text-primary-06 text-strong">
            Product details
          </p>
          <SalesRecordProductFormGroup />
          <SalesRecordProductFormGroup />
          <p>
            <a className="text-value text-primary-06 mx-md-1">
              + Add another product
            </a>
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-1 mt-md-2">
          <div className="container-border">
            <p className="text-value text-primary-06 text-strong">
              Customer Details
            </p>
            <hr className="hr"></hr>
            <div className="form-group ">
              <label>Customer name</label>
              <Input placeholder="Select category" value="name" type="text" />
            </div>
            <div className="form-group">
              <div className="mb-md-2">
                <label>Phone number</label>
                <PhoneInput placeholder="phone" value="name" type="text" />
              </div>
            </div>
          </div>

          <div className="container-border">
            <p className="text-value text-primary-06 text-strong">
              Other Information{' '}
            </p>
            <hr className="hr"></hr>
            <div className="form-group flex gap-1">
              <div>
                <label>Date issued</label>
                <Input placeholder="13/10/2022" value="name" type="date" />
              </div>

              <div className="mb-md-2">
                <label>Expiry date</label>
                <Input placeholder="Set expiry date" value="name" type="date" />
              </div>
            </div>

            <div className="form-group flex gap-1 ">
              <div className="w-50">
                <Checkbox label="Online payment" className="mb-md-1" />
                <Checkbox label="Bank transfer" className="mb-md-1" />
                <Checkbox label="Apply discount" />
              </div>
              <div className="w-50">
                <label>Discount percentage</label>
                <Input
                  placeholder="Enter percentage"
                  value="Enter percentage"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-md-1 ">
        <TotalAmount value="N20,000.00" />
      </div>
      <Button
        title="Preview Invoice"
        iconPosition="right"
        icon="invoice"
        type="large"
        color="btnPrimary"
      />
    </div>
  );
};

EditInvoice.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};
export default EditInvoice;
