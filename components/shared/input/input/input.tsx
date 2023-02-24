import styles from './Input.module.scss';
export interface IInput {
  placeholder: string;
  type: string;
  value?: string;
  onChange?: any;
  className?:any;
}

const Input: React.FC<IInput> = ({ placeholder, type }) => {
  return (
    <input className={styles.input} placeholder={placeholder} type={type} />
  );
};

export default Input;
