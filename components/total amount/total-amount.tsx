import styles from './total-amount.module.scss';
export interface ITotalAmount {
  value: string;
}

const TotalAmount: React.FC<ITotalAmount> = ({ value }) => {
  return (
    <div className={styles.container}>
      <p className="text-body-lg-bold">Total Amount</p>
      <p className="text-h6 text-success">{value}</p>
    </div>
  );
};

export default TotalAmount;
