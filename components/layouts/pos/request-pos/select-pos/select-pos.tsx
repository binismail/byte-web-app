import image1 from '../../../../../public/image/Byte Terminal 2.png';
import image2 from '../../../../../public/image/Byte Terminal 2 (1).png';
import image3 from '../../../../../public/image/Byte Terminal 2 (2).png';

import PosTypes from '../pos-types/pos-type';
import styles from './select-pos.module.scss';

const SelectPos: React.FC<any> = ({ onNextClick }) => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <h3 className="text-[20px]">POS Type</h3>
        <p className="text-[#565A63] text-[14px] my-3">
          Select from our Options of POS
        </p>
        <div className="flex gap-3 container-2">
          <div onClick={onNextClick} className={styles.cardSelect}>
            <PosTypes
              price={'N25,000'}
              name={'Byte Paddi'}
              description={'Everything in one place'}
              image={image1}
            />
          </div>

          <div className={styles.cardSelect}>
            <PosTypes
              price={'N20,000'}
              name={'Byte Paddi PRO'}
              description={'Fast transaction and transfer'}
              image={image2}
            />
          </div>

          <div className={styles.cardSelect}>
            <PosTypes
              price={'N20,000'}
              name={'Byte Paddi Lite '}
              description={'Everything in one place'}
              image={image3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPos;
