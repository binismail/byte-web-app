import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { useDeleteProductMutation } from '../../../lib/services/businessApi';
import Button from '../../shared/butttons/button/button';
import Modal from '../../shared/modal/modal';

type Props = {
  cancelClick: () => void;
  setDeleteModalState: Dispatch<SetStateAction<boolean>>;
  setProductDetailsState: Dispatch<SetStateAction<boolean>>;
  productId: string;
};

const DeleteInventory = ({
  cancelClick,
  setDeleteModalState,
  setProductDetailsState,
  productId,
}: Props) => {
  // HOOKS
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  // HANDLERS
  const handleDeleteProduct = () => {
    deleteProduct(productId)
      .unwrap()
      .then(() => {
        setProductDetailsState(false);
        setDeleteModalState(false);
        toast.success(`Product deleted successfully!`);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.data?.message || `Couldn't delete this product`);
      });
  };

  return (
    // <Modal header={'More'} closeModal={() => setMoreModalState(false)}>
    <Modal header={''}>
      {/* container */}

      <div className="flex w-full flex-col text-center gap-5 py-6">
        {/* texts */}
        <div className="flex flex-col gap-1">
          {/* title */}
          <h3 className="text-xl text-[#30333B] font-normal">
            Delete inventory
          </h3>

          {/* description */}
          <h5 className="text-sm text-[#565A63] font-normal">
            You’re about to delete this inventory. This action is not
            reversible. Do you want to continue?
          </h5>
        </div>

        {/* buttons */}
        <div className="flex w-full items-center gap-2">
          {/* cancel */}
          <button
            onClick={cancelClick}
            className="text-[#6A78D1] inline-flex items-center justify-center w-[40%]"
          >
            Cancel
          </button>

          {/* delete */}
          <div className="w-full flex-col items-stretch">
            <Button
              click={handleDeleteProduct}
              disabled={isDeleteLoading}
              loading={isDeleteLoading}
              color="btnWarning"
              title="Delete inventory"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteInventory;
