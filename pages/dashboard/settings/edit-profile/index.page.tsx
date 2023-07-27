import { Form, Formik } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Button from '../../../../components/shared/butttons/button/button';
import FormError from '../../../../components/shared/form-error/form-error';
import IconShadow from '../../../../components/shared/icon/icon-shadow';
import Input from '../../../../components/shared/input/input/input';
import PhoneInput from '../../../../components/shared/input/phone-input/phone-input';
import TextArea from '../../../../components/shared/textarea/textarea';
import { objectToFormData } from '../../../../helpers/object-to-formdata';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectUserDetails } from '../../../../lib/redux/userDetailsSlice/userDetailsSlice';
import { useUpdateBusinessAdminMutation } from '../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../_app.page';

type PickedImageType = {
  path: string;
  preview: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const EditProfile: NextPageWithLayout = () => {
  // STATES
  const [pickedImage, setPickedImage] = useState<PickedImageType>({
    path: '',
    preview: '',
    name: '',
    size: 0,
    type: '',
    webkitRelativePath: '',
  });
  const [files, setFiles] = useState<unknown[]>([]);
  const [error, setError] = useState<string>('');

  // DATA INITIALZIATION
  const router = useRouter();
  const { administrator: userDetails } = useAppSelector(selectUserDetails);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      setError('');
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onDropRejected(fileRejections, event) {
      setError("file shouldn't be more than 5mb");
      console.log('files: ', fileRejections);
      console.log('event: ', event);
    },
  });

  // HOOKS
  const [updateBusinessAdmin, { isLoading }] = useUpdateBusinessAdminMutation();

  // SIDE EFFECTS
  useEffect(() => {
    // Prefetch the settings page
    router.prefetch('/dashboard/settings');
  }, [router]);
  useEffect(() => {
    setPickedImage(files[0] as PickedImageType);
  }, [files]);

  return (
    <div>
      <Head>
        <title>Edit profile - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: userDetails.firstName || '',
          lastName: userDetails.lastName || '',
          phone: userDetails.phone || '',
          email: userDetails.email || '',
          address: userDetails.address || '',
        }}
        onSubmit={(values) => {
          // form data
          // const formData = {
          //   ...values,
          //   identity: pickedImage.path,
          // };

          // convert body to formData
          const bodyFormData = objectToFormData(values);

          // make request
          updateBusinessAdmin(bodyFormData)
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
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          phone: Yup.string().required('Required'),
          email: Yup.string().email().required('Required'),
          address: Yup.string().required('Required'),
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
        }) => {
          return (
            <Form className="flex w-full flex-col gap-8">
              {/* image */}
              <div className="w-full flex items-center justify-center mb-4">
                <div
                  {...getRootProps()}
                  className="w-full flex flex-col items-center gap-3"
                >
                  <input {...getInputProps()} />
                  {pickedImage?.preview ? (
                    <span className="rounded-[50%] bg-[#F0F2F5] h-[70px] w-[70px] inline-flex items-center justify-center overflow-hidden">
                      <Image
                        objectFit="cover"
                        className="rounded-[50%]"
                        height="70px"
                        width="70px"
                        src={pickedImage.preview}
                        alt=""
                      />
                    </span>
                  ) : (
                    <IconShadow
                      icon="user"
                      color="var(--neutral06)"
                      size="24"
                      className="grey medium"
                    />
                  )}

                  {/* texts */}
                  <div className="w-fit flex flex-col items-center text-center gap-1">
                    {/* error message */}
                    {error && (
                      <span className="text-red-500 text-sm font-normal mx-auto">
                        {error}
                      </span>
                    )}
                    <p className="font-normal text-center text-base text-[#6A78D1] w-full">
                      {' '}
                      Change profile photo
                    </p>
                  </div>
                </div>
              </div>

              {/* info */}
              <div className="w-full grid grid-cols-3 gap-x-4 gap-y-6">
                {/* first name */}
                <label className="input-wrapper">
                  <span>First name</span>
                  <Input
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="Enter first name"
                    type="text"
                  />
                  {touched.firstName && errors.firstName && (
                    <FormError message={errors.firstName || ''} />
                  )}
                </label>

                {/* last name */}
                <label className="input-wrapper">
                  <span>Last name</span>
                  <Input
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="Enter last name"
                    type="text"
                  />
                  {touched.lastName && errors.lastName && (
                    <FormError message={errors.lastName || ''} />
                  )}
                </label>

                {/* phone number */}
                <label className="input-wrapper">
                  <span>Phone number</span>
                  <PhoneInput
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    placeholder="Enter phone number"
                    type="text"
                  />
                  {touched.phone && errors.phone && (
                    <FormError message={errors.phone || ''} />
                  )}
                </label>

                {/* email address */}
                <label className="input-wrapper">
                  <span>Email address</span>
                  <Input
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email address"
                    type="text"
                  />
                  {touched.email && errors.email && (
                    <FormError message={errors.email || ''} />
                  )}
                </label>

                {/* address */}
                <label className="input-wrapper">
                  <span> Address</span>
                  <TextArea
                    rows={6}
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    placeholder="Enter address"
                  />
                  {touched.address && errors.address && (
                    <FormError message={errors.address || ''} />
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

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Edit profile">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default EditProfile;
