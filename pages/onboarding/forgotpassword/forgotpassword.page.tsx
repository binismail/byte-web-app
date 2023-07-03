import Button from '../../../components/shared/butttons/button/button';
import Input from '../../../components/shared/input/input/input';
import logo from '../../../public/logo.svg';
import key from '../../../public/svg/key.svg';
import homeStyles from '../../../styles/home.module.scss';
import styles from './forgotpassword.module.scss';

import { NextPage } from 'next';
import Image from 'next/image';

export interface IForgotPassword {
  sampleTextProp: string;
}

const ForgotPassword: NextPage = () => {
  return (
    <div className={''}>
      <div className={homeStyles.gridFull}>
        <div className={styles.container}>
          {true && (
            <div className="flex flex-col">
              <Image src={logo} alt="logo" width="100px" height="100px" />
              <div className="flex-container">
                <div className="icon-shadow flex flex-center">
                  <Image src={key} alt="key" width="32px" height="32px" />
                </div>
              </div>

              <div className="mb-md-3">
                <p className="text-h5 text-center">Forgot Password?</p>
                <text className={styles.subtitle}>
                  No worries we’ll send you reset instructions.
                </text>
              </div>
              <div className="form-group ">
                <label>Email</label>
                <Input placeholder="Enter your email" value="" type="text" />
              </div>
              <div className="form-group ">
                <Button color="btnPrimary" title="Reset password" />
              </div>
              <p className="link text-center mb-md-3 ">Back to log in</p>
            </div>
          )}
          {false && (
            <div className="form-container">
              <div className="flex-container">
                <div className="icon-shadow flex flex-center">
                  <Image src={key} alt="key" width="32px" height="32px" />
                </div>
              </div>

              <div className="mb-md-3">
                <p className="text-h5 text-center">Check your email</p>
                <p className={styles.subtitle}>
                  We sent a password resent link to
                </p>
              </div>

              <p className="text-center text-body-lg-bold">
                pappimistrol@gmail.com
              </p>

              <div className="form-group ">
                <Button color="btnPrimary" title="Open email " />
              </div>
              <p className=" text-center mb-md-3 ">
                Didn’r receive emai?
                <span className="link strong"> Click to resend</span>
              </p>
            </div>
          )}
        </div>
        <div className={styles.background}>
          <div className={styles.side}></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
