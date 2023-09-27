import { FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useCreateInvoiceMutation } from '../../../lib/services/businessApi';
import { SingleInvoiceDetailsType } from '../../../pages/dashboard/tools/invoices/invoices.types';
import CreateInvoiceProduct from '../../invoice/create-invoice/create-invoice-product';
import PreviewInvoice from '../../invoice/preview-invoice.modal/preview-invoice';
import Button from '../../shared/butttons/button/button';
import Checkbox from '../../shared/checkbox/checkbox';
import FormError from '../../shared/form-error/form-error';
import Input from '../../shared/input/input/input';
import PhoneInput from '../../shared/input/phone-input/phone-input';
import SuccessModal from '../../shared/modal/components/success/success.modal';
import Modal from '../../shared/modal/modal';
import TotalAmount from '../../total amount/total-amount';

type Props = {};

const ProductDetails = () => {
  // STATES
  const [invoiceDetails, setInvoiceDetails] =
    useState<SingleInvoiceDetailsType>({
      type: 'product',
      paymentMethod: 'online',
      discountPercentage: 0,
      issuedDate: new Date().toLocaleDateString('en-CA'),
      dueDate: new Date().toLocaleDateString('en-CA'),
      products: [
        {
          name: '',
          quantity: 0,
          unitPrice: 0,
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
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [previewInvoiceState, setPreviewInvoiceState] = useState(false);
  const [successModalState, setSuccessModalState] = useState(false);

  // HANDLERS
  const showSuccessModal = () => {
    setSuccessModalState(true);
    setTimeout(() => {
      setSuccessModalState(false);
    }, 5000);
  };

  // HOOKS
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  // DATA INITIALIZATION
  // const router = useRouter()

  useEffect(() => {
    console.log(setInvoiceDetails);
  });

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Formik
        enableReinitialize
        initialValues={{
          type: invoiceDetails.type,
          paymentMethod: invoiceDetails.paymentMethod,
          discountPercentage: invoiceDetails.discountPercentage,
          issuedDate: invoiceDetails.issuedDate,
          dueDate: invoiceDetails.dueDate,
          products: invoiceDetails.products,
          subTotal: invoiceDetails.subTotal,
          taxAmount: invoiceDetails.taxAmount,
          discountAmount: invoiceDetails.discountAmount,
          totalAmount: invoiceDetails.totalAmount,
          customer: invoiceDetails.customer,
        }}
        onSubmit={(data, { resetForm }) => {
          createInvoice(data)
            .unwrap()
            .then(() => {
              setPreviewInvoiceState(false);
              showSuccessModal();
              resetForm();
              // router.replace('/dashboard/tools/invoices');
            })
            .catch((error: any) => {
              toast.error(error?.data?.message || `Couldn't create invoice`);
            });
        }}
        validationSchema={Yup.object({
          paymentMethod: Yup.string().required('Required'),
          discountPercentage: Yup.number(),
          issuedDate: Yup.date()
            .min(
              new Date(new Date().toDateString()),
              "issued date can't be less than today"
            )
            .required('Required'),
          dueDate: Yup.date()
            .required('Required')
            .when(
              'issuedDate',
              (issuedDate, schema) =>
                issuedDate &&
                schema.min(
                  issuedDate,
                  'Due date cannot be earlier than issued date'
                )
            ),
          products: Yup.array().of(
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
                  isValid={isValid}
                  values={values}
                  isService={Object.prototype.hasOwnProperty.call(
                    values,
                    'services'
                  )}
                  onClose={() => setPreviewInvoiceState(false)}
                />
              )}
              <Form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col w-full h-full gap-6"
              >
                {/* product of service details */}
                <div className="w-full flex-col flex gap-6">
                  <FieldArray
                    name="products"
                    render={({ push, remove, replace }) => (
                      <>
                        {values?.products !== undefined &&
                          values?.products.map((product, index) => (
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
                          ))}
                      </>
                    )}
                  />
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
                          {touched.paymentMethod && errors.paymentMethod && (
                            <FormError message={errors.paymentMethod || ''} />
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
                              setFieldValue('discountAmount', discountAmount);
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
                    disabled={!dirty || isLoading || !isValid}
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
    </div>
  );
};

export default ProductDetails;
