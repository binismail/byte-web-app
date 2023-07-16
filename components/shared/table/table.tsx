import { ArrowRight2, Receive, Transmit } from 'iconsax-react';
import Image from 'next/image';
import { isEmpty } from '../../../helpers/is-emtpy';
import { TransactionHistoryType } from '../../home/transaction-history/transaction.types';
import LoadingState from '../loading-state';
import styles from './table.module.scss';
export interface ITable {
  header?: any[];
  transactions: TransactionHistoryType[] | null;
  loading: boolean;
}

const TransactionTable = ({ header, transactions, loading }: ITable) => {
  // DATA INITIALIZATION
  const localeTimeOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };

  const shortTime: Intl.DateTimeFormat = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
  });

  return (
    <table className={styles.table}>
      {/* body */}
      <tbody className="w-full flex flex-col text-left">
        {/* loading */}
        {loading ? (
          <tr className="w-full h-full flex items-center justify-center">
            <td>
              <LoadingState />
            </td>
          </tr>
        ) : !isEmpty(transactions) && transactions !== null ? (
          // if transactions is not empty, sort
          transactions.slice(0, 9).map((transaction, index: number) => (
            <tr
              key={index}
              className="grid grid-cols-[auto_3.3fr_2.2fr_3fr_.5fr] h-[72px] text-center content-center w-full cursor-pointer"
            >
              {/* Transaction type */}
              <td
                className={`justify-start inline-flex items-center gap-3 text-left h-[72px] border-b border-[#E6EAED] pr-3 mr-1`}
              >
                {transaction.transType === 'payment' ? (
                  <span className="p-[10px] rounded-[50%] inline-flex items-center justify-center bg-[#FFE5EB]">
                    <Transmit size="24" color="#CF4F66" />
                  </span>
                ) : (
                  <span className="p-[10px] rounded-[50%] inline-flex items-center justify-center bg-[#DBFFF2]">
                    <Receive size="24" color="#19A97B" />
                  </span>
                )}
              </td>

              {/* name and date */}
              <td className="inline-flex flex-col gap-1 text-left h-[72px] border-b border-[#E6EAED] pr-3 justify-center">
                <p className="text-sm font-normal text-[#30333B]">
                  {transaction.senderName}
                </p>
                <p className="font-normal text-sm text-[#565A63]">{`${new Date(
                  transaction.createdAt
                ).toLocaleString(
                  'en-UK',
                  localeTimeOptions
                )} ${shortTime.format(new Date(transaction.createdAt))}`}</p>
              </td>

              {/* Amount */}
              <td className="inline-flex flex-col gap-1 text-left h-[72px] border-b border-[#E6EAED] pr-3 justify-center">
                <p
                  className={`${
                    transaction.transType === 'payment'
                      ? 'text-[#CF4F66]'
                      : 'text-[#19A97B]'
                  } font-normal text-sm`}
                >{`₦${transaction.amount.toLocaleString('en-US')}`}</p>
                <p className="font-normal text-sm text-[#565A63]">Amount</p>
              </td>

              {/* Transaction ID */}
              <td className="inline-flex flex-col gap-1 text-left h-[72px] border-b border-[#E6EAED] pr-3 justify-center">
                <p className="text-[#30333B] font-normal text-sm">
                  {transaction.transID}
                </p>
                <p className="font-normal text-sm text-[#565A63]">
                  Transaction ID
                </p>
              </td>

              {/* arrow */}
              <td className="inline-flex text-left h-[72px] border-b border-[#E6EAED] pr-3 justify-end items-center">
                <ArrowRight2 size="18" color="#565A63" />
              </td>
            </tr>
          ))
        ) : (
          <tr className="w-full h-[50vh] flex items-center justify-center">
            <td className="inline-flex flex-col gap-4">
              {/* image */}
              <span className="w-[114px] mx-auto">
                <Image
                  src="/image/cashier.png"
                  alt="empty transaction"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '114px', height: 'auto' }}
                />
              </span>

              {/* texts */}
              <td className="inline-flex flex-col gap-1 text-center">
                <span className="text-[#1C1C1E] text-sm font-normal">
                  No Transaction History
                </span>
                <span className="text-sm font-normal text-[#8E8E93]">
                  Make your first Transaction
                </span>
              </td>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionTable;
