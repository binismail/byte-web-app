import Button from '../../../../../../components/shared/butttons/button/button';
import styles from './confirm-transaction.module.scss';

const ConfirmTransaction: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div>
          <p className="text-secton-content text-center">
            You’re about to send
          </p>

          <p className="text-h6 text-center">₦25,000.00</p>
          <p className="text-secton-content text-center">To</p>
          <p className="text-h6 text-center">Afefelaye Amina</p>
          <div>
            <div className=" flex flex-space-between">
              <label className="text-label">Bank</label>
              <p className="text-value">Providus Bank</p>
            </div>

            <div className="flex flex-space-between">
              <label className="text-label">Transaction fee</label>
              <p className="text-value">₦10</p>
            </div>
          </div>
          <div className="flex flex-space-between">
            <label className="text-label">Description</label>
            <p className="text-value">transfer</p>
          </div>
          <div className="form-group mb-2">
            <Button color="btnPrimary" title="Send ₦25,000.00" type="block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransaction;
