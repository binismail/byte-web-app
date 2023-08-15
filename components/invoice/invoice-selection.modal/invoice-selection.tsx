import ByteIcon from '../../shared/icon/byte.icon';
import styles from './invoice-selection.module.scss';

const InvoiceSelection: React.FC<any> = () => {
  return (
    <div className="modal">
      {' '}
      <div>
        <div className="">
          <p className="text-h5 text-center  mb-0">Invoice source</p>
          <p className="text-section-subtitle text-center text-neutral-08">
            Where do you want to create your invoice from?
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.cardSelect}>
          <div className="icon-shadow byte small flex flex-center">
            <ByteIcon
              style={{ marginTop: '0px' }}
              icon="document-normal1"
              size={16}
              color="var(--primary01)"
            />{' '}
          </div>
          <p>From scratch</p>
        </div>

        <div className={styles.cardSelect}>
          <div className="icon-shadow byte small flex flex-center">
            <ByteIcon
              style={{ marginTop: '0px' }}
              icon="document-text1"
              size={16}
              color="var(--primary01)"
            />{' '}
          </div>
          <p>From sales record</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSelection;
