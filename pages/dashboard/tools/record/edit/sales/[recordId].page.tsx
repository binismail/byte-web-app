import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DashboardLayout from '../../../../../../components/layouts/dashboard-layout';
import Layout from '../../../../../../components/layouts/layout';
import SalesProductWidget from '../../../../../../components/records/sales/sales-product-widget';
import SalesServiceWidget from '../../../../../../components/records/sales/sales-service-widget';
import Button from '../../../../../../components/shared/butttons/button/button';
import Checkbox from '../../../../../../components/shared/checkbox/checkbox';
import FormError from '../../../../../../components/shared/form-error/form-error';
import Input from '../../../../../../components/shared/input/input/input';
import PhoneInput from '../../../../../../components/shared/input/phone-input/phone-input';
import LoadingState from '../../../../../../components/shared/loading-state';
import TextArea from '../../../../../../components/shared/textarea/textarea';
import { isEmpty } from '../../../../../../helpers/is-emtpy';
import {
  useGetSingleRecordQuery,
  useUpdateRecordMutation,
} from '../../../../../../lib/services/businessApi';
import { RecordProduct, SalesRecordDetailsType } from '../../records.types';

const EditSalesRecord = () => {
  // STATES
  const [singleSalesRecord, setSingleSalesRecord] =
    useState<SalesRecordDetailsType | null>(null);
  const [isService, setIsService] = useState(false);

  // DATA INITIALIZATION
  const router = useRouter();
  const recordId = router.query.recordId;

  // HOOKS
  const {
    data,
    isLoading: getSalesRecordLoading,
    isSuccess,
  } = useGetSingleRecordQuery(recordId as string, {
    refetchOnMountOrArgChange: true,
  });
  const [udpateSalesRecord, { isLoading: updateSalesLoading }] =
    useUpdateRecordMutation();

  // SIDE EFFECTS
  useEffect(() => {
    if (isSuccess && !isEmpty(data?.data) && data?.data !== null) {
      const salesRecordDetail: SalesRecordDetailsType = data?.data;
      setSingleSalesRecord(salesRecordDetail);
      setIsService(!isEmpty(salesRecordDetail.services));
    }
  }, [isSuccess, data]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      {getSalesRecordLoading ? (
        <LoadingState heightTailwind="h-[70vh]" />
      ) : !isEmpty(singleSalesRecord) && singleSalesRecord != null ? (
        <Formik
          enableReinitialize
          initialValues={{
            customer: singleSalesRecord.customer,
            description: singleSalesRecord.description,
            type: singleSalesRecord.type,
            dealType: singleSalesRecord.dealType,
            paymentMethod: singleSalesRecord.paymentMethod,
            date: singleSalesRecord.date,
            totalAmount: singleSalesRecord.totalAmount,
            [isService ? 'services' : 'products']: isService
              ? singleSalesRecord?.services?.map(
                  ({ _id, ...services }) => services
                )
              : singleSalesRecord?.products?.map(
                  ({ _id, ...products }) => products
                ),
          }}
          onSubmit={(values) => {
            // destructure value
            const { description, ...salesRecord } = values;
            const formData: SalesRecordDetailsType = {
              ...salesRecord,
              ...(values.description &&
                values.description !== undefined && {
                  description: values.description,
                }),
            };

            // make request
            udpateSalesRecord({
              recordId: `${recordId}`,
              data: formData,
            })
              .unwrap()
              .then(() => {
                toast.success(`Record updated successfully!`);
              })
              .catch((error: any) => {
                toast.error(error?.data?.message || `Couldn't update record`);
              });
          }}
          validationSchema={Yup.object().shape(
            {
              paymentMethod: Yup.string().required('Required'),
              description: Yup.string()
                .nullable()
                .notRequired()
                .when('description', {
                  is: (value: string) => value?.length,
                  then: (rule) => rule.min(3),
                }),
              date: Yup.date().required('Required'),
              [isService ? 'services' : 'products']: isService
                ? Yup.array().of(
                    Yup.object().shape({
                      name: Yup.string().required('Required'),
                      cost: Yup.number()
                        .min(5, "can't be less than ₦5")
                        .required('Required'),
                    })
                  )
                : Yup.array().of(
                    Yup.object().shape({
                      name: Yup.string().required('Required'),
                      quantity: Yup.number()
                        .min(1, "can't be less than 1")
                        .required('Required'),
                      unitPrice: Yup.number()
                        .min(5, "can't be less than ₦5")
                        .required('Required'),
                    })
                  ),
              customer: Yup.object().shape({
                name: Yup.string().required('Required'),
                phone: Yup.string()
                  .matches(/^[0-9]+$/, 'Must be only digits')
                  .required('Required'),
              }),
            },
            [['description', 'description']]
          )}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            dirty,
          }) => {
            return (
              <Form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col w-full h-full gap-6"
              >
                {/* product of service details */}
                <div className="w-full flex-col flex gap-6">
                  {isService ? (
                    <FieldArray
                      name="services"
                      render={({ push, remove }) => (
                        <SalesServiceWidget
                          values={values}
                          push={push}
                          remove={remove}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    />
                  ) : (
                    <FieldArray
                      name="products"
                      render={({ push, remove, replace }) => (
                        <>
                          {values?.products !== undefined &&
                            (values?.products as RecordProduct[]).map(
                              (product, index) => (
                                <SalesProductWidget
                                  key={index}
                                  product={product}
                                  productIndex={index}
                                  values={values}
                                  push={push}
                                  replace={replace}
                                  remove={remove}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  setFieldValue={setFieldValue}
                                />
                              )
                            )}
                        </>
                      )}
                    />
                  )}
                </div>

                {/* customer and other information */}
                <div className="w-full flex gap-6">
                  {/* customer details */}
                  <div className="flex w-[40%] flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4 h-fit">
                    {/* title */}
                    <p className="w-full p-4 border-b border-[#D0D6DB] text-sm text-[#5864AE]">
                      Customer Details
                    </p>

                    {/* content */}
                    <div className="flex flex-col w-full gap-4">
                      {/* customer name */}
                      <label className="w-full flex flex-col gap-2">
                        <span className="text-sm text-[#30333B] font-normal">
                          {'Customer name'}
                        </span>
                        <Input
                          name="customer.name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.customer?.name}
                          placeholder="Enter customer name"
                          type="text"
                        />
                        {touched.customer?.name && errors.customer?.name && (
                          <FormError message={errors.customer?.name || ''} />
                        )}
                      </label>

                      {/* phone number */}
                      <label className="w-full flex flex-col gap-2">
                        <span className="text-sm text-[#30333B] font-normal">
                          {'Phone number'}
                        </span>
                        <PhoneInput
                          name="customer.phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.customer?.phone}
                          placeholder="phone"
                          type="phone"
                        />
                        {touched.customer?.phone && errors.customer?.phone && (
                          <FormError message={errors.customer?.phone || ''} />
                        )}
                      </label>
                    </div>
                  </div>

                  {/* other information */}
                  <div className="flex w-full h-fit flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4">
                    {/* title */}
                    <p className="w-full p-4 border-b border-[#D0D6DB] text-sm text-[#5864AE]">
                      Other information
                    </p>

                    {/* content */}
                    <div className="w-full flex gap-4">
                      {/* description and payment methods */}
                      <div className="flex flex-col w-full gap-3">
                        {/* description */}
                        {values.description ? (
                          <label className="w-full flex flex-col gap-2">
                            <span className="text-sm text-[#30333B] font-normal">
                              Description
                            </span>
                            <TextArea
                              rows={5}
                              name="description"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                              placeholder="Enter description"
                            />
                            {touched.description && errors.description && (
                              <FormError message={errors.description || ''} />
                            )}
                          </label>
                        ) : null}

                        {/* payment methods */}
                        <label className="w-full flex flex-col gap-3">
                          <span className="text-sm text-[#30333B] font-normal">
                            Payment method
                          </span>
                          <div
                            role="group"
                            aria-labelledby="payment-method-group"
                            className="flex gap-4"
                          >
                            <Checkbox
                              checked={values.paymentMethod === 'cash'}
                              type="radio"
                              name="paymentMethod"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={'cash'}
                              label="Cash"
                              className="mb-md-1"
                            />
                            <Checkbox
                              checked={values.paymentMethod === 'pos'}
                              type="radio"
                              name="paymentMethod"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={'pos'}
                              label="POS"
                              className="mb-md-1"
                            />
                            <Checkbox
                              checked={values.paymentMethod === 'transfer'}
                              type="radio"
                              name="paymentMethod"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={'transfer'}
                              label="Transfer"
                            />
                          </div>
                          {touched.paymentMethod && errors.paymentMethod && (
                            <FormError message={errors.paymentMethod || ''} />
                          )}
                        </label>
                      </div>

                      {/* date */}
                      <label className="w-full flex flex-col gap-2">
                        <span className="text-sm text-[#30333B] font-normal">
                          {'Date'}
                        </span>
                        <Input
                          name="date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={
                            new Date(values.date).toLocaleDateString('en-CA') ||
                            '2022-01-01'
                          }
                          placeholder="Date"
                          type="date"
                        />
                        {touched.date && errors.date && (
                          <FormError message={errors.date || ''} />
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* total amount and button container */}
                <div className="flex flex-col w-full items-start gap-6 pb-6">
                  {/* total amount display */}
                  <div className="flex justify-between py-4 px-6 bg-[#F8F9FA] rounded-2xl w-full">
                    <p className="text-[#808691] text-base font-normal">
                      Total Amount
                    </p>
                    <p className="text-[#19A97B] text-xl font-normal">{`₦${values.totalAmount.toLocaleString(
                      'en-US'
                    )}`}</p>
                  </div>

                  {/* save changes button */}
                  <Button
                    loading={updateSalesLoading}
                    disabled={!dirty || updateSalesLoading}
                    click={handleSubmit}
                    title="Save changes"
                    type="large"
                    color="btnPrimary"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div className="w-full h-[70vh] flex items-center justify-center text-gray-400">
          No data! Please refresh
        </div>
      )}
    </div>
  );
};

EditSalesRecord.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Edit sales record">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default EditSalesRecord;
