import { Formik } from 'formik';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { isEmpty } from '../../../helpers/is-emtpy';
import { useCreateInventoryMutation } from '../../../lib/services/businessApi';
import Button from '../../shared/butttons/button/button';
import FormError from '../../shared/form-error/form-error';
import IconShadow from '../../shared/icon/icon-shadow';
import AmountInput from '../../shared/input/amount-input/amount-input';
import Input from '../../shared/input/input/input';
import Modal from '../../shared/modal/modal';
import TextArea from '../../shared/textarea/textarea';

type Props = {
  setAddProductState: Dispatch<SetStateAction<boolean>>;
};
type PickedImageType = {
  path: string;
  preview: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const CreateInventory = ({ setAddProductState }: Props) => {
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

  // HOOKS
  const [createInventory, { isLoading }] = useCreateInventoryMutation();

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

  // SIDE EFFECTS
  useEffect(() => {
    if (!isEmpty(files)) {
      setPickedImage(files[0] as PickedImageType);
      console.log(files);
    }
  }, [files]);

  return (
    <Modal
      header={'Add inventory product'}
      closeModal={() => setAddProductState(false)}
    >
      <Formik
        enableReinitialize
        initialValues={{
          productName: '',
          productDescription: '',
          productCategory: '',
          unitCostPrice: '',
          unitSellingPrice: '',
          productQuantityStocked: '',
        }}
        onSubmit={(values) => {
          // const data = {
          //   ...values,
          //   productImage: pickedImage.name || null,
          // };
          createInventory(values)
            .unwrap()
            .then((data: any) => {
              setAddProductState(false);
              toast.success(data?.message || `Product created successfully!`);
            })
            .catch((error: any) => {
              console.log(error);
              toast.error(
                error?.data?.message || `Failed to create new Inventory`
              );
            });
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
        }) => {
          return (
            <div className="h-[80vh] overflow-auto w-full flex items-center justify-center pt-2 pb-3">
              {/* inner contianer */}
              <div className="flex flex-col h-full w-full gap-2 pt-2 pb-4 px-4 overflow-auto">
                {/* error message */}
                {error && (
                  <span className="text-xs mx-auto text-red-500">{error}</span>
                )}

                {/* product image */}
                <div
                  {...getRootProps()}
                  className="w-full flex flex-col items-center gap-3"
                >
                  <input {...getInputProps()} />
                  {pickedImage.preview ? (
                    <span className="rounded-[50%] bg-[#F0F2F5] h-[70px] w-[70px] inline-flex items-center justify-center overflow-hidden">
                      <Image
                        objectFit="cover"
                        className="rounded-[50%]"
                        height="70px"
                        width="70px"
                        src={pickedImage.preview}
                        alt=""
                      />
                    </span>
                  ) : (
                    <IconShadow
                      icon="d-cube-scan"
                      color="var(--neutral06)"
                      size="24"
                      className="grey medium"
                    />
                  )}

                  {/* texts */}
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
                      {touched.unitSellingPrice && errors.unitSellingPrice && (
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
                        name="productQuantityStocked"
                        value={values.productQuantityStocked}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.productQuantityStocked &&
                        errors.productQuantityStocked && (
                          <FormError
                            message={errors.productQuantityStocked as string}
                          />
                        )}
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      <Input
                        placeholder="Enter category"
                        type="text"
                        name="productCategory"
                        value={values.productCategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.productCategory && errors.productCategory && (
                        <FormError message={errors.productCategory as string} />
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
                        loading={isLoading}
                        click={handleSubmit}
                        title="Add product to inventory"
                        color="btnPrimary"
                        type="block"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default CreateInventory;
