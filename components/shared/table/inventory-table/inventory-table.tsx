import Image from 'next/image';
import { useMemo, useState } from 'react';
import { isEmpty } from '../../../../helpers/is-emtpy';
import { InventoryContentType } from '../../../../pages/dashboard/tools/inventory-management/inventory.types';
import EditInventory from '../../../inventory/edit-inventory.modal/edit-inventory';
import InventoryDetails from '../../../inventory/inventory-details.modal/inventory-details';
import IconShadow from '../../icon/icon-shadow';
import LoadingState from '../../loading-state';
import styles from './inventory-table.module.scss';
export interface IInventoryTable {
  header?: any;
  contents: InventoryContentType[];
  filter: string;
  isAscending: boolean;
  loading: boolean;
}

const InventoryTable: React.FC<IInventoryTable> = ({
  header,
  contents,
  filter,
  isAscending,
  loading,
}) => {
  // STATES
  const [productDetailsState, setProductDetailsState] =
    useState<boolean>(false);
  const [selectedProductId, setProductId] = useState<string>('');
  const [editProductState, setEditProductState] = useState<boolean>(false);

  // HOOKS
  const sortValues = useMemo(() => {
    let leftHandValue = isAscending ? 1 : -1;
    let rightHandValue = isAscending ? -1 : 1;

    return [leftHandValue, rightHandValue];
  }, [isAscending]);

  return (
    <div className={styles.container}>
      {/* MODALS */}
      {productDetailsState && (
        <InventoryDetails
          productId={selectedProductId}
          setEditProductState={setEditProductState}
          setProductDetailsState={setProductDetailsState}
        />
      )}
      {editProductState && (
        <EditInventory
          productId={selectedProductId}
          setEditProductState={setEditProductState}
        />
      )}
      <table className={styles.table}>
        {/* head */}
        <thead className="w-full flex flex-col">
          <tr className="grid grid-cols-[1.2fr_3.2fr_2fr_1.3fr_2.3fr] w-full text-left border-b border-[#E6EAED] content-center">
            <th className={styles.th}>#</th>

            <th className={styles.th}>Product name</th>

            <th className={styles.th}>Unit price</th>

            <th className={styles.th}>Availability</th>

            <th className={styles.th}>Date stocked/restocked</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="w-full flex flex-col text-left">
          {loading ? (
            <tr className="w-full h-full flex items-center justify-center">
              <td>
                <LoadingState />
              </td>
            </tr>
          ) : !isEmpty(contents) ? (
            contents
              ?.sort((a: any, b: any) =>
                a[filter] > b[filter] ? sortValues[0] : sortValues[1]
              )
              ?.map((content: InventoryContentType, i: number) => (
                <tr
                  onClick={() => {
                    setProductId(content._id);
                    setProductDetailsState(true);
                  }}
                  key={i}
                  className="grid grid-cols-[1.2fr_3.2fr_2fr_1.3fr_2.3fr] h-[72px] text-center content-center w-full cursor-pointer"
                >
                  <td className={styles.td}>
                    <p className={styles.subDescription}>{`#${content.num}`}</p>
                  </td>

                  <td className={`${styles.td} inline-flex items-center gap-2`}>
                    {content?.productImage ? (
                      <span className="rounded-[50%] bg-[#F0F2F5] h-[40px] w-[40px] inline-flex items-center justify-center">
                        <Image
                          className="rounded-[50%]"
                          height="40px"
                          width="40px"
                          src={content?.productImage}
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
                    <p className={styles.description}> {content.productName}</p>
                  </td>

                  <td className={styles.td}>
                    <p className={styles.description}>
                      {' '}
                      {content.unitCostPrice.toLocaleString('en-US')}
                    </p>
                  </td>

                  <td className={styles.td}>
                    {content?.productQuantityRemaining === 0 ? (
                      <span className="text-[#CF4F66] text-sm font-normal">
                        Out of stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-sm">
                        <span className="text-[#19A97B]">
                          {content.productQuantityRemaining}
                        </span>
                        <span className="text-[#808691]">
                          /{content.overallStock as string}
                        </span>
                      </span>
                    )}
                  </td>

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

export default InventoryTable;
