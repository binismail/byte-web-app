import ByteIcon from '../shared/icon/byte.icon';
import styles from './Filter.module.scss';
export interface IFilter {
  placeholder: string;
  value: string;
  onChange?: any;
}

const Filter: React.FC<IFilter> = ({ value }) => {
  return (
    <div className={styles.filter}>
      <div className="flex">
        <span className="mr-sm-2">
          <ByteIcon icon={'sort'} size={18} />
        </span>
        <div> {value}</div>
      </div>
    </div>
  );
};

export default Filter;
