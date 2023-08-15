import ByteIcon from '../../../../components/shared/icon/byte.icon';
import styles from './fund-wallet.module.scss';

const FundWallet: React.FC<any> = ({ onClickLeft, onClickRight }) => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div onClick={onClickLeft} className={styles.cardSelect}>
          <div className="icon-shadow byte small flex flex-center flex-col">
            <ByteIcon
              style={{ marginTop: '0px' }}
              icon="bank"
              size={16}
              color="var(--primary01)"
            />{' '}
          </div>
          <p className="mt-2 text-sm font-normal">Bank transfer</p>
        </div>

        <div onClick={onClickRight} className={styles.cardSelect}>
          <div className="icon-shadow byte small flex flex-center flex-col">
            <ByteIcon
              style={{ marginTop: '0px' }}
              icon="card"
              size={16}
              color="var(--primary01)"
            />{' '}
          </div>
          <p className="mt-2 text-sm font-normal">Card payment</p>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
