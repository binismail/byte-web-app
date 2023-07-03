import { ReactElement } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Button from '../../../../components/shared/butttons/button/button';
import Input from '../../../../components/shared/input/input/input';
import { NextPageWithLayout } from '../../../_app.page';

export interface IInput {}

const Verifications: NextPageWithLayout<IInput> = () => {
  return (
    <div>
      <div className="container-border-rounded">
        <div className="mx-md-1 my-md-2">
          <p className="text-body-lg-bold mb-0 text-neutral-09">
            We’ve sent you an OTP
          </p>
          <div className="flex mt-0">
            <p className="text-value ">
              A one time password was sent to the phone number associated to the
              provided BVN. Enter it below to verify your BVN.
            </p>
          </div>
          <div className="form-group w-33">
            <label>OTP</label>
            <Input type="text" placeholder="" />
          </div>
          <Button title="Verify BVN" type="large" color="btnPrimary" />
        </div>
      </div>
    </div>
  );
};

Verifications.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Verifications;
