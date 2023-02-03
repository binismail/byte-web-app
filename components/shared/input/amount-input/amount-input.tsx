import styles from './amount-input.module.scss';
export interface IAmountInput {
  placeholder: string;
  type: string;
  onChange?: any;
  value: string;
}

const AmountInput: React.FC<IAmountInput> = ({ placeholder, type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.currency}>
          <div>₦</div>
        </div>
        <input className={styles.input} placeholder={placeholder} type={type} />
      </div>
    </div>
  );
};

export default AmountInput;
