import { ArrowRight } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { isEmpty } from '../../../helpers/is-emtpy';
import { useGetTransactionsQuery } from '../../../lib/services/businessApi';
import TransactionTable from '../../shared/table/table';
import { TransactionHistoryType } from './transaction.types';

const TransactionHistory = () => {
  // STATES
  const [transactions, setTransactions] = useState<
    TransactionHistoryType[] | null
  >(null);

  //   HOOKS
  const { data, isLoading, isSuccess } = useGetTransactionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // SIDE EFFECTS
  useEffect(() => {
    if (isSuccess && !isEmpty(data?.data)) {
      setTransactions({ ...data.data });
    }
  }, [isSuccess, data]);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* table */}
      <div className="w-full flex justify-between gap-4 items-center">
        <p className="font-normal text-xl text-[#30333B]">
          Transaction-history
        </p>

        {/* view all */}
        <span className="text-sm text-[#6A78D1] font-normal inline-flex items-center gap-2 cursor-pointer hover:opacity-70">
          View all
          <ArrowRight size="16" color="#6A78D1" />
        </span>
      </div>

      {/* table */}
      <TransactionTable transactions={transactions} loading={isLoading} />
    </div>
  );
};

export default TransactionHistory;
