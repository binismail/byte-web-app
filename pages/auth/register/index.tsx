import { Formik } from 'formik';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import FirstRegStep from '../../../components/register/first-reg-step';
import SecondRegStep from '../../../components/register/second-reg-step';
import Header from '../../../components/shared/header/header';
import { useRegisterMutation } from '../../../lib/services/businessApi';
import logo from '../../../public/logo.svg';
import homeStyles from '../../../styles/home.module.scss';
import styles from './register.module.scss';

const Register: NextPage = () => {
  // DATA INITIALIZATION
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  // STATES
  const [progress, setProgress] = useState<number>(1);

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
            console.log(data);
            toast.success(data?.message || 'Registered successfully!');
            router.push('/onboarding/verify-phone/verifyphone');
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
                    title={'Let’s get to know you'}
                    subtitle={'We need information about you'}
                  ></Header>
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
                  <Link href={'/auth/login'}>
                    <a className="font-normal text-[15px] text-[#6A78D1] block w-full text-center">
                      Already on Byte? Log in
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

export default Register;
