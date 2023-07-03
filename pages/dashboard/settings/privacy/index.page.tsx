import { ReactElement } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import ByteIcon from '../../../../components/shared/icon/byte.icon';

import { NextPageWithLayout } from '../../../_app.page';

export interface IPrivacy {}

const Privacy: NextPageWithLayout<IPrivacy> = () => {
  return (
    <div>
      <div className="container-border-rounded mt-md-2">
        <div className="flex flex-space-between">
          <div className="mx-md-1 my-md-2">
            <p className="text-strong mb-0">Change password</p>
            <div className="flex mt-0">
              <p className="text-label ">Change your account password</p>
            </div>
          </div>
          <div className="flex flex-align-center">
            <ByteIcon icon="arrow-right-21" color="grey" size={16} />
          </div>
        </div>
      </div>
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
