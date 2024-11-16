import { Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import ProfilePhotoUpload from '../../../../components/settings/profile-photo-upload';
import Button from '../../../../components/shared/butttons/button/button';
import FormError from '../../../../components/shared/form-error/form-error';
import Input from '../../../../components/shared/input/input/input';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectUserDetails } from '../../../../lib/redux/userDetailsSlice/userDetailsSlice';
import { useUpdateBusinessInfoMutation } from '../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../_app.page';

// type PickedImageType = {
//   path: string;
//   preview: string;
//   name: string;
//   size: number;
//   type: string;
//   webkitRelativePath: string;
// };

const EditBusinessInfo: NextPageWithLayout = () => {
  // DATA INITIALZIATION
  const router = useRouter();
  const userDetails = useAppSelector(selectUserDetails);
  const businessCategories = [
    {
      label:
        'Food & Drinks: Restaurant - Bar - Private chef - Snack and Pastries',
      value: 'Food & Drinks',
    },
    {
      label: 'Fitness and Spa',
      value: 'Fitness and Spa',
    },
    {
      label: 'Fashion',
      value: 'Fashion',
    },
    {
      label: 'Supermarket',
      value: 'Supermarket',
    },
    {
      label: 'Electronics',
      value: 'Electronics',
    },
    {
      label: 'Baby Products',
      value: 'Baby Products',
    },
    {
      label: 'Dry Cleaning',
      value: 'Dry Cleaning',
    },
    {
      label: 'Game shop',
      value: 'Game shop',
    },
    {
      label: 'Gas Stations',
      value: 'Gas Stations',
    },
    {
      label: 'Hair Salons',
      value: 'Hair Salons',
    },
    {
      label: 'Cosmetics',
      value: 'Cosmetics',
    },
    {
      label: 'Grocery stores',
      value: 'Grocery stores',
    },
    {
      label: 'Construction',
      value: 'Construction',
    },
    {
      label: 'Phones, Accessories & Gadget',
      value: 'Phones, Accessories & Gadget',
    },
    {
      label: 'Pharmacy',
      value: 'Pharmacy',
    },
    {
      label: 'Home and kitchen Appliances',
      value: 'Home and kitchen Appliances',
    },
    {
      label: 'Agency',
      value: 'Agency',
    },
    {
      label: 'Freelancer',
      value: 'Freelancer',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ];

  // HOOKS
  const [updateBusinessInfo, { isLoading }] = useUpdateBusinessInfoMutation();

  // SIDE EFFECTS
  useEffect(() => {
    // Prefetch the settings page
    router.prefetch('/dashboard/settings');
  }, [router]);

  return (
    <div>
      <Head>
        <title>Edit business info - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Formik
        enableReinitialize
        initialValues={{
          name: (userDetails.name as string) || '',
          address: userDetails.address || '',
          category: userDetails.category || '',
          description: userDetails.description || '',
          location: userDetails.location,
        }}
        onSubmit={(values) => {
          const { name, ...formData } = values;
          console.log(name);
          // make request
          updateBusinessInfo(formData)
            .unwrap()
            .then((data: any) => {
              toast.success(data?.message || `Profile updated successfully!`);
              router.push('/dashboard/settings');
            })
            .catch((error: any) => {
              toast.error(error?.data?.message || `Failed to update profile`);
            });
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          address: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          category: Yup.string().required('Required'),
          location: Yup.object().shape({
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
          }),
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
          setFieldValue,
        }) => {
          return (
            <Form className="flex w-full flex-col gap-8">
              {/* image upload component*/}
              <ProfilePhotoUpload />

              {/* info */}
              <div className="w-full grid grid-cols-3 gap-x-4 gap-y-6">
                {/* business legal name */}
                <label className="input-wrapper">
                  <span>Business legal name</span>
                  <Input
                    disabled={true}
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Enter business name"
                    type="text"
                  />
                  {touched.name && errors.name && (
                    <FormError message={errors.name || ''} />
                  )}
                </label>

                {/* address */}
                <label className="input-wrapper">
                  <span>Address</span>
                  <Input
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    placeholder="Enter address"
                    type="text"
                  />
                  {touched.address && errors.address && (
                    <FormError message={errors.address || ''} />
                  )}
                </label>

                {/* city */}
                <label className="input-wrapper">
                  <span>{'City'}</span>
                  <Input
                    name="location.city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.location?.city || ''}
                    placeholder="Enter city"
                    type="text"
                  />
                  {touched?.location?.city && errors?.location?.city && (
                    <FormError message={errors?.location?.city || ''} />
                  )}
                </label>

                {/* state */}
                <label className="input-wrapper">
                  <span>{'State'}</span>
                  <Input
                    name="location.state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.location?.state || ''}
                    placeholder="Enter state"
                    type="text"
                  />
                  {touched?.location?.state && errors?.location?.state && (
                    <FormError message={errors?.location?.state || ''} />
                  )}
                </label>

                {/* country */}
                <label className="input-wrapper">
                  <span>{'Country'}</span>
                  <Input
                    name="location.country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.location?.country || ''}
                    placeholder="Enter country"
                    type="text"
                  />
                  {touched?.location?.country && errors?.location?.country && (
                    <FormError message={errors?.location?.country || ''} />
                  )}
                </label>

                {/* nature of business */}
                <label className="input-wrapper">
                  <span>Nature of business</span>
                  <Input
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Enter business description"
                    type="text"
                  />
                  {touched.description && errors.description && (
                    <FormError message={errors.description || ''} />
                  )}
                </label>

                {/* category */}
                <label className="input-wrapper">
                  <span>Business Category</span>
                  <Select
                    classNames={{
                      control: (state: any) =>
                        state.isFocused
                          ? 'border-red-600 h-[48px] w-full mt-1 !rounded-xl'
                          : 'border-grey-300 h-[48px] w-full mt-1 !rounded-xl',
                      indicatorSeparator: () => '!bg-transparent',
                      valueContainer: () => '!px-3',
                    }}
                    name="category"
                    value={businessCategories.find(
                      (cateogry) => cateogry.value === values.category
                    )}
                    onChange={(selectedOption: any) => {
                      setFieldValue('category', selectedOption?.value || '');
                    }}
                    placeholder="Select business category"
                    options={businessCategories}
                  />
                  {touched.category && errors.category && (
                    <FormError message={errors.category || ''} />
                  )}
                </label>
              </div>

              {/* button */}
              <div className="w-full grid grid-cols-4">
                <Button
                  disabled={!dirty || !isValid || isLoading}
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

EditBusinessInfo.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Edit business info">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default EditBusinessInfo;
