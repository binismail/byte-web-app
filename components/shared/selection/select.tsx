import styles from './select.module.scss';
export interface IInput {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: any;
  list: { value: string; label: string }[];
}

const Select: React.FC<IInput> = ({ placeholder, list }) => {
  return (
    <select className={styles.input} placeholder={placeholder}>
      {list.map((res, i) => (
        <option key={i} value={res.value}>{res.label}</option>
      ))}
    </select>
  );
};

export default Select;
