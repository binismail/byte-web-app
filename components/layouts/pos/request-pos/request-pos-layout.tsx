import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { useRequestPosMutation } from '../../../../lib/services/businessApi';
import { PaymentDetailTypes } from '../../../../pages/dashboard/home/home.types';
import TransactionPin from '../../../home/make-payment/transaction-pin/transaction-pin';
import Modal from '../../../shared/modal/modal';
import PosForm from './pos-form/pos-form';
import RequestPos from './request-pos';
import SelectPos from './select-pos/select-pos';

type RequestPosLayoutTypes = {
  isVisible: boolean;
  setSuccessModal: Dispatch<SetStateAction<boolean>>;
  setErrorModal: Dispatch<SetStateAction<boolean>>;
  setVisibility: Dispatch<SetStateAction<boolean>>;
};

const RequestPosLayout = ({
  isVisible,
  setSuccessModal,
  setErrorModal,
  setVisibility,
}: RequestPosLayoutTypes) => {
  // STATES
  const [sendFundSteps, setSendFundStep] = useState<number>(1);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailTypes>({
    bankName: '',
    bankCode: '',
    accountNumber: '',
    accountName: '',
    amount: '',
    note: '',
  });

  // HOOKS
  // ===== make payment =======
  const [requestPos, { isLoading: isSendingLoading }] = useRequestPosMutation();

  // HANDLERS
  // ===== fund wallet =======
  const clearPaymentDetails = () => {
    setPaymentDetails({
      bankName: '',
      bankCode: '',
      accountNumber: '',
      accountName: '',
      amount: '',
      note: '',
    });
  };
  const handleRequestPos = (pin: string) => {
    requestPos({
      transPin: pin,
      bankName: paymentDetails.bankName,
      bankCode: paymentDetails.bankCode,
      accountNumber: paymentDetails.accountNumber,
      accountName: paymentDetails.accountName,
      amount: +paymentDetails.amount,
      note: paymentDetails.note,
    })
      .unwrap()
      // success payment
      .then((payload: any) => {
        console.log(payload);
        setVisibility(false);
        setSendFundStep(1);
        clearPaymentDetails();
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
        }, 5000);
      })
      // failed payment
      .catch((error: any) => {
        console.log(error);
        setVisibility(false);
        setSendFundStep(1);
        clearPaymentDetails();
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
        }, 5000);
      });
  };

  // DATA INITIALIZATION
  // ===== make payment data =====
  const ModalSteps: ReactElement[] = [
    <RequestPos onClickLeft={() => setSendFundStep(2)} key={1} />,
    <SelectPos
      bankName={paymentDetails.bankName}
      bankCode={paymentDetails.bankCode}
      accountNumber={paymentDetails.accountNumber}
      accountName={paymentDetails.accountName}
      amount={paymentDetails.amount}
      note={paymentDetails.note}
      setPaymentDetails={setPaymentDetails}
      key={2}
      onNextClick={() => setSendFundStep(3)}
    />,
    <PosForm
      key={3}
      onSendClick={() => setSendFundStep(4)}
      amount={paymentDetails.amount}
      accountName={paymentDetails.accountName}
      bankName={paymentDetails.bankName}
      description={paymentDetails.note}
    />,
    <TransactionPin
      loading={isSendingLoading}
      onSendClick={handleRequestPos}
      key={4}
    />,
  ];
  const modalHeaders: string[] = ['', '', '', ''];

  return (
    <>
      {isVisible && (
        <Modal
          header={modalHeaders[sendFundSteps - 1]}
          closeModal={() => {
            clearPaymentDetails();
            setVisibility(false);
            setSendFundStep(1);
          }}
          width_styling={'90vw'}
        >
          <div className="flex flex-col w-full my-4 items-stretch gap-2">
            {ModalSteps[sendFundSteps - 1]}
          </div>
        </Modal>
      )}
    </>
  );
};

export default RequestPosLayout;
