import Checkbox from '../../../../../components/shared/checkbox/checkbox';
import Input from '../../../../../components/shared/input/input/input';
import styles from './sales-record-service-form-group.module.scss';

const SalesRecordServiceFormGroup: React.FC<any> = () => {
  return (
    <div className={styles.container}>
      <Checkbox className="" label="Add product from inventory" />
      <div className="flex gap-1 form-group">
        <div className="input-wrapper">
          <label>Service name</label>
          <Input placeholder="Drop down" type="dropdown" value="1" />
        </div>
        <div className="input-wrapper">
          <label>Cost</label>
          <Input placeholder="231111" type="text" value="1" />
        </div>
      </div>
    </div>
  );
};

export default SalesRecordServiceFormGroup;
