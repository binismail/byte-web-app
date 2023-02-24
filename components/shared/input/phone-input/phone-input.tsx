import styles from './phone-input.module.scss';
export interface IPhoneInput {
  placeholder: string;
  type: string;
  onChange?: any;
  value: string;
}

const PhoneInput: React.FC<IPhoneInput> = ({ placeholder, type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.currency}>
          <div>+234</div>
        </div>
        <input className={styles.input} placeholder={placeholder} type={type} />
      </div>
    </div>
  );
};

export default PhoneInput;
