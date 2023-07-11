import { ReactElement, useState } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard-layout';
import ProductDetails from '../../../../../components/layouts/invoice/product-details';
import ServiceDetails from '../../../../../components/layouts/invoice/service-details';
import Layout from '../../../../../components/layouts/layout';
import { NextPageWithLayout } from '../../../../_app.page';

const CreateInvoice: NextPageWithLayout = () => {
  // STATES
  const [activeTab, setTab] = useState<1 | 2>(1);
  return (
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
          Product details
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
          Service details
        </button>
      </div>

      {/* content */}
      <main className="flex w-full h-full">
        {activeTab === 1 ? <ProductDetails /> : <ServiceDetails />}
      </main>
    </section>
  );
};

CreateInvoice.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Create invoice">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default CreateInvoice;
