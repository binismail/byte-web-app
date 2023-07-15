import Image from 'next/image';
import { useMemo, useState } from 'react';
import { isEmpty } from '../../../../helpers/is-emtpy';
import { InvoiceDetailsType } from '../../../../pages/dashboard/tools/invoices/invoices.types';
import InvoiceDetail from '../../../invoice/invoice-details.modal/invoice-detail';
import IconShadow from '../../icon/icon-shadow';
import LoadingState from '../../loading-state';
import styles from './Invoice-table.module.scss';
export interface IInvoiceTable {
  header?: any;
  contents: InvoiceDetailsType[];
  filter: string;
  loading: boolean;
  isAscending: boolean;
}

const InvoiceTable = ({
  header,
  contents,
  filter,
  loading,
  isAscending,
}: IInvoiceTable) => {
  // STATES
  const [invoiceDetailsState, setInvoiceDetailsState] =
    useState<boolean>(false);
  const [selectedInvoiceId, setInvoiceId] = useState<string>('');

  // HOOKS
  const sortValues = useMemo(() => {
    let leftHandValue = isAscending ? 1 : -1;
    let rightHandValue = isAscending ? -1 : 1;

    return [leftHandValue, rightHandValue];
  }, [isAscending]);

  return (
    <div className={styles.container}>
      {/* MODALS */}
      {invoiceDetailsState && (
        <InvoiceDetail
          invoiceId={selectedInvoiceId}
          setInvoiceDetailsState={setInvoiceDetailsState}
        />
      )}
      <table className={styles.table}>
        {/* head */}
        <thead className="w-full flex flex-col">
          <tr className="grid grid-cols-[1.8fr_2.2fr_1.8fr_1.5fr_1.5fr_1.2fr] w-full text-left border-b border-[#E6EAED] content-center">
            <th className={styles.th}>Invoice number</th>

            <th className={styles.th}>Customer name</th>

            <th className={styles.th}>Amount</th>

            <th className={styles.th}>Expiry date</th>

            <th className={styles.th}>Date issued</th>

            <th className={styles.th}>Status</th>
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
          ) : !isEmpty(contents) ? (
            // if content is not empty, sort
            contents
              ?.sort((a: any, b: any) => {
                if (filter === 'name') {
                  return a.customer[filter] > b.customer[filter]
                    ? sortValues[0]
                    : sortValues[1];
                }
                return a[filter] > b[filter] ? sortValues[0] : sortValues[1];
              })
              ?.map((content: InvoiceDetailsType, i: number) => (
                // map content
                <tr
                  onClick={() => {
                    setInvoiceId(content._id);
                    setInvoiceDetailsState(true);
                  }}
                  key={i}
                  className="grid grid-cols-[1.8fr_2.2fr_1.8fr_1.5fr_1.5fr_1.2fr] h-[72px] text-center content-center w-full cursor-pointer"
                >
                  {/* invoice number */}
                  <td className={styles.td}>
                    <p className={styles.subDescription}>{`#${content.num}`}</p>
                  </td>

                  {/* customer details */}
                  <td className={`${styles.td} inline-flex items-center gap-2`}>
                    {content?.customer?.image ? (
                      <span className="rounded-[50%] bg-[#F0F2F5] h-[40px] w-[40px] inline-flex items-center justify-center">
                        <Image
                          className="rounded-[50%]"
                          height="40px"
                          width="40px"
                          src={content?.customer?.image as string}
                          alt=""
                        />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center">
                        <IconShadow
                          icon="d-cube-scan"
                          color="var(--neutral06)"
                          size="16"
                          className="grey small"
                        />
                      </span>
                    )}
                    <p className={styles.description}>
                      {' '}
                      {content.customer.name}
                    </p>
                  </td>

                  {/* amount */}
                  <td className={styles.td}>
                    <p className={styles.description}>
                      {' '}
                      {content.totalAmount.toLocaleString('en-US')}
                    </p>
                  </td>

                  {/* expiry date */}
                  <td className={styles.td}>
                    <p className={styles.subDescription}>
                      {' '}
                      {new Date(content.dueDate).toLocaleDateString()}
                    </p>
                  </td>

                  {/* date issued */}
                  <td className={styles.td}>
                    <p className={styles.subDescription}>
                      {' '}
                      {new Date(content.issuedDate).toLocaleDateString()}
                    </p>
                  </td>

                  {/* status */}
                  <td className={styles.td}>
                    <span
                      className={`${styles.status} ${
                        content.status === 'paid'
                          ? styles.paid
                          : content.status === 'unpaid'
                          ? styles.unpaid
                          : styles.overdue
                      }`}
                    >
                      {' '}
                      {content.status}
                    </span>
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

export default InvoiceTable;
