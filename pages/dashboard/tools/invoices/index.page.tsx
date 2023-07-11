import { Sort } from 'iconsax-react';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import SortModal from '../../../../components/invoice/sort-modal';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Button from '../../../../components/shared/butttons/button/button';
import SearchInput from '../../../../components/shared/input/search-input/search-input';
import InvoiceTable from '../../../../components/shared/table/invoice-table/invoice-table';
import { useGetInvoicesQuery } from '../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../_app.page';
import { InvoiceDetailsType } from './invoices.types';

const Invoices: NextPageWithLayout = () => {
  // STATES
  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<string>('num');
  const [ascending, setAscending] = useState<boolean>(true);
  const [sortModalStatus, setSortModalStatus] = useState<boolean>(false);
  const [invoices, setInvoices] = useState([]);

  //   HOOKS
  const { data, isLoading, isSuccess } = useGetInvoicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // DATA INITIALIZATION

  //   SIDE EFFECTS
  useEffect(() => {
    if (isSuccess) {
      setInvoices(data.data);
    }
  }, [isSuccess, data]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* MODALS */}
      {sortModalStatus && (
        <SortModal
          setAscending={setAscending}
          ascending={ascending}
          setFilter={setFilter}
          filter={filter}
          setSortModalStatus={setSortModalStatus}
        />
      )}

      {/* search input and button container */}
      <section className="flex flex-col w-full gap-4">
        {/* search bar */}
        <div className="w-full flex flex-col items-stretch">
          <SearchInput
            value={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
            type="text"
            placeholder="Find an invoice"
          />
        </div>

        {/* buttons */}
        <div className="w-full flex items-center justify-between">
          {/* add inventory */}
          <Button
            // click={() => setAddProductState(true)}
            type="large"
            icon="add"
            color="btnPrimary"
            title="Create an invoice"
          />

          {/* sort */}
          <span
            onClick={() => setSortModalStatus((prevState) => !prevState)}
            className="text-[#B2B8C2] text-sm font-normal inline-flex items-center gap-2 px-6 py-4 hover:bg-gray-100 cursor-pointer rounded-xl border border-[#B2B8C2]"
          >
            <Sort size="20" color="#B2B8C2" />
            Sort
          </span>
        </div>
      </section>

      {/* invoice table */}
      <InvoiceTable
        loading={isLoading}
        isAscending={ascending}
        filter={filter}
        contents={invoices.filter((content: InvoiceDetailsType) =>
          content?.customer?.name?.toLocaleLowerCase()?.includes(searchInput)
        )}
      />
    </div>
  );
};

Invoices.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Invoices">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default Invoices;
