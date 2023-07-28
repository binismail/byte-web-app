import { Formik } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { isEmpty } from '../../../helpers/is-emtpy';
import {
  useGetSingleInventoryQuery,
  useUpdateInventoryMutation,
} from '../../../lib/services/businessApi';
import { InventoryDetailsType } from '../../../pages/dashboard/tools/inventory-management/inventory.types';
import Button from '../../shared/butttons/button/button';
import FormError from '../../shared/form-error/form-error';
import IconShadow from '../../shared/icon/icon-shadow';
import AmountInput from '../../shared/input/amount-input/amount-input';
import Input from '../../shared/input/input/input';
import Modal from '../../shared/modal/modal';
import TextArea from '../../shared/textarea/textarea';
import UpdateSalesCount from '../update-sales';
import UpdateStockValue from '../update-stock';

type Props = {
  setEditProductState: Dispatch<SetStateAction<boolean>>;
  productId: string;
};
type PickedImageType = {
  path: string;
  preview: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const EditInventory = ({ setEditProductState, productId }: Props) => {
  // STATES
  const [pickedImage, setPickedImage] = useState<PickedImageType>({
    path: '',
    preview: '',
    name: '',
    size: 0,
    type: '',
    webkitRelativePath: '',
  });
  const [files, setFiles] = useState<unknown[]>([]);
  const [error, setError] = useState<string>('');
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
  const [updateStockState, setUpdateStockState] = useState<boolean>(false);
  const [saleCountState, setSalesCountState] = useState<boolean>(false);

  // DATA INITIALIZATION
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      setError('');
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onDropRejected(fileRejections, event) {
      setError("file shouldn't be more than 5mb");
      console.log('files: ', fileRejections);
      console.log('event: ', event);
    },
  });
  const categories = [
    {
      label: 'Maintenance',
      value: 'maintenance',
    },
    {
      label: 'Sales item',
      value: 'sales-item',
    },
  ];

  // HOOKS
  const { data, isSuccess } = useGetSingleInventoryQuery(productId, {
    refetchOnMountOrArgChange: true,
  });
  const [updateInventory, { isLoading }] = useUpdateInventoryMutation();

  // SIDE EFFECTS
  useEffect(() => {
    if (!isEmpty(files)) {
      setPickedImage(files[0] as PickedImageType);
      console.log(files);
    }
  }, [files]);
  useEffect(() => {
    if (isSuccess && !isEmpty(data?.data)) {
      setInventoryDetails({ ...data.data });
    }
  }, [isSuccess, data]);

  return (
    <Modal
      header={'Edit product'}
      closeModal={() => setEditProductState(false)}
    >
      <Formik
        enableReinitialize
        initialValues={{
          productName: inventoryDetails.productName,
          productDescription: inventoryDetails.productDescription,
          productCategory: inventoryDetails.productCategory,
          unitCostPrice: inventoryDetails.unitCostPrice,
          unitSellingPrice: inventoryDetails.unitSellingPrice,
          productQuantityStocked: inventoryDetails.productQuantityStocked,
          productQuantityRemaining: inventoryDetails.productQuantityRemaining,
          overallStock: inventoryDetails.overallStock,
          salesCount: inventoryDetails.salesCount,
        }}
        onSubmit={(values) => {
          const data = {
            productName: values.productName,
            productDescription: values.productDescription,
            productCategory: values.productCategory,
            unitCostPrice: values.unitCostPrice,
            unitSellingPrice: values.unitSellingPrice,
            // productImage: pickedImage.name || null,
          };
          updateInventory({ data, productId })
            .unwrap()
            .then((data: any) => {
              setEditProductState(false);
              toast.success(data?.message || `Product updated successfully!`);
            })
            .catch((error: any) => {
              toast.error(error?.data?.message || `Failed to update Inventory`);
            });
          console.log(values);
        }}
        validationSchema={Yup.object({
          productName: Yup.string().required(),
          productDescription: Yup.string().required(),
          productCategory: Yup.string().required(),
          unitCostPrice: Yup.number()
            .min(5, "can't be less than 5 Naira")
            .required(),
          unitSellingPrice: Yup.number()
            .min(5, "can't be less than 5 Naira")
            .required(),
          productQuantityStocked: Yup.number()
            .min(1, "Can't be less than 1")
            .required(),
        })}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          dirty,
        }) => {
          return (
            <>
              {/* modal */}
              {updateStockState && (
                <UpdateStockValue
                  productId={productId}
                  setUpdateStockState={setUpdateStockState}
                />
              )}
              {saleCountState && (
                <UpdateSalesCount
                  productId={productId}
                  setSalesCountState={setSalesCountState}
                />
              )}
              <div className="h-[80vh] overflow-auto w-full flex items-center justify-center pt-3 pb-4">
                {/* inner contianer */}
                <div className="flex flex-col h-full w-full gap-2 pt-2 pb-3 px-4 overflow-auto">
                  {/* product image */}
                  <div className="w-full flex flex-col items-center gap-3">
                    <IconShadow
                      icon="d-cube-scan"
                      color="var(--neutral06)"
                      size="24"
                      className="grey medium"
                    />
                    <p className="link"> Change profile photo</p>
                  </div>

                  {/* Form data */}
                  <div>
                    <div>
                      <div className="form-group">
                        <label>Product name</label>
                        <Input
                          placeholder="Enter product name"
                          type="text"
                          name="productName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.productName}
                        />
                        {touched.productName && errors.productName && (
                          <FormError message={errors.productName as string} />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Unit cost price</label>
                        <AmountInput
                          placeholder="Enter unit cost price"
                          type="number"
                          name="unitCostPrice"
                          value={values.unitCostPrice}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.unitCostPrice && errors.unitCostPrice && (
                          <FormError message={errors.unitCostPrice as string} />
                        )}
                      </div>
                      <div className="form-group">
                        <label>Unit selling price</label>
                        <AmountInput
                          placeholder="Enter unit selling price"
                          type="number"
                          name="unitSellingPrice"
                          value={values.unitSellingPrice}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.unitSellingPrice &&
                          errors.unitSellingPrice && (
                            <FormError
                              message={errors.unitSellingPrice as string}
                            />
                          )}
                      </div>

                      <div className="form-group">
                        <label>Quantity in stock</label>
                        <Input
                          placeholder="Enter available quanity "
                          type="number"
                          name="productQuantityRemaining"
                          value={values.productQuantityRemaining}
                          readOnly={true}
                          onFocus={() => setUpdateStockState(true)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Sales count</label>
                        <Input
                          placeholder="Enter sales count"
                          type="number"
                          name="salesCount"
                          value={values.salesCount}
                          readOnly={true}
                          onFocus={() => setSalesCountState(true)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Category</label>
                        <Select
                          classNames={{
                            control: (state) =>
                              state.isFocused
                                ? 'border-red-600 h-[48px] w-full mt-1 !rounded-xl'
                                : 'border-grey-300 h-[48px] w-full mt-1 !rounded-xl',
                            indicatorSeparator: () => '!bg-transparent',
                            valueContainer: () => '!px-3',
                          }}
                          name="productCategory"
                          value={categories.find(
                            (cateogry) =>
                              cateogry.value === values.productCategory
                          )}
                          onChange={(selectedOption) => {
                            setFieldValue(
                              'productCategory',
                              selectedOption?.value || ''
                            );
                          }}
                          placeholder="Select category"
                          options={categories}
                        />
                        {touched.productCategory && errors.productCategory && (
                          <FormError
                            message={errors.productCategory as string}
                          />
                        )}
                      </div>

                      <div className="form-group">
                        <label>Description</label>
                        <TextArea
                          name="productDescription"
                          value={values.productDescription}
                          rows={5}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter description"
                        />
                        {touched.productName && errors.productName && (
                          <FormError message={errors.productName as string} />
                        )}
                      </div>

                      <div className="w-full flex flex-col items-stretch">
                        <Button
                          disabled={isLoading || !dirty}
                          loading={isLoading}
                          click={handleSubmit}
                          title="Update stock"
                          color="btnPrimary"
                          type="block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditInventory;
