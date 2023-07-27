import { FieldArray, Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import CreateInvoiceProduct from '../../../../../components/invoice/create-invoice/create-invoice-product';
import InvoiceService from '../../../../../components/invoice/edit-invoice-components/invoice-service';
import PreviewInvoice from '../../../../../components/invoice/preview-invoice.modal/preview-invoice';
import DashboardLayout from '../../../../../components/layouts/dashboard-layout';
import Layout from '../../../../../components/layouts/layout';
import Button from '../../../../../components/shared/butttons/button/button';
import Checkbox from '../../../../../components/shared/checkbox/checkbox';
import FormError from '../../../../../components/shared/form-error/form-error';
import Input from '../../../../../components/shared/input/input/input';
import PhoneInput from '../../../../../components/shared/input/phone-input/phone-input';
import LoadingState from '../../../../../components/shared/loading-state';
import SuccessModal from '../../../../../components/shared/modal/components/success/success.modal';
import Modal from '../../../../../components/shared/modal/modal';
import TotalAmount from '../../../../../components/total amount/total-amount';
import { isEmpty } from '../../../../../helpers/is-emtpy';
import {
  useGetSingleInvoiceQuery,
  useUpdateInvoiceDetailsMutation,
} from '../../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../../_app.page';
import { InvoiceDetailsType, Product } from '../invoices.types';

const EditInvoice: NextPageWithLayout = () => {
  // STATES
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetailsType>({
    type: '',
    paymentMethod: '',
    discountPercentage: 0,
    _id: '',
    issuedDate: '2011-12-31T23:00:00.000Z',
    dueDate: '2011-12-31T23:00:00.000Z',
    createdAt: '',
    updatedAt: '',
    accountID: 0,
    status: '',
    business: '',
    num: '',
    products: [
      {
        name: '',
        quantity: 0,
        unitPrice: 0,
        taxPercentage: 0,
      },
    ],
    services: [
      {
        name: '',
        cost: 0,
        taxPercentage: 0,
      },
    ],
    subTotal: 0,
    taxAmount: 0,
    discountAmount: 0,
    totalAmount: 0,
    customer: {
      name: '',
      phone: '',
    },
  });
  const [isService, setIsService] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [previewInvoiceState, setPreviewInvoiceState] = useState(false);
  const [successModalState, setSuccessModalState] = useState(false);

  // DATA INITIALIZATION
  const router = useRouter();
  const invoiceId = router.query.invoiceId;

  // HANDLERS
  const showSuccessModal = () => {
    setSuccessModalState(true);
    setTimeout(() => {
      setSuccessModalState(false);
      router.replace('/dashboard/tools/invoices');
    }, 5000);
  };

  // HOOKS
  const {
    data: singleInvoiceData,
    isLoading: getSingleInvoiceLoading,
    isSuccess: isGetInvoiceSuccess,
  } = useGetSingleInvoiceQuery(invoiceId as string, {
    refetchOnMountOrArgChange: true,
  });
  const [updateInvoiceDetails, { isLoading }] =
    useUpdateInvoiceDetailsMutation();

  // SIDE EFFECTS
  useEffect(() => {
    if (
      isGetInvoiceSuccess &&
      !isEmpty(singleInvoiceData?.data) &&
      singleInvoiceData?.data !== null
    ) {
      setInvoiceDetails(singleInvoiceData?.data);
      setIsService(singleInvoiceData?.data.type === 'service');
    }
  }, [isGetInvoiceSuccess, singleInvoiceData]);

  return (
    <div>
      <Head>
        <title>Edit invoice - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full flex items-center justify-center">
        {getSingleInvoiceLoading ? (
          <LoadingState heightTailwind="h-[70vh]" />
        ) : !isEmpty(invoiceDetails) && invoiceDetails != null ? (
          <Formik
            enableReinitialize
            initialValues={{
              type: invoiceDetails.type,
              paymentMethod: invoiceDetails.paymentMethod,
              discountPercentage: invoiceDetails.discountPercentage,
              issuedDate: new Date(
                invoiceDetails.issuedDate
              ).toLocaleDateString('en-CA'),
              dueDate: new Date(invoiceDetails.dueDate).toLocaleDateString(
                'en-CA'
              ),
              [isService ? 'services' : 'products']: isService
                ? invoiceDetails.services.map(
                    ({ _id, ...services }) => services
                  )
                : invoiceDetails.products.map(
                    ({ _id, ...products }) => products
                  ),
              subTotal: invoiceDetails.subTotal,
              taxAmount: invoiceDetails.taxAmount,
              discountAmount: invoiceDetails.discountAmount,
              totalAmount: invoiceDetails.totalAmount,
              customer: invoiceDetails.customer,
            }}
            onSubmit={(values) => {
              updateInvoiceDetails({
                invoiceId: `${invoiceId}`,
                data: values,
              })
                .unwrap()
                .then(() => {
                  setPreviewInvoiceState(false);
                  showSuccessModal();
                })
                .catch((error: any) => {
                  toast.error(
                    error?.data?.message || `Couldn't update invoice`
                  );
                });
            }}
            validationSchema={Yup.object({
              paymentMethod: Yup.string().required('Required'),
              discountPercentage: Yup.number(),
              issuedDate: Yup.date().required('Required'),
              dueDate: Yup.date().required('Required'),
              [isService ? 'services' : 'products']: isService
                ? Yup.array().of(
                    Yup.object().shape({
                      name: Yup.string().required('Required'),
                      cost: Yup.number()
                        .min(5, "can't be less than ₦5")
                        .required('Required'),
                      taxPercentage: Yup.number().required('Required'),
                    })
                    // .required('Must have a service') // these constraints are shown if and only if inner constraints are satisfied
                    // .min(1, 'Minimum of 1 service'),
                  )
                : Yup.array().of(
                    Yup.object().shape({
                      taxPercentage: Yup.number().required('Required'),
                      name: Yup.string().required('Required'),
                      quantity: Yup.number()
                        .min(1, "can't be less than 1")
                        .required('Required'),
                      unitPrice: Yup.number()
                        .min(5, "can't be less than ₦5")
                        .required('Required'),
                    })
                    // .required('Must have product') // these constraints are shown if and only if inner constraints are satisfied
                    // .min(1, 'Minimum of 1 product'),
                  ),
              customer: Yup.object().shape({
                name: Yup.string().required('Required'),
                phone: Yup.string()
                  .matches(/^[0-9]+$/, 'Must be only digits')
                  .required('Required'),
              }),
            })}
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
              isSubmitting,
              isValid,
            }) => {
              return (
                <>
                  {/* MODALS */}
                  {successModalState && (
                    <Modal>
                      <SuccessModal
                        title="You’ve generated your invoice!"
                        message="Congratulations! Your invoice has been successfully generated. Tap the share button below to share it to your customer."
                        buttonTitle="Done"
                        buttonOnClick={() => setSuccessModalState(false)}
                      />
                    </Modal>
                  )}
                  {previewInvoiceState && (
                    <PreviewInvoice
                      handleSubmit={handleSubmit}
                      isLoading={isLoading}
                      dirty={dirty}
                      isSubmitting={isSubmitting}
                      isValid={isValid}
                      values={values}
                      isService={isService}
                      onClose={() => setPreviewInvoiceState(false)}
                    />
                  )}
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
                            <InvoiceService
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
                                (values?.products as Product[]).map(
                                  (product, index) => (
                                    <CreateInvoiceProduct
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

                    {/* container*/}
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
                            {touched.customer?.name &&
                              errors.customer?.name && (
                                <FormError
                                  message={errors.customer?.name || ''}
                                />
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
                            {touched.customer?.phone &&
                              errors.customer?.phone && (
                                <FormError
                                  message={errors.customer?.phone || ''}
                                />
                              )}
                          </label>
                        </div>
                      </div>

                      {/* other information */}
                      <div className="flex w-[60%] h-fit flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4">
                        {/* title */}
                        <p className="w-full p-4 border-b border-[#D0D6DB] text-sm text-[#5864AE]">
                          Other Information
                        </p>

                        {/* content */}
                        <div className="w-full flex gap-4">
                          {/* data issued */}
                          <div className="flex flex-col w-full gap-4">
                            <label className="w-full flex flex-col gap-2">
                              <span className="text-sm text-[#30333B] font-normal">
                                Date issued
                              </span>
                              <Input
                                name="issuedDate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={new Date(
                                  values.issuedDate
                                ).toLocaleDateString('en-CA')}
                                placeholder="Date issued"
                                type="date"
                              />
                              {touched.issuedDate && errors.issuedDate && (
                                <FormError message={errors.issuedDate || ''} />
                              )}
                            </label>

                            {/* payment method */}
                            <label className="w-full flex flex-col gap-2">
                              <span className="text-sm text-[#30333B] font-normal">
                                Payment method
                              </span>
                              <div
                                role="group"
                                aria-labelledby="payment-method-group"
                                className="flex flex-col gap-2"
                              >
                                <Checkbox
                                  checked={values.paymentMethod === 'online'}
                                  type="radio"
                                  name="paymentMethod"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={'online'}
                                  label="Online payment"
                                  className="mb-md-1"
                                />
                                <Checkbox
                                  checked={values.paymentMethod === 'transfer'}
                                  type="radio"
                                  name="paymentMethod"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={'transfer'}
                                  label="Bank transfer"
                                  className="mb-md-1"
                                />
                                <Checkbox
                                  checked={applyDiscount}
                                  type="checkbox"
                                  onChange={() => {
                                    if (applyDiscount) {
                                      setFieldValue('discountPercentage', 0);
                                    }
                                    setApplyDiscount(!applyDiscount);
                                  }}
                                  onBlur={handleBlur}
                                  value={'discount'}
                                  label="Apply discount"
                                />
                              </div>
                              {touched.paymentMethod &&
                                errors.paymentMethod && (
                                  <FormError
                                    message={errors.paymentMethod || ''}
                                  />
                                )}
                            </label>
                          </div>

                          {/* expired date */}
                          <div className="flex flex-col w-full gap-4">
                            <label className="w-full flex flex-col gap-2">
                              <span className="text-sm text-[#30333B] font-normal">
                                {'Expiry date'}
                              </span>
                              <Input
                                name="dueDate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dueDate}
                                placeholder="Expired date"
                                type="date"
                              />
                              {touched.dueDate && errors.dueDate && (
                                <FormError message={errors.dueDate || ''} />
                              )}
                            </label>

                            {/* discount percentage */}
                            {applyDiscount ? (
                              <label className="w-full flex flex-col gap-2">
                                <span className="text-sm text-[#30333B] font-normal">
                                  {'Discount percentage'}
                                </span>
                                <Input
                                  name="discountPercentage"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.discountPercentage}
                                  placeholder="Enter discount percentage"
                                  type="number"
                                />
                                {touched.discountPercentage &&
                                  errors.discountPercentage && (
                                    <FormError
                                      message={errors.discountPercentage || ''}
                                    />
                                  )}
                              </label>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* total amount and button */}
                    <div className="flex flex-col items-start gap-6 pb-6">
                      <div className="flex flex-col items-stretch w-full">
                        <TotalAmount
                          setFields={
                            setFieldValue
                              ? (total, discountAmount) => {
                                  setFieldValue(
                                    'discountAmount',
                                    discountAmount
                                  );
                                  setFieldValue('totalAmount', total);
                                }
                              : undefined
                          }
                          subTotal={values.subTotal}
                          taxAmount={values.taxAmount}
                          discountPercentage={values.discountPercentage}
                          value=" "
                        />
                      </div>
                      <Button
                        disabled={
                          !dirty || isSubmitting || isLoading || !isValid
                        }
                        click={() => setPreviewInvoiceState(true)}
                        title="Preview Invoice"
                        iconPosition="right"
                        icon="invoice"
                        type="large"
                        color="btnPrimary"
                      />
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        ) : (
          <div className="w-full h-[70vh] flex items-center justify-center text-gray-400">
            No data! Please refresh
          </div>
        )}
      </div>
    </div>
  );
};

EditInvoice.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Edit invoice">
        {page}
      </DashboardLayout>
    </Layout>
  );
};
export default EditInvoice;
