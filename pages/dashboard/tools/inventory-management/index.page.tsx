import { Sort } from 'iconsax-react';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import CreateInventory from '../../../../components/inventory/create-inventory';
import SortModal from '../../../../components/inventory/sort-modal';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Button from '../../../../components/shared/butttons/button/button';
import SearchInput from '../../../../components/shared/input/search-input/search-input';
import InventoryTable from '../../../../components/shared/table/inventory-table/inventory-table';
import { useGetInventoriesQuery } from '../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../_app.page';
import { InventoryContentType } from './inventory.types';

const InventoryManagement: NextPageWithLayout = () => {
  // STATES
  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<string>('num');
  const [ascending, setAscending] = useState<boolean>(true);
  const [sortModalStatus, setSortModalStatus] = useState<boolean>(false);
  const [addProductState, setAddProductState] = useState<boolean>(false);
  const [inventories, setInventories] = useState([]);

  //   HOOKS
  const { data, isLoading, isSuccess } = useGetInventoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  //   SIDE EFFECTS
  useEffect(() => {
    if (isSuccess) {
      setInventories(data.data);
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
      {addProductState && (
        <CreateInventory setAddProductState={setAddProductState} />
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
            placeholder="Search inventory"
          />
        </div>

        {/* buttons */}
        <div className="w-full flex items-center justify-between">
          {/* add inventory */}
          <Button
            click={() => setAddProductState(true)}
            type="large"
            icon="add"
            color="btnPrimary"
            title="Add to inventory"
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

      {/* inventory table */}
      <InventoryTable
        loading={isLoading}
        isAscending={ascending}
        filter={filter}
        contents={inventories?.filter((content: InventoryContentType) =>
          content?.productName?.toLocaleLowerCase()?.includes(searchInput)
        )}
      />
    </div>
  );
};

InventoryManagement.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Inventory">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default InventoryManagement;
