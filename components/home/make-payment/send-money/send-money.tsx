import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { isEmpty } from '../../../../helpers/is-emtpy';
import { useGetBanksQuery } from '../../../../lib/services/businessApi';
import {
  BankType,
  PaymentDetailTypes,
} from '../../../../pages/dashboard/home/home.types';
import Button from '../../../shared/butttons/button/button';
import FormError from '../../../shared/form-error/form-error';
import Input from '../../../shared/input/input/input';
import Modal from '../../../shared/modal/modal';
import ToggleSelectInput from '../../../shared/toggle-select-input';
import Selectbank from '../select-bank/select-bank';
import styles from './send-money.module.scss';
import VerifyAccountName from './verify-account-name';

const SendMoney: React.FC<any> = ({
  onNextClick,
  bankName,
  bankCode,
  accountNumber,
  accountName,
  amount,
  note,
  setPaymentDetails,
}) => {
  // STATES
  const [isBankModalOpen, setBankModalState] = useState<boolean>(false);
  const [bankList, setBankList] = useState<BankType[]>([]);

  // HANDLERS
  const toggleBankModal = () => {
    setBankModalState(!isBankModalOpen);
  };

  // DATA INITIALIZATION
  const { data: banks, isError, isLoading } = useGetBanksQuery();

  // SIDE EFFECTS
  useEffect(() => {
    if (!isError && !isEmpty(banks)) {
      setBankList(banks.data);
    }
  }, [banks, isError]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        bankName: bankName,
        bankCode: bankCode,
        accountNumber: accountNumber,
        accountName: accountName,
        amount: amount,
        note: note,
      }}
      onSubmit={(values) => {
        console.log(values);

        setPaymentDetails((paymentDetails: PaymentDetailTypes) => ({
          ...paymentDetails,
          amount: values.amount,
          accountNumber: values.accountNumber,
          accountName: values.accountName,
          note: values.note,
          bankName: values.bankName,
          bankCode: values.bankCode,
        }));
        onNextClick();
      }}
      validationSchema={Yup.object({
        amount: Yup.string()
          .matches(/^[0-9]+$/, 'Must be only digits')
          .required('Amount is required'),
        accountNumber: Yup.string()
          .matches(/^[0-9]+$/, 'Must be only digits')
          .min(10)
          .max(10)
          .required(),
        note: Yup.string(),
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
      }) => {
        return (
          <div className="modal">
            {/* Select Bank modal */}
            {isBankModalOpen && (
              <Modal header="Select bank" closeModal={toggleBankModal}>
                <div className="flex flex-col w-full my-4 items-stretch gap-2">
                  <Selectbank
                    banks={bankList}
                    onBankClick={(bank: BankType) => {
                      setFieldValue('bankName', bank.name);
                      setFieldValue('bankCode', bank.code);
                      toggleBankModal();
                    }}
                  />
                </div>
              </Modal>
            )}

            {/* container */}
            <div className={styles.container}>
              <div>
                <div className="form-group">
                  <label>Amount</label>
                  <Input
                    placeholder="Amount"
                    name="amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    type="text"
                    className="currency"
                  />
                  {touched.amount && errors.amount && (
                    <FormError message={errors.amount as string} />
                  )}
                </div>

                <div className="form-group">
                  <label>Bank</label>
                  <ToggleSelectInput
                    disabled={isLoading || isError}
                    onClick={toggleBankModal}
                    value={
                      isLoading
                        ? 'Fetching banks...'
                        : isError
                        ? 'Fetching failed, kindly reload!'
                        : values.bankName || 'Select bank'
                    }
                  />
                </div>
                <div>
                  <label>Account number</label>
                  <Input
                    placeholder="Account number"
                    name="accountNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.accountNumber}
                    type="text"
                    className="currency"
                  />
                  {touched.accountNumber && errors.accountNumber && (
                    <FormError message={errors.accountNumber as string} />
                  )}

                  {values.accountNumber.length === 10 ? (
                    <VerifyAccountName
                      accountName={values.accountName}
                      setValues={setFieldValue}
                      accountNumber={values.accountNumber}
                      bankCode={values.bankCode}
                    />
                  ) : null}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <Input
                    placeholder="Description"
                    name="note"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.note}
                    type="text"
                    className="currency"
                  />
                  {touched.note && errors.note && (
                    <FormError message={errors.note as string} />
                  )}
                </div>
                <div className="mt-auto">
                  <Button
                    disabled={
                      !values.accountName ||
                      !values.bankName ||
                      !values.bankCode
                    }
                    color="btnPrimary"
                    title="Next"
                    type="block"
                    click={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SendMoney;
