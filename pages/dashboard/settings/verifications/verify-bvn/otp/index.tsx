import { Form, Formik } from 'formik';
import Head from 'next/head';
import { ReactElement } from 'react';
import * as Yup from 'yup';
import DashboardLayout from '../../../../../../components/layouts/dashboard-layout';
import Layout from '../../../../../../components/layouts/layout';
import Button from '../../../../../../components/shared/butttons/button/button';
import FormError from '../../../../../../components/shared/form-error/form-error';
import Input from '../../../../../../components/shared/input/input/input';
import { NextPageWithLayout } from '../../../../../_app.page';

const VerifyBtnOtp: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>{'Verify BVN (OTP) - Byte'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Formik
        enableReinitialize
        initialValues={{
          otp: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          otp: Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(11, "Can't be less than 11 digits")
            .max(11, "Can't be more than 11 digits")
            .required('Required'),
        })}
      >
        {({ values, touched, errors, handleChange, handleBlur, isValid }) => {
          return (
            <Form>
              <div className="w-full flex flex-col gap-6 py-6 px-4 border border-[#E6EAED] rounded-2xl">
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-body-lg-bold mb-0 text-neutral-09">
                    Verify your BVN
                  </p>
                  <p className="text-value ">
                    We require your BVN only to confirm your identity. Entering
                    your BVN here does not give us access to your financial
                    information or balances. If you don’t know your BVN, dial
                    *565*1# to get it.
                  </p>
                </div>
                <label className="flex flex-col gap-1 w-1/3">
                  <span>BVN</span>
                  <Input
                    type="text"
                    name="otp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.otp}
                    placeholder="Enter BVN"
                  />
                  {touched.otp && errors.otp && (
                    <FormError message={errors.otp as string} />
                  )}
                </label>
                <div className="w-full grid grid-cols-4">
                  <Button
                    disabled={!isValid}
                    title="Verify BVN"
                    type="large"
                    color="btnPrimary"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

VerifyBtnOtp.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Verify BVN OTP">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default VerifyBtnOtp;
