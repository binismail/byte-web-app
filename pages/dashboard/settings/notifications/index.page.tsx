import { ReactElement } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import CheckboxSpecial from '../../../../components/shared/checkboxSpecial/checkbox-special';

import { NextPageWithLayout } from '../../../_app.page';

export interface IInput {}

const Verifications: NextPageWithLayout<IInput> = () => {
  return (
    <div>
      <div className="container-border-rounded">
        <p className="text-value text-primary-06 text-strong">
          Push Notifications
        </p>
        <hr></hr>

        <div className="flex flex-space-between ">
          <div className="mx-md-1 my-md-1">
            <p className="text-value  text-neutral-08 mb-0">New Deals</p>
          </div>
          <div className="flex flex-align-center">
            <CheckboxSpecial label="" />
          </div>
        </div>

        <div className="flex flex-space-between ">
          <div className="mx-md-1 my-md-1">
            <p className="text-value  text-neutral-08 mb-0">Transactions</p>
          </div>
          <div className="flex flex-align-center">
            <CheckboxSpecial label="" />
          </div>
        </div>

        <div className="flex flex-space-between ">
          <div className="mx-md-1 my-md-1">
            <p className="text-value  text-neutral-08 mb-0">Recommendations</p>
          </div>
          <div className="flex flex-align-center">
            <CheckboxSpecial label="" />
          </div>
        </div>
      </div>

      <div className="container-border-rounded mt-md-2">
        <p className="text-value text-primary-06 text-strong">
          How you get notifications{' '}
        </p>
        <hr></hr>

        <div className="flex flex-space-between ">
          <div className="mx-md-1 my-md-1">
            <p className="text-value  text-neutral-08 mb-0">Browser</p>
          </div>
          <div className="flex flex-align-center">
            <CheckboxSpecial label="" />
          </div>
        </div>

        <div className="flex flex-space-between ">
          <div className="mx-md-1 my-md-1">
            <p className="text-value  text-neutral-08 mb-0">Email</p>
          </div>
          <div className="flex flex-align-center">
            <CheckboxSpecial label="" />
          </div>
        </div>

        <div className="flex flex-space-between ">
          <div className="mx-md-1 my-md-1">
            <p className="text-value  text-neutral-08 mb-0">Mobile only</p>
            <p className="text-label">
              Receive notifications only on mobile device
            </p>
          </div>
          <div className="flex flex-align-center">
            <CheckboxSpecial label="" />
          </div>
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
