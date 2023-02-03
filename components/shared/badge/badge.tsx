import styles from './badge.module.scss';
export interface ICheckbox {
  label: string;
  color: string;
}

const Badge: React.FC<ICheckbox> = ({ label, color }) => {
  return (
    <div>
      <p className={`${styles.badge} + ${color}`}>{label}</p>
    </div>
  );
};

export default Badge;
