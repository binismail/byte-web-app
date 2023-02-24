import Avatar from '../../../../../components/shared/avatar/avatar';
import ByteIcon from '../../../../../components/shared/icon/byte.icon';
import styles from './preview-invoice.module.scss';
import profile from '../../../../../public/image/profile.jpg';

const PreviewInvoice: React.FC<any> = () => {
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
          <div className="flex flex-space-between flex-align-center mt-md-1 ">
            <div className="flex flex-align-center">
              <div className="mr-sm-2">
                <Avatar src={profile} size="40px" alt="profile" />
              </div>

              <div>
                <label className="text-value ">Fife Animashaun</label>
                <p className="text-label mt-0 mb-0">0814 112 3456</p>
              </div>
            </div>
          </div>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.invoiceContent}>
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
          </div>
        </div>

        <div className={styles.footer}>
          <div className="flex flex-space-between">
            <p className={styles.small}>Total</p>
            <p className={styles.footerAmount}>₦201,987.82</p>
          </div>
        </div>

        <div className={styles.divider}></div>
        <div className="mt-md-1">
          <div className="flex flex-space-between ">
            <div>
              <label className="text-label text-neutral-06">Date issued</label>
              <p className="text-value mt-0 text-neutral-09">
                12th September, 2022
              </p>
            </div>
            <div>
              <label className="text-label text-neutral-06">Expiry date </label>
              <p className="text-value mt-0 text-neutral-09">
                12th September, 2022
              </p>
            </div>{' '}
          </div>
          <div className="flex flex-space-between ">
            <div>
              <label className="text-label text-neutral-06">
                Payment methods{' '}
              </label>
              <p className="text-value mt-0 text-neutral-09">
                Online payment, Bank transfer{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewInvoice;
