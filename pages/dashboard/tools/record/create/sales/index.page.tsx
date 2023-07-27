import Head from 'next/head';
import { ReactElement, useState } from 'react';
import DashboardLayout from '../../../../../../components/layouts/dashboard-layout';
import Layout from '../../../../../../components/layouts/layout';
import CreateProductRecord from '../../../../../../components/layouts/record/create-record/sales/create-product-record';
import CreateServiceRecord from '../../../../../../components/layouts/record/create-record/sales/create-service-record';
import { NextPageWithLayout } from '../../../../../_app.page';

const CreateSalesRecord: NextPageWithLayout = () => {
  // STATES
  const [activeTab, setTab] = useState<number>(1);

  return (
    <div>
      <Head>
        <title>Add sales record - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="h-full w-full flex flex-col items-center gap-6">
        {/* tab */}
        <div className="w-full flex items-center justify-center border-b border-[#E6EAED]">
          {/* product details */}
          <button
            onClick={() => setTab(1)}
            className={`py-3 px-4 inline-flex items-center justify-center text-sm font-normal w-[25%] ${
              activeTab === 1
                ? 'border-b border-[#5864AE] text-[#5864AE]'
                : 'text-[#808691]'
            }`}
          >
            Product Details
          </button>

          {/* service detials */}
          <button
            onClick={() => setTab(2)}
            className={`py-3 px-4 inline-flex items-center justify-center text-sm font-normal w-[25%] ${
              activeTab === 2
                ? 'border-b border-[#5864AE] text-[#5864AE]'
                : 'text-[#808691]'
            }`}
          >
            Service Records
          </button>
        </div>

        {/* content */}
        <main className="flex w-full h-full">
          {activeTab === 1 ? <CreateProductRecord /> : <CreateServiceRecord />}
        </main>
      </section>
    </div>
  );
};

CreateSalesRecord.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Add sales record">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default CreateSalesRecord;
