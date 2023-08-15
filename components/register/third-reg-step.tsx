import { useEffect, useState } from 'react';
import PinInput from 'react-pin-input';
import { toast } from 'react-toastify';
import useStorage from '../../hooks/useStorage';
import {
  useSendOTPMutation,
  useVerifyNumberMutation,
} from '../../lib/services/businessApi';
import { ThirdStepProps } from '../../pages/auth/register/register.types';
import Button from '../shared/butttons/button/button';
import SuccessModal from '../shared/modal/components/success/success.modal';
import Modal from '../shared/modal/modal';

const ThirdRegStep = ({
  values,
  setProgress,
  handleSubmit,
  isLoading: isRegisterLoading,
}: ThirdStepProps) => {
  // STATES
  const [minutes, setMinutes] = useState<number>(9);
  const [seconds, setSeconds] = useState<number>(59);
  const [otpData, setOtpData] = useState<{
    otpId: string;
    pin: string;
  }>({
    otpId: '',
    pin: '',
  });
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useState(false);

  // DATA INITIALIZATION
  const [sendOtp, { isLoading: resendOtpLoading }] = useSendOTPMutation();
  const [verifyNumber, { isLoading: isVerifyNumberLoading }] =
    useVerifyNumberMutation();
  const { getItem, setItem } = useStorage();

  // SIDE EFFECTS
  useEffect(() => {
    const id = getItem('id', 'session');
    setOtpData({
      ...otpData,
      otpId: id,
    });
  }, []);

  //   handle otp countdown
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  //   HANDLERS
  const resendOTP = () => {
    sendOtp({
      phone: values.phone,
    })
      .unwrap()
      .then((data) => {
        setItem('id', data?.data?.pinId, 'session');
        setMinutes(9);
        setSeconds(59);
        toast.success(data?.message || 'Code sent successfully!');
      })
      .catch((error) => {
        toast.error(error?.data?.message || 'Failed to send OTP!');
      });
  };

  // validate otp
  const handleValidateNumber = () => {
    verifyNumber({
      pin: otpData.pin,
      pinId: otpData.otpId,
    })
      .unwrap()
      .then(() => {
        setIsVerifiedSuccess(true);
      })
      .catch((error) => {
        toast.error(error?.data?.message || 'Incorrect OTP!');
      });
  };

  return (
    <>
      {isVerifiedSuccess && (
        <Modal header={''}>
          <SuccessModal
            buttonLoading={isRegisterLoading}
            buttonOnClick={handleSubmit}
            buttonTitle="Continue"
            buttonColor="btnLight"
            message="Well done! Your phone number has been 
            successfully verified."
          />
        </Modal>
      )}

      <div className="form-group">
        <PinInput
          length={6}
          initialValue=""
          onChange={(value) => {
            setOtpData({ ...otpData, pin: value });
          }}
          type="numeric"
          inputMode="number"
          style={{ padding: '5px', margin: '5px', display: 'flex' }}
          inputStyle={{
            border: 'none',
            borderBottom: '1px solid  #000000',
            fontWeight: '700',
            fontSize: '34px',
            lineHeight: '41px',
          }}
          inputFocusStyle={{ borderBottom: '1px solid  green' }}
          onComplete={() => {}}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        {seconds === 0 && minutes === 0 ? (
          <p onClick={() => resendOTP()} className="hint text-center mt-2">
            {resendOtpLoading ? 'resending...' : 'Resend'}
          </p>
        ) : (
          <p className="hint text-center mt-2">
            Resend code if it doesn’t arrive in{' '}
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds} seconds
          </p>
        )}
      </div>

      {/* Button */}
      <div className="flex w-full flex-col items-stretch mt-16 mb-6 gap-2">
        <Button
          disabled={isVerifyNumberLoading}
          loading={isVerifyNumberLoading}
          click={handleValidateNumber}
          color="btnPrimary"
          title="Validate"
        />
      </div>
      <p onClick={() => setProgress(2)} className="link text-center">
        Entered a wrong number?
      </p>
    </>
  );
};

export default ThirdRegStep;
