import styles from './quantity-input.module.scss';
export interface IQuantityInput {
  placeholder: string;
  type: string;
  onChange?: any;
  value: string;
}

const QuantityInput: React.FC<IQuantityInput> = ({ placeholder, type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.minus}>
          <div>-</div>
        </div>
        <input className={styles.input} placeholder={placeholder} type={type} />
        <div className={styles.plus}>
          <div>+</div>
        </div>
      </div>
    </div>
  );
};

export default QuantityInput;
