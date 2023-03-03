import Button from '../../../components/shared/butttons/button/button';
import Header from '../../../components/shared/header/header';
import Input from '../../../components/shared/input/input/input';
import styles from './login.module.scss';
import homeStyles from '../../../styles/home.module.scss';
import logo from '../../../public/logo.svg';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import urlList from '../../../lib/endpoints.json';
import PasswordInput from '../../../components/shared/input/password-input/password-input';

export interface ILogin {
  sampleTextProp: string;
}

const Register: React.FC<ILogin> = () => {
  const [serverResponse, setServerResponse] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [valueInput, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRegex = RegExp(
    /^([\w-/.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  );

  const change = {
    valueInput: (value: string) => {
      setErrorResponse('');
      setEmail(value);
    },

    password: (value: string) => {
      setErrorResponse('');
      setPassword(value);
    },
  };

  const handleSubmit = () => {
    if (!valueInput.trim() && !password.trim()) {
      setErrorResponse('error');
      setTimeout(() => {
        setErrorResponse('');
      }, 3000);
      return;
    }
    handeleBusinessLogin();
  };

  const handeleBusinessLogin = async () => {
    if (!emailRegex.test(valueInput)) {
      setErrorResponse('Enter a valid email');
      setTimeout(() => {
        setErrorResponse('');
      }, 3000);
    } else {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${urlList.url}${urlList.authentication.login}`,
          {
            email: valueInput.toLowerCase().trim(),
            password: password,
          },
          {
            timeout: 1500 * 60,
          }
        );

        const { userId, accessToken, refreshToken } = data.data;
        let appData = { userId, refreshToken, authToken: accessToken };

        console.log(appData);
      } catch (error: any) {
        setLoading(false);
        if (error.response) {
          setErrorResponse(error.response.data.message);
          if (error.response) {
            const formatResponse =
              error.response.data.message.charAt(0).toUpperCase() +
              error.response.data.message.slice(1);
            setServerResponse(formatResponse);
          }
        } else {
          setErrorResponse('Connection Timed Out');
          setServerResponse('Connection Timed Out');
        }
        setTimeout(() => {
          setServerResponse('');
        }, 4000);
      }
    }
  };

  return (
    <div className={''}>
      <p>{serverResponse}</p>
      <p>{errorResponse}</p>

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
              <Input
                placeholder=""
                value=""
                type="text"
                onChange={change.valueInput}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <PasswordInput placeholder="" value=""  />
            </div>
            <div className="form-group">
              <Button
                click={handleSubmit}
                color="btnPrimary"
                title="Continue"
                type="block"
                loading={loading}
              />
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
