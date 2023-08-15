import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateProductQuantityMutation } from '../../../lib/services/businessApi';
import Button from '../../shared/butttons/button/button';
import Modal from '../../shared/modal/modal';

type Props = {
  setUpdateStockState: Dispatch<SetStateAction<boolean>>;
  productId: string;
};

const UpdateStockValue = ({ setUpdateStockState, productId }: Props) => {
  // STATES
  const [unitValue, setUnitValue] = useState<number>(0);

  //   HOOKS
  const [updateStock, { isLoading }] = useUpdateProductQuantityMutation();

  //   HANDLERS
  const handleSubmit = () => {
    updateStock({
      productId: productId,
      quantity: unitValue,
    })
      .unwrap()
      .then((data: any) => {
        setUpdateStockState(false);
        toast.success(data?.message || `Stock updated successfully!`);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.data?.message || `Failed to update stock`);
      });
  };

  return (
    <Modal
      header={'Update stock'}
      closeModal={() => setUpdateStockState(false)}
    >
      <div className="py-7 px-2 w-full flex flex-col gap-5">
        {/* title */}
        <h3 className="text-sm text-[#565A63] font-normal text-center">
          How many units do you want to add to your stock?
        </h3>

        {/* counter component */}
        <div className="flex flex-col w-full gap-1">
          {/* title */}
          <h5 className="text-xs text-[#565A63] font-normal">New units</h5>

          <div className="flex w-full justify-between items-center h-[48px] border border-[#565A63] rounded-2xl overflow-hidden">
            {/* decrease */}
            <button
              onClick={() =>
                setUnitValue((prevState: number) =>
                  prevState === 0 ? 0 : prevState - 1
                )
              }
              className="inline-flex disabled:opacity-40 justify-center items-center h-full w-[20%] rounded-l-xl bg-[#F0F2F5] border-[1px_1px_1px_0] border-[#565A63]"
            >
              -
            </button>

            {/* value */}
            <span className="text-sm text-[#565A63] font-normal">
              {unitValue}
            </span>

            {/* increase */}
            <button
              onClick={() => setUnitValue((prevState: number) => prevState + 1)}
              className="inline-flex disabled:opacity-40 justify-center items-center h-full w-[20%] rounded-r-xl bg-[#F0F2F5] border-[1px_1px_0_1px] border-[#565A63]"
            >
              +
            </button>
          </div>
        </div>

        {/* button */}
        <div className="w-full flex flex-col items-stretch">
          <Button
            loading={isLoading}
            click={handleSubmit}
            title="Update stock"
            color="btnPrimary"
            type="block"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateStockValue;
