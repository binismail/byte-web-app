import ByteIcon from '../../icon/byte.icon';
import styles from './search-input.module.scss';
export interface ISearchInput {
  placeholder: string;
  type: string;
  onChange?: any;
}

const SearchInput: React.FC<ISearchInput> = ({ placeholder, type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.icon}>
          {' '}
          <ByteIcon icon={'search-normal-1'} size={15} />
        </div>
        <input className={styles.input} placeholder={placeholder} type={type} />
      </div>
    </div>
  );
};

export default SearchInput;
