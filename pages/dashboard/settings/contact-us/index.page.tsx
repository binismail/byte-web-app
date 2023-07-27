import { ReactElement } from 'react';

import { Call, Messages3, Sms, Whatsapp } from 'iconsax-react';
import Head from 'next/head';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import ContactusMenuItem from '../../../../components/settings/contactus-menu-item';
import { NextPageWithLayout } from '../../../_app.page';

const ContactUs: NextPageWithLayout<any> = () => {
  return (
    <div>
      <Head>
        <title>Contact us - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full grid grid-cols-4 gap-6">
        <ContactusMenuItem
          Icon={Messages3}
          title="Chat with us"
          href="https://twitter.com/joinbyte"
          targetBlank={true}
          variant="Bold"
          description=" Reach us via Twitter"
        />
        <ContactusMenuItem
          Icon={Sms}
          href="mailto:support@joinbyte.co"
          variant="Bold"
          title="Email"
          targetBlank={true}
          description="Send us an email"
        />
        <ContactusMenuItem
          Icon={Whatsapp}
          href="https://wa.me/message/GBHGOXVAFON6H1"
          variant="Bold"
          title="Reach us via WhatsApp"
          targetBlank={true}
          description="React us via WhatsApp"
        />
        <ContactusMenuItem
          Icon={Call}
          href="tel:+2349165953131"
          variant="Bold"
          title="Call us"
          description="Call our helpdesk for further info or complaints"
        />
      </div>
    </div>
  );
};

ContactUs.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Contact us">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default ContactUs;
