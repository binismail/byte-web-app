import PinInput from 'react-pin-input';
import Button from '../shared/butttons/button/button';
import styles from './verify-phone.module.scss';

const VerifyPhone: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div>
          <p className="text-h6 text-center">Verify Phone</p>
          <p className="text-secton-content text-center">
            Please enter code sent to 0816707475
          </p>
          <div>
            <div className=" flex flex-justify-center">
              <PinInput
                length={6}
                initialValue=""
                onChange={() => {}}
                type="numeric"
                inputMode="number"
                style={{ padding: '5px', margin: '5px', display: 'flex' }}
                inputStyle={{
                  border: 'none',
                  borderBottom: '1px solid  #000000',
                  fontWeight: '700',
                  fontSize: '34px',
                  lineHeight: '41px',
                }}
                inputFocusStyle={{ borderBottom: '1px solid  green' }}
                onComplete={() => {}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </div>
          </div>

          <div className="form-group mb-2">
            <Button color="btnPrimary" title="Continue" type="block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
