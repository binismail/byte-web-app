import { FocusEventHandler } from 'react';
import styles from './phone-input.module.scss';
export interface IPhoneInput {
  placeholder: string;
  type: string;
  onChange?: any;
  value: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  className?: any;
  readOnly?: boolean;
}

const PhoneInput: React.FC<IPhoneInput> = ({
  placeholder,
  type,
  onChange,
  onBlur,
  onFocus,
  name,
  value,
  readOnly,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.currency}>
          <div>+234</div>
        </div>
        <input
          readOnly={readOnly}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
