import Input from '../../../../shared/input/input/input';
import styles from './pos-form.module.scss';

const PosForm: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <h3 className="text-[20px]">Confirm your details</h3>
        <p className="text-[#565A63] text-[14px] my-3">
          Fill in the form below
        </p>
        <div className="flex gap-3 container-2">
          <div className="flex flex-wrap">
            {/* enter amount */}
            <label className="w-25 flex flex-col gap-4">
              <span className="text-sm text-[#30333B] font-normal">
                {'Account name'}
              </span>
              <Input
                name={`accountName`}
                value={''}
                placeholder="Fresh farm store"
                type="number"
              />
            </label>

            {/* enter amount */}
            <label className="w-25 flex flex-col gap-4">
              <span className="text-sm text-[#30333B] font-normal">
                {'Account name'}
              </span>
              <Input
                name={`accountName`}
                value={''}
                placeholder="Fresh farm store"
                type="number"
              />
            </label>

            {/* enter amount */}
            <label className="w-25 flex flex-col gap-4">
              <span className="text-sm text-[#30333B] font-normal">
                {'Account name'}
              </span>
              <Input
                name={`accountName`}
                value={''}
                placeholder="Fresh farm store"
                type="number"
              />
            </label>

            {/* enter amount */}
            <label className="w-full flex flex-col gap-2">
              <span className="text-sm text-[#30333B] font-normal">
                {'Account name'}
              </span>
              <Input
                name={`accountName`}
                value={''}
                placeholder="Fresh farm store"
                type="number"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosForm;
