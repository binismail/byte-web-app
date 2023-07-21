import { Formik } from 'formik';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '../../../components/shared/butttons/button/button';
import FormError from '../../../components/shared/form-error/form-error';
import Header from '../../../components/shared/header/header';
import Input from '../../../components/shared/input/input/input';
import PasswordInput from '../../../components/shared/input/password-input/password-input';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  selectLoggedIn,
  setCredentials,
} from '../../../lib/redux/authSlice/authSlice';
import { useLoginMutation } from '../../../lib/services/businessApi';
import logo from '../../../public/logo.svg';
import homeStyles from '../../../styles/home.module.scss';
import styles from './login.module.scss';

export type ILogin = {
  sampleTextProp: string;
};

const Login: NextPage = () => {
  // DATA INITIALZATION
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const isLoggedIn = useAppSelector(selectLoggedIn);

  // STATES
  const [redirectLoading, setRedirectLoading] = useState(true);

  // SIDE EFFECTS
  useEffect(() => {
    if (isLoggedIn) {
      const { returnUrl } = router.query;
      router.push(returnUrl ? `${returnUrl}` : '/dashboard');
    } else {
      setRedirectLoading(false);
    }
  }, []);

  // RETURNED JSX: REDIRECT TO DASHBOARD IF USER IS LOGGED-IN
  if (redirectLoading) {
    return (
      <div className="w-[100vw] h-[100vh] bg-white text-gray-600 font-normal text-base flex items-center justify-center">
        <Image src="/logo.svg" alt="logo" width="120px" height="120px" />
      </div>
    );
  }

  // RETURNED FORMIK COMPONENT: IF USER ISN'T LOGGED-IN
  return (
    <Formik
      enableReinitialize
      initialValues={{
        companyEmail: '',
        password: '',
      }}
      onSubmit={(values) => {
        login({
          email: values.companyEmail,
          password: values.password,
        })
          .unwrap()
          .then((data) => {
            dispatch(
              setCredentials({
                userId: data?.data?.userId,
                role: data?.data?.role,
                accessToken: data?.data?.accessToken,
                refreshToken: data?.data?.refreshToken,
                loggedIn: true,
              })
            );
            const { returnUrl } = router.query;
            router.push(returnUrl ? `${returnUrl}` : '/dashboard');
          })
          .catch((error) => {
            toast.error(error?.data?.message || 'Login failed!');
          });
      }}
      validationSchema={Yup.object({
        companyEmail: Yup.string()
          .email('invalid email address')
          .required('Email is required'),
        password: Yup.string()
          .required('password is required')
          .min(8, 'password must be at least 8 characters long')
          .matches(/\d/, 'password must contain a number')
          .matches(/[a-z]/, 'password must contain a lowercase letter')
          .matches(/[A-Z]/, 'password must contain an uppercase letter'),
      })}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
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
                    <Input
                      name={'companyEmail'}
                      value={values.companyEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=""
                      type="text"
                    />
                    {touched.companyEmail && errors.companyEmail && (
                      <FormError message={errors.companyEmail} />
                    )}
                  </div>

                  <div className="form-group w-full flex flex-col gap-1">
                    <label>Password</label>
                    <PasswordInput
                      name={'password'}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=""
                    />
                    {touched.password && errors.password && (
                      <FormError message={errors.password} />
                    )}

                    <Link href={'/onboarding/forgotpassword/forgotpassword'}>
                      <a className="text-[#6A78D1] text-[15px] font-normal pt-2">
                        Forgot your password?
                      </a>
                    </Link>
                  </div>
                  <div className="mt-10 mb-6">
                    <Button
                      click={handleSubmit}
                      color="btnPrimary"
                      title="Continue"
                      type="block"
                      loading={isLoading}
                    />
                  </div>
                  <Link href={'/auth/register'}>
                    <a className="font-normal text-[15px] text-[#6A78D1] block w-full text-center">
                      No account yet? Sign up
                    </a>
                  </Link>
                </div>
              </div>
              <div className={styles.background}>
                <div className={styles.side}></div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
