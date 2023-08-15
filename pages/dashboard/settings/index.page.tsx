import {
  Lock,
  MessageQuestion,
  Notification,
  Shop,
  User,
  Verify,
} from 'iconsax-react';
import Head from 'next/head';
import { ReactElement } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import MenuItem from '../../../components/menu-item/menu-item';
import { NextPageWithLayout } from '../../_app.page';
export interface IInput {
  placeholder: string;
  type: string;
}

const Home: NextPageWithLayout<IInput> = () => {
  return (
    <div>
      <Head>
        <title>Settings - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full grid grid-cols-4 gap-6">
        <MenuItem
          path={'/dashboard/settings/edit-profile'}
          Icon={User}
          title="Edit your Profile"
          description=" Your personal info used to register Byte"
        />
        <MenuItem
          path={'/dashboard/settings/edit-business-info'}
          Icon={Shop}
          title="Business info"
          description="Your business info used to register Byte"
        />
        <MenuItem
          path={'/dashboard/settings/verifications'}
          Icon={Verify}
          title="Verification"
          description=" BVN, Identity and business certification"
        />
        <MenuItem
          path={'/dashboard/settings/privacy'}
          Icon={Lock}
          title="Privacy & Security"
          description=" Password, transaction pin and privacy"
        />

        <MenuItem
          path={'/dashboard/settings/notifications'}
          Icon={Notification}
          title="Notifications"
          description="What notifications you recieve"
        />

        <MenuItem
          path={'/dashboard/settings/contact-us'}
          Icon={MessageQuestion}
          title="Contact Us"
          description="Reach us for more info and feedbacks"
        />
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout headerTitle="Settings">{page}</DashboardLayout>
    </Layout>
  );
};

export default Home;
