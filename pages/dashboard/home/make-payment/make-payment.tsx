import ByteIcon from '../../../../components/shared/icon/byte.icon';
import styles from './make-payment.module.scss';

const MakePayment: React.FC<any> = ({ onClickLeft }) => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div onClick={onClickLeft} className={styles.cardSelect}>
          <div className="icon-shadow byte h-[48px] w-[48px] flex flex-center">
            <ByteIcon
              style={{ marginTop: '0px' }}
              icon="send-2"
              size={24}
              color="var(--primary01)"
            />{' '}
          </div>
          <p className="font-normal text-base">Send money</p>
        </div>

        {/* <div onClick={onClickRight} className={styles.cardSelect}>
          <div className="icon-shadow byte small flex flex-center">
            <ByteIcon
              style={{ marginTop: '0px' }}
              icon="document-text"
              size={16}
              color="var(--primary01)"
            />{' '}
          </div>
          <p>Pay bills</p>
        </div> */}
      </div>
    </div>
  );
};

export default MakePayment;
