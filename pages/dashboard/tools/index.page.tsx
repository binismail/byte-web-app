import { Book, Chart21, DocumentText, EmptyWalletTick } from 'iconsax-react';
import { ReactElement } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Layout from '../../../components/layouts/layout';
import ToolsCard from '../../../components/tools/tools-card';
import { NextPageWithLayout } from '../../_app.page';

const Tools: NextPageWithLayout<any> = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* title */}
      <h3 className="text-xl text-[#30333B] font-normal">Tools</h3>

      {/* container */}
      <div className="w-full grid xl:grid-cols-4 grid-cols-3 gap-6">
        <ToolsCard
          header="Business records"
          description="Manage your business records"
          cardBg="bg-[#EFF1FA]"
          iconBg="bg-[#5864AE]"
          IconSelect={Book}
          path="/dashboard/tools/record?recordType=1"
        />
        <ToolsCard
          header="Inventory"
          description="Manage your inventory"
          cardBg="bg-[#FFF0F4]"
          iconBg="bg-[#D495A6]"
          IconSelect={DocumentText}
          path="/dashboard/tools/inventory-management"
        />
        <ToolsCard
          header="Analytics"
          description="Get vital business insigts"
          cardBg="bg-[#DBFFF2]"
          iconBg="bg-[#19A97B]"
          IconSelect={Chart21}
          path=""
        />
        <ToolsCard
          header="Debt management"
          description="Manage expected repayments"
          cardBg="bg-[#FFECDB]"
          iconBg="bg-[#944A05]"
          IconSelect={EmptyWalletTick}
          path=""
        />
      </div>
    </div>
  );
};

Tools.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout headerTitle="Business Tools">{page}</DashboardLayout>
    </Layout>
  );
};

export default Tools;
