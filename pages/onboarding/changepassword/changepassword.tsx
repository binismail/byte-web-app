import Button from '../../../components/shared/butttons/button/button';
import Input from '../../../components/shared/input/input/input';
import styles from './changepassword.module.scss';
import homeStyles from '../../../styles/home.module.scss';
import logo from '../../../public/logo.svg';
import Image from 'next/image';
import key from '../../../public/svg/key.svg';

export interface IChangePassword {
  sampleTextProp: string;
}

const ChangePassword: React.FC<IChangePassword> = () => {
  return (
    <div className={''}>
      <div className={homeStyles.gridFull}>
        <div className={styles.container}>
          <div className="form-container">
            <Image src={logo} alt="logo" width="100px" height="100px" />
            <div className="flex-container">
              <div className="icon-shadow flex flex-center">
                <Image src={key} alt="key" width="32px" height="32px" />
              </div>
            </div>

            <div className="mb-md-3">
              <p className="text-h5 text-center">Set new password</p>
              <p className={styles.subtitle}>
                The new password must be differnt to previously used password
              </p>
            </div>

            <div className="form-group">
              <label>Password</label>
              <Input placeholder="" value="" type="text" />
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <Input placeholder="" value="" type="text" />
            </div>
            <div className="form-group">
              <Button color="btnPrimary" title="Reset password" />
            </div>
            <p className="link text-center">Back to log in</p>
          </div>
        </div>
        <div className={styles.background}>
          <div className={styles.side}></div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
