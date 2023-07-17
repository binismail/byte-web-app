import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import ExpenseRecords from '../../../../components/layouts/record/view-table/expense-record';
import SalesRecords from '../../../../components/layouts/record/view-table/sales-record';
import { NextPageWithLayout } from '../../../_app.page';

const Records: NextPageWithLayout = () => {
  // STATES
  const [recordTab, setRecordTab] = useState<number>(1);

  // DATA INITIALIZATION
  const router = useRouter();

  //   SIDE EFFECTS
  useEffect(() => {
    const id = parseInt(`${router.query.recordType}`);
    setRecordTab(id || 1);
  }, [router]);

  return (
    <section className="h-full w-full flex flex-col items-center gap-6">
      {/* tab */}
      <div className="w-full flex items-center justify-center border-b border-[#E6EAED]">
        {/* product details */}
        <button
          onClick={() => setRecordTab(1)}
          className={`py-3 px-4 inline-flex items-center justify-center text-sm font-normal w-[25%] ${
            recordTab === 1
              ? 'border-b border-[#5864AE] text-[#5864AE]'
              : 'text-[#808691]'
          }`}
        >
          Sales records
        </button>

        {/* service detials */}
        <button
          onClick={() => setRecordTab(2)}
          className={`py-3 px-4 inline-flex items-center justify-center text-sm font-normal w-[25%] ${
            recordTab === 2
              ? 'border-b border-[#5864AE] text-[#5864AE]'
              : 'text-[#808691]'
          }`}
        >
          Expense records
        </button>
      </div>

      {/* content */}
      <main className="flex w-full h-full">
        {recordTab === 1 ? <SalesRecords /> : <ExpenseRecords />}
      </main>
    </section>
  );
};

Records.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Inventory">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default Records;
