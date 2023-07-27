import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DashboardLayout from '../../../../../components/layouts/dashboard-layout';
import Layout from '../../../../../components/layouts/layout';
import Button from '../../../../../components/shared/butttons/button/button';
import FormError from '../../../../../components/shared/form-error/form-error';
import Input from '../../../../../components/shared/input/input/input';
import { useVerifyBvnMutation } from '../../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../../_app.page';

const VerifyBvn: NextPageWithLayout = () => {
  // HOOKS
  const [verifyBvn, { isLoading }] = useVerifyBvnMutation();

  // DATA INITIALIZATION
  const router = useRouter();

  // SIDE EFFECTS
  useEffect(() => {
    // Prefetch the verifications page
    router.prefetch('/dashboard/settings/verifications');
  }, [router]);

  return (
    <div>
      <Head>
        <title>Verify BVN - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Formik
        enableReinitialize
        initialValues={{
          bvn: '',
        }}
        onSubmit={(values) => {
          verifyBvn(values.bvn)
            .unwrap()
            .then((data: any) => {
              toast.success(data?.message || `BVN verified successfully!`);
              router.replace('/dashboard/settings/verifications');
            })
            .catch((error: any) => {
              toast.error(error?.data?.message || `Failed to verify BVN`);
            });
        }}
        validationSchema={Yup.object({
          bvn: Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(11, "Can't be less than 11 digits")
            .max(11, "Can't be more than 11 digits")
            .required('Required'),
        })}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          isValid,
          isSubmitting,
        }) => {
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
                    name="bvn"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bvn}
                    placeholder="Enter BVN"
                  />
                  {touched.bvn && errors.bvn && (
                    <FormError message={errors.bvn as string} />
                  )}
                </label>
                <div className="w-full grid grid-cols-4">
                  <Button
                    disabled={!isValid || isSubmitting || isLoading}
                    title="Verify BVN"
                    type="large"
                    color="btnPrimary"
                    loading={isLoading}
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

VerifyBvn.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Verify BVN">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default VerifyBvn;
