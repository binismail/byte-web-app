import { People, Personalcard } from 'iconsax-react';
import styles from './request-pos.module.scss';

const RequestPos: React.FC<any> = ({ onClickLeft }) => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <h3 className="text-[20px]">Request POS</h3>
        <p className="text-[#565A63] text-[14px] my-3">
          Select from the option below
        </p>

        <div onClick={onClickLeft} className={styles.cardSelect}>
          <div className="flex mr-2">
            <Personalcard size={20} color="#565A63" variant="Bold" />{' '}
          </div>
          <div>
            <p className="text-[14px] text-[#353C69] ">For myself</p>
            <p className="text-[10px] text-[#808691]">
              {' '}
              Charges are as low as 0.5% - 0.4% capped at N100.{' '}
            </p>
          </div>
        </div>

        <div className={styles.cardSelect}>
          <div className="flex mr-2">
            <People size={20} color="#565A63" variant="Bold" />{' '}
          </div>
          <div>
            <p className="text-[14px] text-[#47508B] ">For Someone</p>
            <p className="text-[10px] text-[#808691]">
              {' '}
              Earn money every time the person uses the POS.{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPos;
