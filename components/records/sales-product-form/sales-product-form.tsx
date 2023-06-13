import Button from '../../shared/butttons/button/button';
import Input from '../../shared/input/input/input';
import TextArea from '../../shared/textarea/textarea';
import TotalAmount from '../../total amount/total-amount';
import SalesRecordProductFormGroup from '../sales-record-product-form-group/sales-record-product-form-group';
import styles from './sales-product-form.module.scss';

const SalesProductForm: React.FC<any> = ({ type }) => {
  return (
    <div>
      <div className={styles.container}>
        <p className="text-value text-primary-06 text-strong">
          {type === 'expense' ? 'Item Details' : ' Product details'}
        </p>
        <SalesRecordProductFormGroup type={type} />
        <SalesRecordProductFormGroup />

        <p>
          <a className="text-value text-primary-06 mx-md-1">
            + Add another product
          </a>
        </p>
      </div>
      {type === 'expense' ? (
        <div>
          <div className="flex gap-1 mt-md-2">
            <div className={styles.container}>
              <p className="text-value text-primary-06 text-strong">
                Other Information{' '}
              </p>
              <hr className="hr"></hr>
              <div className="form-group flex gap-1">
                <div>
                  <label>Date</label>
                  <Input placeholder="Date" value="name" type="date" />
                </div>

                <div className="mb-md-2">
                  <label>Customer name</label>
                  <Input
                    placeholder="Select category"
                    value="name"
                    type="text"
                  />
                </div>
              </div>

              <div className="form-group flex gap-1">
                <div>
                  <label>Description</label>
                  <TextArea rows={5} placeholder="Date" value="name" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-1 mt-md-2">
          <div className={styles.container}>
            <p className="text-value text-primary-06 text-strong">
              Customer Details
            </p>
            <hr className="hr"></hr>
            <div className="form-group">
              <div className="mb-md-2">
                <label>Customer name</label>
                <Input placeholder="Drop down" value="name" type="dropdown" />
              </div>
              <label>Phone number</label>
              <Input placeholder="09090909999" value="name" type="tel" />
            </div>
          </div>

          <div className={styles.container}>
            <p className="text-value text-primary-06 text-strong">
              Other Information{' '}
            </p>
            <hr className="hr"></hr>
            <div className="form-group flex gap-1">
              <div className="mb-md-2">
                <label>Customer name</label>
                <Input placeholder="Text-area" value="name" type="text-area" />
              </div>

              <div>
                <label>Date</label>
                <Input placeholder="Date" value="name" type="date" />
              </div>
            </div>
            <p className="text-value">Payment method</p>
            <div className="flex">
              <Input placeholder="" type="radio" />
              <Input placeholder="" type="radio" />
              <Input placeholder="" type="radio" />
            </div>
          </div>
        </div>
      )}
      <div className="my-md-1 ">
        <TotalAmount value="N20,000.00" />
      </div>
      <Button title="Save Changes" type="large" color="btnPrimary" />
    </div>
  );
};
export default SalesProductForm;
