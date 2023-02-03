import Button from '../../../../../components/shared/butttons/button/button';
import ByteIcon from '../../../../../components/shared/icon/byte.icon';
import IconShadow from '../../../../../components/shared/icon/icon-shadow';
import styles from './inventory-details.module.scss';

const InventoryDetails: React.FC<any> = ({ closeModal }) => {
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
        <div className="flex flex-space-between mt-md-2">
          <IconShadow
            icon="d-cube-scan"
            color="var(--neutral06)"
            size="16"
            className="grey medium"
          />
          <p className={styles.successHighlight}> In stock</p>
        </div>

        <div>
          <div>
            <div className="mt-md-2">
              <label className="text-label ">Product name</label>
              <p className="text-value  text-neutral-09 mt-0">
                {' '}
                iPhone 13 screen guard 9H strong glass
              </p>
            </div>

            <div className="mt-md-2">
              <label className="text-label  ">Unit cost price</label>
              <p className="text-value  text-neutral-09 mt-0">#5,099.99</p>
            </div>

            <div className="mt-md-2">
              <label className="text-label  ">Unit selling price</label>
              <p className="text-value  text-neutral-09 mt-0">₦7,000.00</p>
            </div>

            <div className="mt-md-2">
              <label className="text-label">
                Quantity in stock / Quantity last stocked
              </label>
              <p className="text-value  text-neutral-09 mt-0">
                <span className="text-success">78</span>/<span>100</span>
              </p>
            </div>
            <div className="mt-md-2">
              <label className="text-label">Category</label>
              <p className="text-value  text-neutral-09 mt-0">
                Phone accessories
              </p>
            </div>
            <div className="mt-md-2 mb-md-3">
              <label className="text-label">Description</label>
              <p className="text-value  text-neutral-09 mt-0">
                The glass of this product is twice as strong as others and will
                protect iPhones very well.
              </p>
            </div>
            <div>
              <Button title="Update stock" color="btnLight" type="block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;
