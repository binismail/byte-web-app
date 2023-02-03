import styles from './Checkbox.module.scss';
export interface ICheckbox {
  label: string;
  className: string;
}

const Checkbox: React.FC<ICheckbox> = ({ label, className }) => {
  return (
    <div>
      <div className="flex-center space">
        <input type={'checkbox'} className={className} />
        <label className={styles.label}>{label}</label>
      </div>
    </div>
  );
};

export default Checkbox;
