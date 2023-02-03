import Avatar from '../../../../../components/shared/avatar/avatar';
import Badge from '../../../../../components/shared/badge/badge';
import ByteIcon from '../../../../../components/shared/icon/byte.icon';
import styles from './invoice-detail.module.scss';
import profile from '../../../../../public/image/profile.jpg';

const InvoiceDetail: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div className="flex flex-space-between flex-align-center">
          <div className="flex">
            <div className="mr-sm-2">
              <ByteIcon icon="close-circle" size="18" />
            </div>

            <ByteIcon icon="more" size="18" />
          </div>
          <p className="text-strong">#1029324</p>
        </div>

        <div className={styles.cardByte}>
          <div className="flex flex-space-between">
            <div>
              <p className={`${styles.amount} + weight-400`}>Amount due</p>
              <p className="text-h5 text-white mt-0">₦127,271.49</p>
            </div>
            <Badge label="Unpaid" color="warning" />
          </div>
          <div className={styles.divider}></div>
          <div className="flex flex-space-between flex-align-center mt-md-1 ">
            <div className="flex flex-align-center">
              <div>
                <Avatar src={profile} size="40px" alt="profile" />
              </div>

              <div>
                <label className="text-value text-white">Fife Animashaun</label>
                <p className="text-label mt-0 mb-0 text-primary-01">
                  0814 112 3456
                </p>
              </div>
            </div>
            <ByteIcon icon="arrow-right-3" size="18" color="var(--white)" />
          </div>
        </div>
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
              <p className=" text-value text-neutral-08 mt-0 ">₦127,271.49</p>
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
              <p className="text-value text-neutral-08 mt-0">₦127,271.49</p>
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
              <p className="text-value text-neutral-08 mt-0 ">₦127,271.49</p>
            </div>

            <hr></hr>
            <div>
              <div className="flex flex-space-between ">
                <div>
                  <p className="text-label mt-0 text-neutral-06">Subtotal</p>
                </div>
                <p className="text-value text-neutral-08 mt-0 ">₦127,271.49</p>
              </div>
              <div className="flex flex-space-between ">
                <div>
                  <p className="text-label mt-0 text-neutral-06">Tax (7.5%) </p>
                </div>
                <p className="text-value text-neutral-08 mt-0 ">₦127,271.49</p>
              </div>
              <div className="flex flex-space-between ">
                <div>
                  <p className="text-label mt-0 text-neutral-06">
                    Discount (10%){' '}
                  </p>
                </div>
                <p className=" text-value text-neutral-08 mt-0 ">₦127,271.49</p>
              </div>
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

export default InvoiceDetail;
