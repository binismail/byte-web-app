import { ReactElement } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import { NextPageWithLayout } from '../../_app';
import styles from './Home.module.scss';
export interface IInput {
  placeholder: string;
  type: string;
  value: string;
  onChange?: any;
  className: string;
}

const Home: NextPageWithLayout<IInput> = ({ placeholder, type }) => {
  return (
    <input className={styles.input} placeholder={placeholder} type={type} />
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
