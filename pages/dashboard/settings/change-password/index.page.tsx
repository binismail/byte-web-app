import { ReactElement } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Button from '../../../../components/shared/butttons/button/button';
import Input from '../../../../components/shared/input/input/input';

import { NextPageWithLayout } from '../../../_app.page';

export interface IPrivacy {}

const Privacy: NextPageWithLayout<IPrivacy> = () => {
  return (
    <div>
      <div className="container-border-rounded mt-md-2">
        <div className="flex gap-1">
          <div className="form-group">
            <label>Current password</label>
            <Input type="text" placeholder="" />
          </div>

          <div className="form-group">
            <label>New password</label>
            <Input type="text" placeholder="" />
          </div>

          <div className="form-group">
            <label>Confirm new password</label>
            <Input type="text" placeholder="" />
          </div>
        </div>

        <p className="text-label">
          Forgot your password?{' '}
          <span className="text-byte">Reset password</span>
        </p>
      </div>
      <Button type="large" color="btnPrimary" title="Save changes" />
    </div>
  );
};

Privacy.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Privacy;
