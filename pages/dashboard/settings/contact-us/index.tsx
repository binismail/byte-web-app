import { ReactElement } from 'react';

import Link from 'next/link';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import MenuItem from '../../../../components/menu-item/menu-item';
import { NextPageWithLayout } from '../../../_app';

const Home: NextPageWithLayout<any> = () => {
  return (
    <div className="flex flex-container-left gap-1">
      <Link href="/dashboard/settings/edit-profile" passHref legacyBehavior>
        <MenuItem
          icon="message-3"
          title="Chat with us"
          description=" Talk to us via the Byte app"
        />
      </Link>
      <MenuItem
        icon="sms"
        title="Send us an email"
        description="Send us an email via help@byte "
      />
      <MenuItem
        icon="whatsapp"
        title="Reach us via WhatsApp"
        description=" Chat with us on Whatsapp"
      />
      <MenuItem
        icon="call"
        title="Call us"
        description=" Call our helpdesk for further info or complaints"
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
