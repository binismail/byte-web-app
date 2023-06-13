import ByteIcon from '../../../shared/icon/byte.icon';
import IconShadow from '../../../shared/icon/icon-shadow';
import styles from './fund-wallet-card.module.scss';

const FundWalletBank: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div className="flex flex-justify-center">
          <IconShadow
            icon="bank"
            size="32"
            color="var(--primary05)"
            className="byte-light large"
          />
        </div>
        <div>
          <p className="text-section-subtitle text-center">
            You can fund your Byte Pocket by sending money from any bank to the
            bank details provided below:
          </p>
          <div>
            <div className="mb-md-2">
              <label className="text-label">Bank</label>
              <p className="text-value">Providus Bank</p>
            </div>

            <div className="flex flex-space-between mb-md-2">
              <div>
                <label className="text-label">Account number</label>
                <p className="text-value">1122334455</p>
              </div>
              <p>
                <span className="copy">Copy</span>{' '}
                <ByteIcon icon="copy" size={14} color="var(--byte)" />{' '}
              </p>
            </div>

            <div>
              <label className="text-label">Account name</label>
              <p className="text-value">Adewale Rufus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundWalletBank;
