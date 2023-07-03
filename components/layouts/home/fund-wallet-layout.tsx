import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { selectUserDetails } from '../../../lib/redux/userDetailsSlice/userDetailsSlice';
import { useFundWalletMutation } from '../../../lib/services/businessApi';
import FundWallet from '../../../pages/dashboard/home/fund-wallet/fund-wallet';
import { FundWalletDetailTypes } from '../../../pages/dashboard/home/home.types';
import ConfirmWalletFund from '../../home/fund-wallet/confirm-wallet-fund/confirm-wallet-fund';
import FundWalletBank from '../../home/fund-wallet/fund-wallet-bank/fund-wallet-card ';
import FundWalletCard from '../../home/fund-wallet/fund-wallet-card/fund-wallet-transfer-card';
import TransactionPin from '../../home/make-payment/transaction-pin/transaction-pin';
import Modal from '../../shared/modal/modal';

type FundWalletLayoutTypes = {
  isVisible: boolean;
  setSuccessModal: Dispatch<SetStateAction<boolean>>;
  setErrorModal: Dispatch<SetStateAction<boolean>>;
  setVisibility: Dispatch<SetStateAction<boolean>>;
};

const FundWalletLayout = ({
  isVisible,
  setSuccessModal,
  setErrorModal,
  setVisibility,
}: FundWalletLayoutTypes) => {
  // STATES
  const [fundWalletModalStep, setFundWalletSteps] = useState<number>(1);
  const [fundWalletDetails, setFundWalletDetails] =
    useState<FundWalletDetailTypes>({
      transPin: '',
      cardChargeAmount: 0,
      creditAmount: 0,
      cardToken: '',
    });

  // HOOKS
  const [fundWalletStart, { isLoading }] = useFundWalletMutation();

  // HANDLERS
  const clearFundWalletDetails = () => {
    setFundWalletDetails({
      transPin: '',
      cardChargeAmount: 0,
      creditAmount: 0,
      cardToken: '',
    });
  };
  const restartProgress = () => {
    setVisibility(false);
    setFundWalletSteps(1);
    clearFundWalletDetails();
  };
  const showSuccess = () => {
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 5000);
  };
  const showError = () => {
    setErrorModal(true);
    setTimeout(() => {
      setErrorModal(false);
    }, 5000);
  };
  const handleFundWallet = (pin: string) => {
    handleFlutterPayment({
      callback: (response) => {
        if (response.status === 'successful' && response.currency === 'NGN') {
          console.log('Success');
          // fund wallet api call
          fundWalletStart({
            transPin: pin,
            cardChargeAmount: +fundWalletDetails.cardChargeAmount,
            creditAmount: +fundWalletDetails.creditAmount,
            cardToken: response.flw_ref,
          })
            .unwrap()
            .then((payload: any) => {
              console.log(payload);
              restartProgress();
              showSuccess();
            })
            .catch((error: any) => {
              console.log(error);
              restartProgress();
              showError();
            });
        } else {
          console.log('Failed');
          restartProgress();
          showError();
        }
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
  };

  // DATA INITIALIZATION
  const {
    administrator: { firstName, lastName, phone, email },
  } = useAppSelector(selectUserDetails);
  const fundWalletSteps: ReactElement[] = [
    <FundWallet
      key={1}
      onClickLeft={() => setFundWalletSteps(2)}
      onClickRight={() => setFundWalletSteps(3)}
    />,
    <FundWalletBank key={2} />,
    <FundWalletCard
      amount={fundWalletDetails.creditAmount || ''}
      setFundWalletDetails={setFundWalletDetails}
      onContinueClick={() => {
        setFundWalletSteps(4);
      }}
      key={3}
    />,
    <ConfirmWalletFund
      onProceedClick={(chargedAmount: number) => {
        setFundWalletDetails({
          ...fundWalletDetails,
          cardChargeAmount: chargedAmount,
        });
        setFundWalletSteps(5);
      }}
      amount={fundWalletDetails.creditAmount}
      key={4}
    />,
    <div key={5} className="flex flex-col w-full my-4 items-stretch gap-2">
      <TransactionPin loading={isLoading} onSendClick={handleFundWallet} />
    </div>,
  ];
  const fundWalletHeaders: string[] = [
    'Fund wallet',
    'Fund by bank transfer',
    'Fund by bank card',
    'Confirm wallet fund',
    'Transaction pin',
  ];

  //   FLUTTERWAVE CONFIGURATION
  const config = {
    public_key: `${process.env.NEXT_PUBLIC_FLUTTERWAVE_TEST_KEY}`,
    tx_ref: `${Date.now()}`,
    amount: Math.max(
      fundWalletDetails.creditAmount,
      fundWalletDetails.cardChargeAmount
    ),
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phone_number: phone,
      name: `${firstName} ${lastName}`,
    },
    customizations: {
      title: 'Fund by card wallet',
      description: 'Fund your byte wallet',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <>
      {isVisible && (
        <Modal
          header={fundWalletHeaders[fundWalletModalStep - 1]}
          closeModal={() => {
            clearFundWalletDetails();
            setVisibility(false);
            setFundWalletSteps(1);
          }}
        >
          {fundWalletSteps[fundWalletModalStep - 1]}
        </Modal>
      )}
    </>
  );
};

export default FundWalletLayout;
