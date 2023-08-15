import { Dispatch, SetStateAction, useState } from 'react';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import { useUpdateProductSalesCountMutation } from '../../../lib/services/businessApi';
import Button from '../../shared/butttons/button/button';
import Modal from '../../shared/modal/modal';

type Props = {
  setSalesCountState: Dispatch<SetStateAction<boolean>>;
  productId: string;
};

const UpdateSalesCount = ({ setSalesCountState, productId }: Props) => {
  // STATES
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);
  const [salesCount, setSalesCount] = useState<number>(0);

  //   HOOKS
  const [updateSalesCount, { isLoading }] =
    useUpdateProductSalesCountMutation();

  //   HANDLERS
  const handleSubmit = () => {
    updateSalesCount({
      productId: productId,
      salesAmount: isOutOfStock ? 0 : salesCount,
    })
      .unwrap()
      .then((data: any) => {
        setSalesCountState(false);
        toast.success(data?.message || `Sales count updated successfully!`);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.data?.message || `Failed to update sales count`);
      });
  };

  return (
    <Modal
      header={'Update stock sales'}
      closeModal={() => setSalesCountState(false)}
    >
      <div className="py-7 px-2 w-full flex flex-col gap-5">
        {/* title */}
        <h3 className="text-sm text-[#565A63] font-normal text-center">
          How many units have been sold so far?
        </h3>

        {/* counter component */}
        <div className="flex flex-col w-full gap-1">
          {/* title */}
          <h5 className="text-xs text-[#565A63] font-normal">Units sold</h5>

          <div
            className={`flex w-full justify-between items-center h-[48px] border rounded-2xl overflow-hidden ${
              isOutOfStock ? 'border-gray-400' : 'border-[#565A63] '
            }`}
          >
            {/* decrease */}
            <button
              disabled={isOutOfStock}
              onClick={() =>
                setSalesCount((prevState: number) =>
                  prevState === 0 ? 0 : prevState - 1
                )
              }
              className="inline-flex disabled:opacity-40 justify-center items-center h-full w-[20%] rounded-l-xl bg-[#F0F2F5] border-r border-[#565A63]"
            >
              -
            </button>

            {/* value */}
            <span
              className={`text-sm text-[#565A63] font-normal ${
                isOutOfStock && 'text-gray-400'
              }`}
            >
              {isOutOfStock ? 0 : salesCount}
            </span>

            {/* increase */}
            <button
              disabled={isOutOfStock}
              onClick={() =>
                setSalesCount((prevState: number) => prevState + 1)
              }
              className="inline-flex disabled:opacity-40 justify-center items-center h-full w-[20%] rounded-r-xl bg-[#F0F2F5] border-l border-[#565A63]"
            >
              +
            </button>
          </div>
        </div>

        {/* toggle switch */}
        <div className="flex w-full justify-between gap-2 items-center">
          {/* text */}
          <span className="text-[#565A63] text-sm font-normal">
            Item is out of stock
          </span>

          {/* toggle */}
          <Switch
            onColor="#19A97B"
            offColor="#D0D6DB"
            checkedIcon={false}
            uncheckedIcon={false}
            activeBoxShadow="0 0 1px 1px #D0D6DB"
            onChange={() => setIsOutOfStock((prevState) => !prevState)}
            checked={isOutOfStock}
          />
        </div>

        {/* button */}
        <div className="w-full flex flex-col items-stretch">
          <Button
            loading={isLoading}
            click={handleSubmit}
            title="Update sales count"
            color="btnPrimary"
            type="block"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateSalesCount;

// isOutOfStock ? 0 :

// setIsOutOfStock(+value === 0 ? true : false);
