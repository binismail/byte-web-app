import styles from './Input.module.scss';
export interface IInput {
  placeholder: string;
  type: string;
  value?: string;
  onChange?: any;
  className?:any;
}

const Input: React.FC<IInput> = ({ placeholder, type, onChange }) => {
  return (
    <input className={styles.input} placeholder={placeholder} type={type} onChange={onChange}/>
  );
};

export default Input;
