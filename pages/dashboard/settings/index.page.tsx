import Link from 'next/link';
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
    <div className="flex flex-container-left gap-1">
      <Link href="/dashboard/settings/edit-profile" passHref legacyBehavior>
        <MenuItem
          icon="home"
          title="Edit your Profile"
          description=" Your personal info used to register Byte"
        />
      </Link>
      <MenuItem
        icon="shop"
        title="Business info"
        description="Your business info used to register Byte"
      />
      <MenuItem
        icon="Verification"
        title="Verification"
        description=" BVN, Identity and business certification"
      />
      <MenuItem
        icon="security"
        title="Privacy & Security"
        description=" Password, transaction pin and privacy"
      />

      <MenuItem
        icon="bell"
        title="Notifications"
        description="What notifications you recieve"
      />

      <MenuItem
        icon="question"
        title="Contact Us"
        description="Reach us for more info and feedbacks"
      />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Home;
