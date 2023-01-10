import styles from './Checkbox.module.scss';
export interface ICheckbox {
  label: string;
}

const Checkbox: React.FC<ICheckbox> = ({ label }) => {
  return (
    <div className="flex-center space">
      <input type={'checkbox'} />
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default Checkbox;
