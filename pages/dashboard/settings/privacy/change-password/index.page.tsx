import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import * as Yup from 'yup';
import DashboardLayout from '../../../../../components/layouts/dashboard-layout';
import Layout from '../../../../../components/layouts/layout';

import { toast } from 'react-toastify';
import Button from '../../../../../components/shared/butttons/button/button';
import FormError from '../../../../../components/shared/form-error/form-error';
import PasswordInput from '../../../../../components/shared/input/password-input/password-input';
import { useUpdatePasswordMutation } from '../../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../../_app.page';

const ChangePassword: NextPageWithLayout = () => {
  // DATA INITIALIZATION
  const router = useRouter();

  // HOOKS
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  // SIDE EFFECTS
  useEffect(() => {
    // Prefetch the settings page
    router.prefetch('/dashboard/settings');
  }, [router]);

  return (
    <div>
      <Head>
        <title>Change password - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* form */}
      <Formik
        enableReinitialize
        initialValues={{
          currentPassword: '',
          newPassword: '',
          repeatPassword: '',
        }}
        onSubmit={(values) => {
          const { repeatPassword, ...formData } = values;
          // make request
          updatePassword(formData)
            .unwrap()
            .then((data: any) => {
              toast.success(data?.message || `Password updated successfully!`);
              router.push('/dashboard/settings');
            })
            .catch((error: any) => {
              toast.error(error?.data?.message || `Failed to update password`);
            });
        }}
        validationSchema={Yup.object({
          currentPassword: Yup.string()
            .required('password is required')
            .min(8, 'password must be at least 8 characters long')
            .matches(/\d/, 'password must contain a number')
            .matches(/[a-z]/, 'password must contain a lowercase letter')
            .matches(/[A-Z]/, 'password must contain an uppercase letter'),
          newPassword: Yup.string()
            .required('password is required')
            .min(8, 'password must be at least 8 characters long')
            .matches(/\d/, 'password must contain a number')
            .matches(/[a-z]/, 'password must contain a lowercase letter')
            .matches(/[A-Z]/, 'password must contain an uppercase letter'),
          repeatPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'passwords must match')
            .required('required')
            .min(8, 'must be at least 8 characters long')
            .matches(/\d/, 'must contain a number')
            .matches(/[a-z]/, 'must contain a lowercase letter')
            .matches(/[A-Z]/, 'must contain an uppercase letter'),
        })}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          dirty,
          isValid,
          isSubmitting,
        }) => {
          return (
            <Form className="flex w-full flex-col gap-6 py-6 px-4 rounded-2xl border border-[#E6EAED]">
              {/* info */}
              <div className="w-full grid grid-cols-3 gap-x-4 gap-y-6">
                {/* current password */}
                <label className="input-wrapper">
                  <span>Current password</span>
                  <PasswordInput
                    name={'currentPassword'}
                    value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter current password"
                  />
                  {touched.currentPassword && errors.currentPassword && (
                    <FormError message={errors.currentPassword} />
                  )}
                </label>

                {/* new password */}
                <label className="input-wrapper">
                  <span>New password</span>
                  <PasswordInput
                    name={'newPassword'}
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter new password"
                  />
                  {touched.newPassword && errors.newPassword && (
                    <FormError message={errors.newPassword} />
                  )}
                </label>

                {/* repeat password */}
                <label className="input-wrapper">
                  <span>Repeat password</span>
                  <PasswordInput
                    name={'repeatPassword'}
                    value={values.repeatPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter new password"
                  />
                  {touched.repeatPassword && errors.repeatPassword && (
                    <FormError message={errors.repeatPassword} />
                  )}
                </label>
              </div>

              {/* forgot password */}
              <span className="text-[#6A78D1] text-[15px] font-normal">
                Forgot your password?
              </span>

              {/* button */}
              <div className="w-full grid grid-cols-4">
                <Button
                  disabled={!dirty || !isValid || isLoading || isSubmitting}
                  loading={isLoading}
                  title="Save Changes"
                  type="large"
                  color="btnPrimary"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Change password">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default ChangePassword;
