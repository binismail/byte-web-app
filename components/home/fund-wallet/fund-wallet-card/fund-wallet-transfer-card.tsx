import Button from '../../../shared/butttons/button/button';
import IconShadow from '../../../shared/icon/icon-shadow';
import Input from '../../../shared/input/input/input';
import styles from './fund-wallet-transfer-card.module.scss';

const FundWalletCard: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div className="flex flex-justify-center">
          <IconShadow
            icon="card"
            size="32"
            color="var(--primary05)"
            className="byte-light large"
          />
        </div>
        <div>
          <p className="text-section-subtitle text-center">
            How much would you like to fund your Byte Pocket with?
          </p>
          <div>
            <div className="form-group">
              <label>Amount</label>
              <Input placeholder="" value="" type="text" />
            </div>
            <div className="form-group mb-2">
              <Button color="btnPrimary" title="Continue" type="block" />
            </div>
            <div className="flex">
              <div className="flex flex-align-center mr-md-1">
                <IconShadow
                  icon="lock-1"
                  size="12"
                  color="var(--primary05)"
                  className="byte-security"
                />
              </div>
              <p className="text-security-assurance">
                Your card information is protected by the best security. We do
                not have access to it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundWalletCard;
