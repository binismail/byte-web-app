import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useCreateRecordMutation } from '../../../../../lib/services/businessApi';
import { RecordProduct } from '../../../../../pages/dashboard/tools/record/records.types';
import SalesProductWidget from '../../../../records/sales/sales-product-widget';
import Button from '../../../../shared/butttons/button/button';
import Checkbox from '../../../../shared/checkbox/checkbox';
import FormError from '../../../../shared/form-error/form-error';
import Input from '../../../../shared/input/input/input';
import PhoneInput from '../../../../shared/input/phone-input/phone-input';
import TextArea from '../../../../shared/textarea/textarea';

const CreateProductRecord = () => {
  // DATA INITIALIZATION
  const router = useRouter();

  // HOOKS
  const [createRecord, { isLoading }] = useCreateRecordMutation();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Formik
        enableReinitialize
        initialValues={{
          description: '',
          customer: {
            name: '',
            phone: '',
          },
          type: 'sales',
          dealType: 'product',
          paymentMethod: 'cash',
          date: '2023-01-01',
          totalAmount: 0,
          products: [
            {
              name: '',
              quantity: 0,
              unitPrice: 0,
            },
          ],
        }}
        onSubmit={(values) => {
          createRecord(values)
            .unwrap()
            .then(() => {
              toast.success(`Sales record created successfully!`);
              router.replace('/dashboard/tools/record?recordType=1');
            })
            .catch((error: any) => {
              toast.error(error?.data?.message || `Couldn't create record`);
            });
        }}
        validationSchema={Yup.object({
          description: Yup.string().required('Required'),
          paymentMethod: Yup.string().required('Required'),
          date: Yup.date().required('Required'),
          products: Yup.array().of(
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
        }) => {
          return (
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
              </div>

              {/* container*/}
              <div className="w-full flex gap-6">
                {/* customer details */}
                <div className="flex w-[40%] h-fit flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4">
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
                    Other information
                  </p>

                  {/* content */}
                  <div className="w-full flex gap-4">
                    {/* description and payment methods */}
                    <div className="flex flex-col w-full gap-3">
                      {/* description */}
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

              {/* total amount and button */}
              <div className="flex flex-col items-start gap-6 pb-6">
                {/* total amount display */}
                <div className="flex justify-between py-4 px-6 bg-[#F8F9FA] rounded-2xl w-full">
                  <p className="text-[#808691] text-base font-normal">
                    Total Amount
                  </p>
                  <p className="text-[#19A97B] text-xl font-normal">{`₦${values.totalAmount.toLocaleString(
                    'en-US'
                  )}`}</p>
                </div>

                <Button
                  loading={isLoading}
                  disabled={!dirty || isSubmitting}
                  click={handleSubmit}
                  title="Create Invoice"
                  iconPosition="right"
                  icon="invoice"
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

export default CreateProductRecord;
