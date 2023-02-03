import ByteIcon from '../../../../components/shared/icon/byte.icon';
import styles from './fund-wallet.module.scss';

const MakePayment: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div className={styles.cardSelect}>
          <div className="icon-shadow byte small flex flex-center">
            <ByteIcon
              style={{ marginTop: '0px' }}
              icon="bank"
              size={16}
              color="var(--primary01)"
            />{' '}
          </div>
          <p>Send money</p>
        </div>

        <div className={styles.cardSelect}>
          <div className="icon-shadow byte small flex flex-center">
            <ByteIcon
              style={{ marginTop: '0px' }}
              icon="card"
              size={16}
              color="var(--primary01)"
            />{' '}
          </div>
          <p>Pay bills</p>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
