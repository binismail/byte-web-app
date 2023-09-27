import { ArrowRight2, Bank } from 'iconsax-react';
import styles from './recent-table.module.scss';

// export interface IRecentTable<T> {
  // header?: unknown;
  // recents: T[];
  // filter: string;
  // isAscending: boolean;
  // loading: boolean;
// }

const RecentTable = () => {
  return (
    <div className="rounded-[10px] border p-6 h-[400px] w-[400px]">
      <div className={styles.header}>
        <div className={styles.tab}>
          <p>Recent</p>
          <p>Favourite</p>
        </div>
        <a href="#">
          View all <span>&#10095;</span>
        </a>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex justify-center flex-center">
          <div className="mr-md-1 w-[30px] h-[30px] bg-gray-200 rounded-[50%] inline-flex items-center justify-center">
            <Bank size="16" color="#19A97B" variant="Bold" />
          </div>
          <div>
            <p className="text-[16px]">Khalid Ismail</p>
            <p className="text-[#808691] text-[12px]">
              <span>Sent N20,000</span>*<span>12th, Oct. 2023. - 2:00pm</span>
            </p>
          </div>
        </div>
        <ArrowRight2 size="18" color="#565A63" />
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex justify-center flex-center">
          <div className="mr-md-1 w-[30px] h-[30px] bg-gray-200 rounded-[50%] inline-flex items-center justify-center">
            <Bank size="16" color="#19A97B" variant="Bold" />
          </div>
          <div>
            <p className="text-[16px]">Godswill Augustine</p>
            <p className="text-[#808691] text-[12px]">
              <span>Sent N20,000</span>*<span>12th, Oct. 2023. - 2:00pm</span>
            </p>
          </div>
        </div>
        <ArrowRight2 size="18" color="#565A63" />
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex justify-center flex-center">
          <div className="mr-md-1 w-[30px] h-[30px] bg-gray-200 rounded-[50%] inline-flex items-center justify-center">
            <Bank size="16" color="#19A97B" variant="Bold" />
          </div>
          <div>
            <p className="text-[16px]">Victor O. Babatunde</p>
            <p className="text-[#808691] text-[12px]">
              <span>Sent N20,000</span>*<span>13th, Oct. 2023. - 2:00pm</span>
            </p>
          </div>
        </div>
        <ArrowRight2 size="18" color="#565A63" />
      </div>
    </div>
  );
};

export default RecentTable;
