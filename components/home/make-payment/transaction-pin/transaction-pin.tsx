import { useState } from 'react';
import PinInput from 'react-pin-input';
import Button from '../../../shared/butttons/button/button';

type Props = {
  onSendClick: any;
  loading: boolean;
};

const TransactionPin = ({ onSendClick, loading }: Props) => {
  // STATES
  const [pin, setPin] = useState<string>('');

  return (
    <div className="flex flex-col w-full items-stretch gap-3 pt-6 px-3">
      <div className="flex w-full flex-col gap-1">
        <p className="text-h6 text-center">Enter pin</p>
        <p className="text-secton-content text-center">
          Please enter your transaction pin
        </p>
      </div>
      <div className=" flex flex-justify-center">
        <PinInput
          secret
          length={4}
          initialValue=""
          onChange={(value) => {
            setPin(value);
          }}
          disabled={loading}
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
      </div>

      <div className="form-group mb-2">
        <Button
          disabled={pin.length !== 4 || loading}
          loading={loading}
          color="btnPrimary"
          title="Send"
          type="block"
          click={() => onSendClick(pin)}
        />
      </div>
    </div>
  );
};

export default TransactionPin;
