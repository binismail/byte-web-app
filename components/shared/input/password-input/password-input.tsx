import { useState } from 'react';
import ByteIcon from '../../icon/byte.icon';
import styles from './password-input.module.scss';
export interface IPasswordInput {
  placeholder: string;
  onChange?: any;
  value: string;
}

const PasswordInput: React.FC<IPasswordInput> = ({ placeholder }) => {
  const [show, setShowPassword] = useState(true);
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
