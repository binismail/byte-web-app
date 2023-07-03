import ByteIcon from '../../shared/icon/byte.icon';
import QuantityInput from '../../shared/input/quantity-input/quantity-input';
import styles from './update-stock.module.scss';

const UpdateStock: React.FC<any> = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div className="flex flex-space-between">
          <p className="text-strong"></p>
          <div className="flex">
            <ByteIcon onClick={closeModal} icon="close-circle" size="18" />
          </div>
        </div>
        <div className="flex flex-column flex-center  mt-md-2">
          <p className="text-h6"> Update stock</p>
          <p className="text-label">
            How many units do you want to add to your stock?
          </p>
        </div>

        <div>
          <div className="form-group">
            <label>Unit selling price</label>
            <QuantityInput placeholder="12,000.00" type="text" value="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStock;
