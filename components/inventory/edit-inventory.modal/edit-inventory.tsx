import ByteIcon from '../../shared/icon/byte.icon';
import IconShadow from '../../shared/icon/icon-shadow';
import AmountInput from '../../shared/input/amount-input/amount-input';
import Input from '../../shared/input/input/input';
import TextArea from '../../shared/textarea/textarea';
import styles from './edit-inventory.module.scss';

const EditInventory: React.FC<any> = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div className="flex flex-space-between">
          <p className="text-strong">#216262</p>
          <div className="flex">
            <div className="mr-sm-2">
              <ByteIcon icon="more" size="18" />
            </div>
            <ByteIcon onClick={closeModal} icon="close-circle" size="18" />
          </div>
        </div>
        <div className="flex flex-column flex-center  mt-md-2">
          <IconShadow
            icon="d-cube-scan"
            color="var(--neutral06)"
            size="16"
            className="grey medium"
          />
          <p className="link"> Change profile photo</p>
        </div>

        <div>
          <div>
            <div className="form-group">
              <label>Product name</label>
              <Input
                placeholder="iPhone 13 screen guard 9H strong glass"
                type="text"
                value="1"
              />
            </div>
            <div className="form-group">
              <label>Unit cost price</label>
              <AmountInput placeholder="12,000.00" type="text" value="" />
            </div>
            <div className="form-group">
              <label>Unit selling price</label>
              <AmountInput placeholder="12,000.00" type="text" value="" />
            </div>

            <div className="form-group">
              <label>Quantity in stock</label>
              <Input placeholder="12" type="text" value="64" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <Input placeholder="Phone accessories" type="text" value="1" />
            </div>
            <TextArea
              rows={5}
              placeholder="The glass of this product is twice as strong as others and will protect iPhones very well."
              value="The glass of this product is twice as strong as others and will protect iPhones very well."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;
