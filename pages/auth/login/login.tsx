import Button from '../../../components/shared/butttons/button/button';
import Header from '../../../components/shared/header/header';
import Input from '../../../components/shared/input/input/input';
import styles from './login.module.scss';
import homeStyles from '../../../styles/home.module.scss';
import logo from '../../../public/logo.svg';
import Image from 'next/image';

export interface IRegister {
  sampleTextProp: string;
}

const Register: React.FC<IRegister> = () => {
  return (
    <div className={''}>
      <div className={homeStyles.gridFull}>
        <div className={styles.container}>
          <div className="form-container">
            <Image src={logo} alt="logo" width="100px" height="100px" />
            <Header
              title={'Let’s set you up on Byte'}
              subtitle={'We need information about you'}
            ></Header>
            <div className="form-group">
              <label>Business name</label>
              <Input placeholder="" value="" type="text" />
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
              <Button color="btnPrimary" title="Continue" type="block" />
            </div>
            <p className="link text-center">Already on Byte? Log in</p>
          </div>
        </div>
        <div className={styles.background}>
          <div className={styles.side}></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
