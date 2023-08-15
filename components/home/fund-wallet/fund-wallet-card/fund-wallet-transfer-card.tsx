import { Formik } from 'formik';
import { Card, Lock1 } from 'iconsax-react';
import * as Yup from 'yup';
import { FundWalletDetailTypes } from '../../../../pages/dashboard/home/home.types';
import Button from '../../../shared/butttons/button/button';
import FormError from '../../../shared/form-error/form-error';
import Input from '../../../shared/input/input/input';

const FundWalletCard: React.FC<any> = ({
  amount,
  setFundWalletDetails,
  onContinueClick,
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        amount: amount,
      }}
      onSubmit={(values) => {
        onContinueClick();
        setFundWalletDetails((prevState: FundWalletDetailTypes) => ({
          ...prevState,
          creditAmount: values.amount,
        }));
      }}
      validationSchema={Yup.object({
        amount: Yup.string()
          .matches(/^[0-9]+$/, 'Must be only digits')
          .required('Amount is required'),
      })}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <div className="flex flex-col w-full mt-8 mb-4 p-5">
            {/* container */}
            <div className="flex w-full flex-col gap-7 mt-2">
              {/* icon */}
              <div className="w-full flex flex-col items-center">
                <span className="bg-[#EFF1FA] inline-flex items-center justify-center rounded-[50%] w-[72px] h-[72px]">
                  <Card size="28" color="#6A78D1" variant="Bold" />
                </span>
              </div>

              {/* title */}
              <p className="w-full text-[#15171F] font-normal text-sm">
                How much would you like to fund your Byte Pocket with?
              </p>

              {/* data fields */}
              <div className="flex w-full flex-col gap-5">
                <label htmlFor="amount" className="flex w-full gap-2 flex-col">
                  {/* title */}
                  <span className="text-sm font-normal text-[#30333B]">
                    Amount
                  </span>

                  {/* input */}
                  <Input
                    name="amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    placeholder="Amount"
                    type="text"
                  />
                  {touched.amount && errors.amount && (
                    <FormError message={errors.amount as string} />
                  )}
                </label>

                {/* button */}
                <div className="flex w-full flex-col items-stretch">
                  <Button
                    click={handleSubmit}
                    color="btnPrimary"
                    title="Continue"
                    type="block"
                  />
                </div>
              </div>

              {/* extra information */}
              <div className="flex w-full gap-5 items-center">
                {/* icon */}
                <span className="bg-[#F4E1D4] inline-flex items-center justify-center rounded-xl w-[35px] h-[35px]">
                  <Lock1 size="18" color="#6A78D1" variant="TwoTone" />
                </span>

                <p className="w-[70%] font-normal text-sm text-[#565A63]">
                  Your card information is protected by the best security. We do
                  not have access to it.
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default FundWalletCard;
