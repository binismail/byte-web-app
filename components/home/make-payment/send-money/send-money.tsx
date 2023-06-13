import Button from '../../../shared/butttons/button/button';
import ByteIcon from '../../../shared/icon/byte.icon';
import Input from '../../../shared/input/input/input';
import styles from './send-money.module.scss';

const SendMoney: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div>
          <div className="form-group">
            <label>Amount</label>
            <Input placeholder="" value="" type="text" className="currency" />
          </div>

          <div className="form-group">
            <label>Bank</label>
            <Input placeholder="" value="" type="text" className="currency" />
          </div>

          <div className="form-group">
            <label>Account number</label>
            <Input placeholder="" value="" type="text" className="currency" />
            <div className="flex flex-align-center">
              <ByteIcon
                icon="tick-circle"
                size="15"
                color="var(--success)"
                className="mr-sm-2"
              />
              <p className="text-section-subtitle">
                <span style={{ color: 'var(--neutral06)' }}>
                  {' '}
                  Account name:
                </span>{' '}
                Afefelaye Amina
              </p>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <Input placeholder="" value="" type="text" className="currency" />
          </div>
          <div className="form-group mb-2">
            <Button color="btnPrimary" title="Continue" type="block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
