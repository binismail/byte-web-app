import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useCreateRecordMutation } from '../../../../../lib/services/businessApi';
import { ExpenseRecordDetailsType } from '../../../../../pages/dashboard/tools/record/records.types';
import ExpenseServiceWidget from '../../../../records/expense/expense-service-widget';
import Button from '../../../../shared/butttons/button/button';
import FormError from '../../../../shared/form-error/form-error';
import Input from '../../../../shared/input/input/input';
import TextArea from '../../../../shared/textarea/textarea';

const CreateServiceRecord = () => {
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
          type: 'expense',
          dealType: 'service',
          date: '2023-01-01',
          totalAmount: 0,
          services: [
            {
              name: '',
              cost: 0,
            },
          ],
        }}
        onSubmit={(values) => {
          const expenseRecordData: ExpenseRecordDetailsType = { ...values };
          createRecord(expenseRecordData)
            .unwrap()
            .then(() => {
              toast.success(`Expense record created successfully!`);
              router.replace('/dashboard/tools/record?recordType=2');
            })
            .catch((error: any) => {
              toast.error(error?.data?.message || `Couldn't create record`);
            });
        }}
        validationSchema={Yup.object({
          description: Yup.string().required('Required'),
          date: Yup.date().required('Required'),
          services: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required('Required'),
              cost: Yup.number()
                .min(5, "can't be less than ₦5")
                .required('Required'),
            })
          ),
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
              {/* service details */}
              <div className="w-full flex-col flex gap-6">
                <FieldArray
                  name="services"
                  render={({ push, remove }) => (
                    <ExpenseServiceWidget
                      values={values}
                      push={push}
                      remove={remove}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  )}
                />
              </div>

              {/* container*/}
              <div className="flex w-full h-fit flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4">
                {/* title */}
                <p className="w-full p-4 border-b border-[#D0D6DB] text-sm text-[#5864AE]">
                  Other information
                </p>

                {/* content */}
                <div className="w-full grid grid-cols-3 gap-4">
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

export default CreateServiceRecord;
