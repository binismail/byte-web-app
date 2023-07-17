import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import DashboardLayout from '../../../../../../components/layouts/dashboard-layout';
import Layout from '../../../../../../components/layouts/layout';
import ExpenseProductWidget from '../../../../../../components/records/expense/expense-product-widget';
import ExpenseServiceWidget from '../../../../../../components/records/expense/expense-service-widget';
import Button from '../../../../../../components/shared/butttons/button/button';
import FormError from '../../../../../../components/shared/form-error/form-error';
import Input from '../../../../../../components/shared/input/input/input';
import LoadingState from '../../../../../../components/shared/loading-state';
import TextArea from '../../../../../../components/shared/textarea/textarea';
import { isEmpty } from '../../../../../../helpers/is-emtpy';
import {
  useGetSingleRecordQuery,
  useUpdateRecordMutation,
} from '../../../../../../lib/services/businessApi';
import { ExpenseRecordDetailsType, RecordProduct } from '../../records.types';

const EditExpenseRecord = () => {
  // STATES
  const [singleExpenseRecord, setSingleExpenseRecord] =
    useState<ExpenseRecordDetailsType | null>(null);
  const [isService, setIsService] = useState(false);

  // DATA INITIALIZATION
  const router = useRouter();
  const recordId = router.query.recordId;

  // HOOKS
  const {
    data,
    isLoading: getExpenseRecordLoading,
    isSuccess,
  } = useGetSingleRecordQuery(recordId as string, {
    refetchOnMountOrArgChange: true,
  });
  const [upateExpenseRecord, { isLoading: updateRecordLoading }] =
    useUpdateRecordMutation();

  // SIDE EFFECTS
  useEffect(() => {
    if (isSuccess && !isEmpty(data?.data) && data?.data !== null) {
      const expenseRecordDetail: ExpenseRecordDetailsType = data?.data;
      setSingleExpenseRecord(expenseRecordDetail);
      setIsService(!isEmpty(expenseRecordDetail.services));
    }
  }, [isSuccess, data]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      {getExpenseRecordLoading ? (
        <LoadingState heightTailwind="h-[70vh]" />
      ) : !isEmpty(singleExpenseRecord) && singleExpenseRecord != null ? (
        <Formik
          enableReinitialize
          initialValues={{
            description: singleExpenseRecord.description,
            type: singleExpenseRecord.type,
            dealType: singleExpenseRecord.dealType,
            expenseCategory: singleExpenseRecord.expenseCategory,
            date: singleExpenseRecord.date,
            totalAmount: singleExpenseRecord.totalAmount,
            [isService ? 'services' : 'products']: isService
              ? singleExpenseRecord?.services?.map(
                  ({ _id, ...services }) => services
                )
              : singleExpenseRecord?.products?.map(
                  ({ _id, ...products }) => products
                ),
          }}
          onSubmit={(values) => {
            // destructure value
            const { expenseCategory, ...expenseRecord } = values;
            const formData: ExpenseRecordDetailsType = {
              ...expenseRecord,
              ...(values.expenseCategory &&
                values.expenseCategory !== undefined && {
                  expenseCategory: values.expenseCategory,
                }),
            };

            // make request
            upateExpenseRecord({
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
              description: Yup.string().required('Required'),
              expenseCategory: Yup.string()
                .nullable()
                .notRequired()
                .when('expenseCategory', {
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
            },
            [['expenseCategory', 'expenseCategory']]
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
                  ) : (
                    <FieldArray
                      name="products"
                      render={({ push, remove, replace }) => (
                        <>
                          {values?.products !== undefined &&
                            (values?.products as RecordProduct[]).map(
                              (product, index) => (
                                <ExpenseProductWidget
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

                {/* other information */}
                <div className="flex w-full h-fit flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4">
                  {/* title */}
                  <p className="w-full p-4 border-b border-[#D0D6DB] text-sm text-[#5864AE]">
                    Other information
                  </p>

                  {/* content */}
                  <div className="w-full grid grid-cols-3 gap-4">
                    {/* category */}
                    {values.expenseCategory ? (
                      <label className="w-full flex flex-col gap-2">
                        <span className="text-sm text-[#30333B] font-normal">
                          Category
                        </span>
                        <Input
                          name="expenseCategory"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.expenseCategory}
                          placeholder="Enter category"
                          type="text"
                        />
                        {touched.expenseCategory && errors.expenseCategory && (
                          <FormError message={errors.expenseCategory || ''} />
                        )}
                      </label>
                    ) : null}

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
                    loading={updateRecordLoading}
                    disabled={!dirty || updateRecordLoading}
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

EditExpenseRecord.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Edit expense records">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default EditExpenseRecord;
