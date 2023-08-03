import Image from 'next/image';
import { isEmpty } from '../../../helpers/is-emtpy';
import {
  LeastAcquired,
  LeastSold,
  MostAcquired,
  MostSold,
} from '../../../pages/dashboard/payment/payement.types';
import IconShadow from '../../shared/icon/icon-shadow';
import styles from './index.module.scss';

type Props = {
  inventories: MostSold[] | LeastSold[] | MostAcquired[] | LeastAcquired[];
  isSent: boolean;
};

const InventoryAnalyticsTable = ({ inventories, isSent }: Props) => {
  return (
    <table className={styles.table}>
      {/* head */}
      <thead className="w-full flex flex-col">
        <tr className="grid grid-cols-[4fr_2fr_2fr_2fr] w-full text-left border-b border-[#E6EAED] content-center">
          <th className={styles.th}>Items(s) name</th>

          <th className={styles.th}>Items total</th>

          <th className={styles.th}>{`Items ${
            isSent ? 'acquired' : 'sold'
          }`}</th>

          <th className={styles.th}>Items remaining</th>
        </tr>
      </thead>

      {/* body */}
      <tbody className="w-full flex flex-col text-left">
        {!isEmpty(inventories) ? (
          inventories?.map((inventory, index: number) => (
            <tr
              key={index}
              className="grid grid-cols-[4fr_2fr_2fr_2fr] h-[72px] text-center content-center w-full cursor-pointer"
            >
              <td className={`${styles.td} inline-flex items-center gap-3`}>
                {inventory?.productImage ? (
                  <span className="rounded-[50%] bg-[#F0F2F5] h-[40px] w-[40px] inline-flex items-center justify-center">
                    <Image
                      className="rounded-[50%]"
                      height="40px"
                      width="40px"
                      src={inventory?.productImage}
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
                <p className={styles.description}> {inventory.productName}</p>
              </td>

              <td className={styles.td}>
                <p className={styles.description}>
                  {inventory.productQuantityStocked}
                </p>
              </td>

              <td className={styles.td}>
                <p className={styles.description}>
                  {inventory.productQuantityRemaining}
                </p>
              </td>

              <td className={styles.td}>
                <p className={styles.description}>
                  {inventory.productQuantityStocked -
                    inventory.productQuantityRemaining}
                </p>
              </td>
            </tr>
          ))
        ) : (
          <tr className="w-full h-[50vh] text-gray-400 fontt-sm flex items-center justify-center">
            <td>No inventories!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InventoryAnalyticsTable;
