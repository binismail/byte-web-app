import { ReactElement } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import { NextPageWithLayout } from '../../_app';


const Tools: NextPageWithLayout<any> = () => {
  return (
    <div></div>
  );
};

Tools.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Tools;
