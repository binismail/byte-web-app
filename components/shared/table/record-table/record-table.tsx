import { Receive, Transmit } from 'iconsax-react';
import { useMemo, useState } from 'react';
import { isEmpty } from '../../../../helpers/is-emtpy';
import {
  RecordProduct,
  RecordService,
} from '../../../../pages/dashboard/tools/record/records.types';
import RecordDetails from '../../../records/record-details.modal/record-details ';
import LoadingState from '../../loading-state';
import styles from './record-table.module.scss';
export interface IRecordTable<T> {
  header?: unknown;
  records: T[];
  filter: string;
  isAscending: boolean;
  loading: boolean;
}

const RecordTable = <T extends { [key: string]: any }>({
  records,
  loading,
  filter,
  isAscending,
}: IRecordTable<T>) => {
  // STATES
  const [recordDetailsState, setRecordDetailsState] = useState<boolean>(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string>('');

  // HOOKS
  const sortValues = useMemo(() => {
    let leftHandValue = isAscending ? 1 : -1;
    let rightHandValue = isAscending ? -1 : 1;

    return [leftHandValue, rightHandValue];
  }, [isAscending]);

  // HANDLERS
  function deduceProductName(
    previousValue: unknown,
    currentValue: unknown,
    currentIndex: number,
    arr: (RecordProduct | RecordService)[]
  ) {
    const productName = arr[0].name;
    const arrSize = arr.length;
    if (arrSize < 2) {
      return productName;
    }
    const result = `${productName} and ${currentIndex} other${
      arrSize > 2 ? 's' : ''
    }`;
    return result;
  }

  return (
    <div className={styles.container}>
      {/* MODALS */}
      {recordDetailsState && (
        <RecordDetails
          recordId={selectedRecordId}
          setRecordDetailsState={setRecordDetailsState}
        />
      )}

      <table className={styles.table}>
        {/* head */}
        <thead className="w-full flex flex-col">
          <tr className="grid grid-cols-[2.7fr_3.4fr_1.6fr_2.3fr] w-full text-left border-b border-[#E6EAED] content-center">
            <th className={styles.th}>
              {records.some((record) => record.type === 'sales')
                ? 'Customer name'
                : 'Description'}
            </th>

            <th className={styles.th}>Item/s purchased</th>

            <th className={styles.th}>Amount</th>

            <th className={styles.th}>Date</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="w-full flex flex-col text-left">
          {/* loading */}
          {loading ? (
            <tr className="w-full h-full flex items-center justify-center">
              <td>
                <LoadingState />
              </td>
            </tr>
          ) : !isEmpty(records) ? (
            // if content is not empty, sort
            records
              ?.sort((a: any, b: any) => {
                if (filter === 'name') {
                  return a.customer[filter] > b.customer[filter]
                    ? sortValues[0]
                    : sortValues[1];
                }
                return a[filter] > b[filter] ? sortValues[0] : sortValues[1];
              })
              ?.map((content, index: number) => (
                // map content
                <tr
                  onClick={() => {
                    setSelectedRecordId(content._id);
                    setRecordDetailsState(true);
                  }}
                  key={index}
                  className="grid grid-cols-[2.7fr_3.4fr_1.6fr_2.3fr] h-[72px] text-center content-center w-full cursor-pointer"
                >
                  {/* customer name / description */}
                  <td className={`${styles.td} inline-flex items-center gap-3`}>
                    {content.type === 'expense' ? (
                      <span className="p-[10px] rounded-[50%] inline-flex items-center justify-center bg-[#FFE5EB]">
                        <Transmit size="24" color="#CF4F66" />
                      </span>
                    ) : (
                      <span className="p-[10px] rounded-[50%] inline-flex items-center justify-center bg-[#DBFFF2]">
                        <Receive size="24" color="#19A97B" />
                      </span>
                    )}
                    <p className={styles.description}>
                      {content.type === 'expense'
                        ? content.description
                        : content.customer.name}
                    </p>
                  </td>

                  {/* item/s purchase */}
                  <td className={styles.td}>
                    <p className={styles.description}>
                      {!isEmpty(content.services)
                        ? content.services.reduce(deduceProductName, 0)
                        : !isEmpty(content.products) &&
                          content.products.reduce(deduceProductName, 0)}
                    </p>
                  </td>

                  {/* amount */}
                  <td className={styles.td}>
                    <p className={styles.description}>
                      {' '}
                      {content.totalAmount.toLocaleString('en-US')}
                    </p>
                  </td>

                  {/* date */}
                  <td className={styles.td}>
                    <p className={styles.subDescription}>
                      {' '}
                      {new Date(content.createdAt).toLocaleDateString()} -{' '}
                      {new Date(content.updatedAt).toLocaleDateString()}
                    </p>
                  </td>
                </tr>
              ))
          ) : (
            <tr className="w-full h-[50vh] text-gray-400 fontt-sm flex items-center justify-center">
              <td>No data!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
