import { ChangeEventHandler, FocusEventHandler } from 'react';
import styles from './amount-input.module.scss';
export interface IAmountInput {
  placeholder: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  disabled?: boolean;
}

const AmountInput = ({
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  disabled,
}: IAmountInput) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.currency}>
          <div className="text-[#565A63]">₦</div>
        </div>
        <input
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          onChange={onChange}
          className={styles.input}
          placeholder={placeholder}
          type={type}
        />
      </div>
    </div>
  );
};

export default AmountInput;
