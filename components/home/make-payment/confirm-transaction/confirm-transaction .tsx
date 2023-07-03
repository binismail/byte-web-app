import Button from '../../../shared/butttons/button/button';
import styles from './confirm-transaction.module.scss';

const ConfirmTransaction: React.FC<any> = ({
  onSendClick,
  amount,
  accountName,
  bankName,
  description,
}) => {
  return (
    <div className="flex justify-center px-2 mt-6 w-full flex-col items-stretch">
      <div className={styles.container}>
        <div className="flex flex-col w-full gap-7">
          {/* detail info */}
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-sm font-normal text-[#808691] text-center">
              You’re about to send
            </p>

            {/* primary details */}
            <div className="flex w-full flex-col gap-3">
              <p className="font-normal text-[#30333B] text-xl text-center">
                ₦{parseInt(amount || 0).toLocaleString('en-US')}
              </p>
              <p className="text-sm font-normal text-[#808691] text-center">
                To
              </p>
              <p className="font-normal text-[#30333B] text-xl text-center">
                {accountName}
              </p>
            </div>
          </div>

          {/* container */}
          <div className="flex flex-col w-full gap-4">
            {/* bank */}
            <div className=" flex flex-space-between">
              <label className="text-label">Bank</label>
              <p className="text-value">{bankName}</p>
            </div>

            {/* transaction fee */}
            <div className="flex flex-space-between">
              <label className="text-label">Transaction fee</label>
              <p className="text-value">
                ₦
                {0.015 * parseInt(amount || 0) > 3000
                  ? 3000
                  : 0.015 * parseInt(amount || 0)}
              </p>
            </div>

            {/* description */}
            <div className="flex flex-space-between">
              <label className="text-label">Description</label>
              <p className="text-value">{description}</p>
            </div>
          </div>

          {/* button */}
          <div className="form-group mb-2">
            <Button
              color="btnPrimary"
              title={`Send ₦${parseInt(amount || 0).toLocaleString('en-US')}`}
              type="block"
              click={onSendClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransaction;
