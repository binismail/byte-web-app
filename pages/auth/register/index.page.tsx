import { Formik } from 'formik';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import FirstRegStep from '../../../components/register/first-reg-step';
import SecondRegStep from '../../../components/register/second-reg-step';
import ThirdRegStep from '../../../components/register/third-reg-step';
import Header from '../../../components/shared/header/header';
import useStorage from '../../../hooks/useStorage';
import { useRegisterMutation } from '../../../lib/services/businessApi';
import logo from '../../../public/logo.svg';
import homeStyles from '../../../styles/home.module.scss';
import styles from './register.module.scss';

export type IRegister = {
  sampleTextProp: string;
};

const Register: NextPage = () => {
  // DATA INITIALIZATION
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [storedPhone, setStoredPhone] = useState('');
  const { getItem, removeItem } = useStorage();

  // STATES
  const [progress, setProgress] = useState<number>(1);

  // SIDE EFFECT
  useEffect(() => {
    // Prefetch the login page
    router.prefetch('/auth/login');
  }, [router]);
  useEffect(() => {
    if (progress === 3) {
      const phone = getItem('phone', 'session');
      setStoredPhone(phone);
    }
  }, [progress]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        businessName: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
      }}
      onSubmit={(values) => {
        register(values)
          .unwrap()
          .then((data) => {
            removeItem('phone', 'session');
            removeItem('id', 'session');
            toast.success(data?.message || 'Registered successfully!');
            router.push('/auth/login');
          })
          .catch((error) => {
            toast.error(error?.data?.message || 'Registration failed!');
          });
      }}
      validationSchema={Yup.object({
        businessName: Yup.string().required('Business name is required'),
        email: Yup.string()
          .email('invalid email address')
          .required('Email is required'),
        phone: Yup.string()
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            'Phone number is not valid'
          )
          .required("'Phone number is required"),
        password: Yup.string()
          .required('password is required')
          .min(8, 'password must be at least 8 characters long')
          .matches(/\d/, 'password must contain a number')
          .matches(/[a-z]/, 'password must contain a lowercase letter')
          .matches(/[A-Z]/, 'password must contain an uppercase letter'),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'passwords must match')
          .required('required')
          .min(8, 'must be at least 8 characters long')
          .matches(/\d/, 'must contain a number')
          .matches(/[a-z]/, 'must contain a lowercase letter')
          .matches(/[A-Z]/, 'must contain an uppercase letter'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
      })}
    >
      {({
        values,
        isValid,
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
                  {progress === 3 ? (
                    <Header
                      className="flex flex-col w-full gap-1 text-center mt-4"
                      titleClassName="font-normal text-2xl text-[#15171F]"
                      subtitleClassName="font-normal text-sm text-[#565A63]"
                      title={'Verify Phone'}
                      subtitle={`A One-Time Password as been sent to ${storedPhone}`}
                    />
                  ) : (
                    <Header
                      title={'Let’s get to know you'}
                      subtitle={'We need information about you'}
                    />
                  )}
                  {progress === 1 ? (
                    <FirstRegStep
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      setProgress={setProgress}
                    />
                  ) : progress === 2 ? (
                    <SecondRegStep
                      isValid={isValid}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      setProgress={setProgress}
                      handleSubmit={handleSubmit}
                      isLoading={isLoading}
                    />
                  ) : progress === 3 ? (
                    <ThirdRegStep
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      setProgress={setProgress}
                      handleSubmit={handleSubmit}
                      isLoading={isLoading}
                    />
                  ) : null}
                  {progress !== 3 ? (
                    <Link href={'/auth/login'}>
                      <a className="font-normal text-[15px] text-[#6A78D1] block w-full text-center">
                        Already on Byte? Log in
                      </a>
                    </Link>
                  ) : null}
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

export default Register;
