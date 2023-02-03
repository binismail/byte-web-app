import Checkbox from '../../../../../components/shared/checkbox/checkbox';
import CheckboxSpecial from '../../../../../components/shared/checkboxSpecial/checkbox-special';
import Input from '../../../../../components/shared/input/input/input';
import styles from './sales-record-product-form-group.module.scss';

const SalesRecordProductFormGroup: React.FC<any> = ({ type }) => {
  return (
    <div className={styles.container}>
      <Checkbox className='' label="Add product from inventory" />
      <div className="flex gap-1 form-group">
        <div className="input-wrapper">
          <label>{type === 'expense' ? 'Item name' : 'Product name'}</label>
          <Input placeholder="Drop down" type="dropdown" value="1" />
        </div>
        <div className="input-wrapper">
          <label>{type === 'expense' ? 'Cost per unit' : 'Unit price'}</label>

          <Input placeholder="231111" type="text" value="1" />
        </div>
        <div className="input-wrapper">
          <label>Quantity</label>
          <Input placeholder="Quantiy" type="text" value="1" />
        </div>
      </div>

      {type === 'expense' ? (
        <div className="flex flex-space-between">
          <div className="w-33">
            <div className="input-wrapper ">
              <label>Quantity</label>
              <Input placeholder="Quantiy" type="text" value="1" />
            </div>
          </div>
          <div className="w-75">
            <div className="float-right">
              {' '}
              <CheckboxSpecial label="" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SalesRecordProductFormGroup;
