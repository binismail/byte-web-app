import { Sort } from 'iconsax-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetRecordsQuery } from '../../../../lib/services/businessApi';
import {
  ExpenseRecordType,
  SalesRecordType,
} from '../../../../pages/dashboard/tools/record/records.types';
import SalesSortModal from '../../../records/sales/sales-sort-modal';
import Button from '../../../shared/butttons/button/button';
import SearchInput from '../../../shared/input/search-input/search-input';
import RecordTable from '../../../shared/table/record-table/record-table';

type Props = {};

const SalesRecords = (props: Props) => {
  // STATES
  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<string>('date');
  const [ascending, setAscending] = useState<boolean>(true);
  const [sortModalStatus, setSortModalStatus] = useState<boolean>(false);
  const [records, setRecords] = useState<
    (SalesRecordType & ExpenseRecordType)[] | null
  >(null);

  // HOOKS
  const { data, isLoading, isSuccess } = useGetRecordsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // DATA INITIALIZATION
  const router = useRouter();

  // SIDE EFFECTS
  useEffect(() => {
    if (isSuccess) {
      setRecords(data.data);
    }
  }, [isSuccess, data]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* MODALS */}
      {sortModalStatus && (
        <SalesSortModal
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
            placeholder="Find a record"
          />
        </div>

        {/* buttons */}
        <div className="w-full flex items-center justify-between">
          {/* add inventory */}
          <Button
            click={() => router.push('/dashboard/tools/record/create/sales')}
            type="large"
            icon="add"
            color="btnPrimary"
            title="Add record"
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
      <RecordTable
        loading={isLoading}
        isAscending={ascending}
        filter={filter}
        records={(records !== null
          ? records.filter((record) => record.type === 'sales')
          : []
        ).filter((record) =>
          record.customer.name.toLowerCase().includes(searchInput.toLowerCase())
        )}
      />
    </div>
  );
};

export default SalesRecords;
