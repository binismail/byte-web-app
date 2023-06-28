import ByteIcon from '../../icon/byte.icon';
import styles from './search-input.module.scss';
export interface ISearchInput {
  placeholder: string;
  type: string;
  onChange?: any;
  name?: string;
  value?: string | number;
}

const SearchInput: React.FC<ISearchInput> = ({
  placeholder,
  type,
  onChange,
  name,
  value,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.icon}>
          {' '}
          <ByteIcon icon={'search-normal-1'} size={15} />
        </div>
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={`${styles.input} placeholder:text-sm placeholder:text-[#808691]`}
          placeholder={placeholder}
          type={type}
        />
      </div>
    </div>
  );
};

export default SearchInput;
