import { FocusEventHandler } from 'react';
import styles from './Input.module.scss';
export interface IInput {
  placeholder: string;
  type: string;
  value?: string | number;
  onChange?: any;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  className?: any;
  readOnly?: boolean;
  disabled?: boolean;
}

const Input: React.FC<IInput> = ({
  placeholder,
  type,
  onChange,
  onBlur,
  onFocus,
  name,
  value,
  readOnly,
  disabled,
}) => {
  return (
    <input
      disabled={disabled}
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
  );
};

export default Input;
