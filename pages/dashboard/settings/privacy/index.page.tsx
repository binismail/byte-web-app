import { ReactElement } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import ByteIcon from '../../../../components/shared/icon/byte.icon';

import Head from 'next/head';
import Link from 'next/link';
import { NextPageWithLayout } from '../../../_app.page';

const Privacy: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Privacy & security - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* content */}
      <Link href="/dashboard/settings/privacy/change-password">
        <div className="container-border-rounded mt-md-2 cursor-pointer">
          <div className="flex flex-space-between">
            {/* texts */}
            <div className="flex flex-col gap-1 my-4">
              <p className="text-sm font-normal text-[#30333B]">
                Change password
              </p>
              <p className="text-[#808691] text-[13px] font-normal">
                Change your account password
              </p>
            </div>

            {/* arrow */}
            <div className="flex flex-align-center">
              <ByteIcon icon="arrow-right-21" color="grey" size={16} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

Privacy.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Privacy & security">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default Privacy;
