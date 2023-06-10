import { FocusEventHandler, useState } from 'react';
import ByteIcon from '../../icon/byte.icon';
import styles from './password-input.module.scss';
export interface IPasswordInput {
  placeholder: string;
  onChange?: any;
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  className?: any;
}

const PasswordInput: React.FC<IPasswordInput> = ({
  placeholder,
  onChange,
  onBlur,
  onFocus,
  name,
  value,
}) => {
  const [show, setShowPassword] = useState(false);
  const showPassword = () => {
    setShowPassword(!show);
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type={show ? 'text' : 'password'}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          onFocus={onFocus}
        />
        <div className={styles.iconContainer} onClick={showPassword}>
          {show ? (
            <ByteIcon icon="eye" size={20} />
          ) : (
            <ByteIcon icon="eye-slash" size={20} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
