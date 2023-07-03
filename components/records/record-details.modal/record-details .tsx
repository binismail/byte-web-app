import ByteIcon from '../../shared/icon/byte.icon';
import styles from './record-details.module.scss';

const RecordDetails: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div className="flex flex-space-between">
          <p className="text-strong">Fife Animashaun</p>
          <div className="flex">
            <div className="mr-sm-2">
              <ByteIcon icon="more" size="18" />
            </div>

            <ByteIcon icon="close-circle" size="18" />
          </div>
        </div>
        <p className="text-h5 mt-0 mb-0 text-success">₦127,271.49</p>
        <hr></hr>
        <div>
          <p className="text-secton-items">Items:</p>
          <div>
            <div className="flex flex-space-between ">
              <div>
                <label className="text-value text-neutral-09">
                  Apple iWatch
                </label>
                <p className="text-label mt-0 text-neutral-06 ">
                  x1 @ ₦127,271.49
                </p>
              </div>
              <p className="text-strong mt-0 ">₦127,271.49</p>
            </div>

            <div className="flex flex-space-between">
              <div>
                <label className="text-value text-neutral-09 ">
                  Lightning charger cable
                </label>
                <p className="text-label mt-0 text-neutral-06">
                  x1 @ ₦127,271.49
                </p>
              </div>
              <p className=" text-strong mt-0">₦127,271.49</p>
            </div>
            <div className="flex flex-space-between ">
              <div>
                <label className="text-value text-neutral-09">
                  61W Macbook Charger
                </label>
                <p className="text-label mt-0 text-neutral-06">
                  x1 @ ₦127,271.49
                </p>
              </div>
              <p className=" text-strong mt-0 ">₦127,271.49</p>
            </div>
            <hr></hr>
            <div className="flex flex-space-between ">
              <div>
                <label className="text-value">Fife Animashaun</label>
                <p className="text-label mt-0 mb-0">0814 112 3456</p>
              </div>
              <ByteIcon
                icon="chevron-right"
                size="18"
                color="var(--primary05)"
              />
            </div>
            <hr></hr>

            <div className="mt-md-1">
              <label className="text-label  ">Description</label>
              <p className="text-label  ">
                {' '}
                <i>No description</i>
              </p>
            </div>

            <div className="mt-md-2">
              <label className="text-label  ">Payment method</label>
              <p className="text-value  text-neutral-09">POS</p>
            </div>

            <div className="mt-md-2">
              <label className="text-label  ">Date</label>
              <p className="text-value  text-neutral-09">
                12th September, 2022
              </p>
            </div>
            <p>
              <a className=" link">See change history</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;
