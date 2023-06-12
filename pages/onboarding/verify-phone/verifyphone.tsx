import { NextPage } from 'next';
import Image from 'next/image';
import PinInput from 'react-pin-input';
import Button from '../../../components/shared/butttons/button/button';
import Header from '../../../components/shared/header/header';
import logo from '../../../public/logo.svg';
import homeStyles from '../../../styles/home.module.scss';
import styles from './verifyphone.module.scss';

const VerifyPhone: NextPage = () => {
  return (
    <div className={''}>
      <div className={homeStyles.gridFull}>
        <div className={styles.container}>
          <div className="form-container">
            <Image src={logo} alt="logo" width="100px" height="100px" />
            <Header
              title={'Verify Phone'}
              subtitle={'A One-Time Password as been sent to +2388066326543'}
            ></Header>
            <div className="form-group">
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
              <p className="hint text-center">
                Resend code if it doesn’t arrive in 00:59 seconds
              </p>
            </div>

            {/* Button */}
            <div className="flex w-full flex-col items-stretch my-6">
              <Button color="btnPrimary" title="Validate" />
            </div>
            <p className="link text-center">Entered a wrong number?</p>
          </div>
        </div>
        <div className={styles.background}>
          <div className={styles.side}></div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
