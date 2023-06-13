import { ReactElement } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Button from '../../../../components/shared/butttons/button/button';
import IconShadow from '../../../../components/shared/icon/icon-shadow';
import Input from '../../../../components/shared/input/input/input';
import PhoneInput from '../../../../components/shared/input/phone-input/phone-input';
import TextArea from '../../../../components/shared/textarea/textarea';
import { NextPageWithLayout } from '../../../_app.page';

export interface IInput {}

const Home: NextPageWithLayout<IInput> = () => {
  return (
    <div className="container-border-rounded">
      <div className="flex-column flex-center flex-justify-center">
        <IconShadow
          icon="d-cube-scan"
          size="16"
          color="var(--neutral06)"
          className="grey"
        />
        <p className="text-byte">Add business image</p>
      </div>
      <div className="flex gap-1 form-group">
        <div className="input-wrapper">
          <label>First name</label>
          <Input placeholder="Drop down" type="dropdown" value="1" />
        </div>
        <div className="input-wrapper">
          <label>Last name</label>
          <Input placeholder="231111" type="text" value="1" />
        </div>
        <div className="input-wrapper">
          <label>Phone number</label>
          <PhoneInput placeholder="" type="text" value="1" />
        </div>
      </div>

      <div className="flex gap-1 form-group">
        <div className="input-wrapper">
          <label>Email address</label>
          <Input placeholder="email" type="dropdown" value="1" />
        </div>
        <div className="input-wrapper">
          <label>Email address</label>
          <Input placeholder="email" type="dropdown" value="1" />
        </div>
        <div className="input-wrapper">
          <label>Adddress</label>
          <TextArea rows={6} placeholder="231111" value="1" />
        </div>
      </div>
      <Button title="Save Changes" type="large" color="btnPrimary" />
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
