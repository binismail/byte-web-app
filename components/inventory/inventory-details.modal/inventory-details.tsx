import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isEmpty } from '../../../helpers/is-emtpy';
import {
  useDeleteProductMutation,
  useGetSingleInventoryQuery,
} from '../../../lib/services/businessApi';
import { InventoryDetailsType } from '../../../pages/dashboard/tools/inventory-management/inventory.types';
import Button from '../../shared/butttons/button/button';
import ByteIcon from '../../shared/icon/byte.icon';
import IconShadow from '../../shared/icon/icon-shadow';
import LoadingState from '../../shared/loading-state';
import Modal from '../../shared/modal/modal';
import MoreInfo from './more-info';

type InventoryDetailsProps = {
  productId: string;
  setProductDetailsState: Dispatch<SetStateAction<boolean>>;
  setEditProductState: Dispatch<SetStateAction<boolean>>;
};
const InventoryDetails = ({
  setEditProductState,
  setProductDetailsState,
  productId,
}: InventoryDetailsProps) => {
  // STATES
  const [moreModalState, setMoreModalState] = useState(false);
  const [inventoryDetails, setInventoryDetails] =
    useState<InventoryDetailsType>({
      productImage: '',
      productDescription: '',
      overallStock: 0,
      salesCount: 0,
      _id: '',
      productName: '',
      productCategory: '',
      unitCostPrice: 0,
      unitSellingPrice: 0,
      productQuantityStocked: 0,
      accountID: 0,
      business: '',
      num: '',
      productQuantityRemaining: 0,
      createdAt: '',
      updatedAt: '',
      __v: 0,
    });

  // HOOKS
  const { data, isLoading, isSuccess } = useGetSingleInventoryQuery(productId, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  // HANDLERS
  const handleDeleteProduct = () => {
    deleteProduct(productId)
      .unwrap()
      .then(() => {
        setProductDetailsState(false);
        setMoreModalState(false);
        toast.success(`Product deleted successfully!`);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.data?.message || `Couldn't delete this product`);
      });
  };
  const handleEditProduct = () => {
    setProductDetailsState(false);
    setEditProductState(true);
  };

  // SIDE EFFECTS
  useEffect(() => {
    if (isSuccess && !isEmpty(data?.data)) {
      setInventoryDetails({ ...data.data });
    }
  }, [isSuccess, data]);
  return (
    <>
      <Modal header=" " closeModal={() => setProductDetailsState(false)}>
        {isLoading ? (
          <LoadingState heightTailwind="h-[70vh]" />
        ) : !isEmpty(inventoryDetails) ? (
          <>
            {moreModalState && (
              <MoreInfo
                isLoading={isDeleteLoading}
                setMoreModalState={setMoreModalState}
                onDeleteClick={handleDeleteProduct}
                onEditProductBtnClick={handleEditProduct}
              />
            )}
            {/* container */}
            <div className="h-[80vh] overflow-auto w-full flex items-center justify-center py-4">
              {/* inner contianer */}
              <div className="flex flex-col h-full w-full gap-6 py-2 px-4 overflow-auto">
                {/* title */}
                <div className="flex w-full items-center justify-between">
                  {/* product number */}
                  <p className="text-[#30333B] text-base font-normal">
                    #{inventoryDetails.num}
                  </p>

                  {/* more button */}
                  <div className="mr-sm-2">
                    <ByteIcon
                      onClick={() => setMoreModalState(true)}
                      icon="more"
                      size="20"
                    />
                  </div>
                </div>

                {/* product image container */}
                <div className="flex items-center w-full gap-2 justify-between">
                  {inventoryDetails.productImage ? (
                    <span className="rounded-[50%] bg-[#F0F2F5] h-[40px] w-[40px] inline-flex items-center justify-center">
                      <Image
                        className="rounded-[50%]"
                        height="40px"
                        width="40px"
                        src={inventoryDetails.productImage}
                        alt=""
                      />
                    </span>
                  ) : (
                    <IconShadow
                      icon="d-cube-scan"
                      color="var(--neutral06)"
                      size="26"
                      className="grey medium"
                    />
                  )}
                  {inventoryDetails?.productQuantityRemaining > 0 ? (
                    <span className="bg-[#DBFFF2] text-[#117454] py-1 px-2 rounded-xl inline-flex items-center justify-center">
                      In stock
                    </span>
                  ) : (
                    <span className="bg-[#fce8e8] text-[#CF4F66] py-1 px-2 rounded-xl inline-flex items-center justify-center">
                      Out of stock
                    </span>
                  )}
                </div>

                {/* product details */}
                <div className="w-full flex flex-col gap-6">
                  <div className="w-full flex flex-col gap-2">
                    <span className="text-[#808691] text-sm font-normal ">
                      Product name
                    </span>
                    <p className="text-[#30333B] text-sm font-normal mt-0">
                      {inventoryDetails.productName}
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <span className="text-[#808691] text-sm font-normal ">
                      Unit cost price
                    </span>
                    <p className="text-[#30333B] text-sm font-normal mt-0">
                      {`₦${inventoryDetails.unitCostPrice.toLocaleString(
                        'en-US'
                      )}`}
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <span className="text-[#808691] text-sm font-normal ">
                      Unit selling price
                    </span>
                    <p className="text-[#30333B] text-sm font-normal mt-0">
                      {`₦${inventoryDetails.unitSellingPrice.toLocaleString(
                        'en-US'
                      )}`}
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <span className="text-[#808691] text-sm font-normal ">
                      Quantity remaining / Quantity in stock
                    </span>
                    <p className="text-[#30333B] text-sm font-normal mt-0">
                      <span className="text-success">
                        {inventoryDetails.productQuantityRemaining}
                      </span>
                      /{inventoryDetails.overallStock}
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <span className="text-[#808691] text-sm font-normal ">
                      Category
                    </span>
                    <p className="text-[#30333B] text-sm font-normal mt-0">
                      {inventoryDetails.productCategory}
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <span className="text-[#808691] text-sm font-normal ">
                      Description
                    </span>
                    <p className="text-[#30333B] text-sm font-normal mt-0">
                      {inventoryDetails.productDescription}
                    </p>
                  </div>
                  <div className="w-full flex flex-col items-stretch">
                    <Button
                      click={handleEditProduct}
                      title="Update stock"
                      color="btnLight"
                      type="block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default InventoryDetails;
