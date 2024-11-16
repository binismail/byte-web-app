import { Add } from 'iconsax-react';
import { useEffect, useMemo, useState } from 'react';
import 'react-dropdown/style.css';
import Select from 'react-select';
import { isEmpty } from '../../../helpers/is-emtpy';
import { useGetInventoriesQuery } from '../../../lib/services/businessApi';
import {
  Product,
  SingleInvoiceDetailsType,
} from '../../../pages/dashboard/tools/invoices/invoices.types';
import Checkbox from '../../shared/checkbox/checkbox';
import FormikErrorMessage from '../../shared/form-error/formik-error-message';
import AmountInput from '../../shared/input/amount-input/amount-input';
import CounterInput from '../../shared/input/counter-input';
import Input from '../../shared/input/input/input';

type Props = {
  push?: <X = any>(obj: X) => void;
  remove?: <X = SingleInvoiceDetailsType>(index: number) => X | undefined;
  values?: SingleInvoiceDetailsType;
  replace: <X = any>(index: number, value: X) => void;
  handleBlur?: any;
  handleChange?: any;
  setFieldValue: any;
  product?: Product;
  productIndex: number;
};
type ProductInventoryOptionsType = {
  value: string;
  label: string;
};

const CreateInvoiceProduct = ({
  push,
  remove,
  replace,
  values,
  handleBlur,
  handleChange,
  setFieldValue,
  product,
  productIndex,
}: Props) => {
  // STATES
  const [addFromInventory, setAddFromInventory] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductInventoryOptionsType | null>(null);
  const [inventoryOptions, setInventoryOptions] = useState<
    ProductInventoryOptionsType[] | null
  >(null);

  //   DATA INITIALIZATION

  // HOOKS
  const {
    data,
    isLoading: getInventoryLoading,
    isSuccess,
  } = useGetInventoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { combinedTaxPercentage, totalCost } = useMemo(() => {
    const { totalCost, combinedTaxPercentage } = (
      values?.products !== undefined ? values.products : []
    ).reduce(
      (accumulator, product) => {
        const cost = product.quantity * product.unitPrice;
        return {
          totalCost: accumulator.totalCost + cost,
          combinedTaxPercentage:
            accumulator.combinedTaxPercentage +
            (cost * product.taxPercentage) / 100,
        };
      },
      { totalCost: 0, combinedTaxPercentage: 0 }
    );

    return {
      combinedTaxPercentage,
      totalCost,
    };
  }, [values?.products]);

  // SIDE EFFECTS
  useEffect(() => {
    // setField values
    setFieldValue('taxAmount', combinedTaxPercentage);
    setFieldValue('subTotal', totalCost);
  }, [totalCost, combinedTaxPercentage, setFieldValue]);

  //   populate inventory options
  useEffect(() => {
    if (isSuccess) {
      setInventoryOptions(
        data.data.map(
          ({
            productName,
            unitCostPrice,
          }: {
            productName: string;
            unitCostPrice: number;
            [x: string]: unknown;
          }) => ({
            value: unitCostPrice,
            label: productName,
          })
        )
      );
    }
  }, [isSuccess, data]);

  {
    return product !== undefined ? (
      <div
        key={productIndex}
        className="flex w-full flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4"
      >
        {/* title */}
        <p className="w-full p-4 border-b border-[#D0D6DB] text-sm text-[#5864AE]">
          Product details
        </p>

        {/* container */}
        <div className="flex flex-col w-full gap-6">
          <Checkbox
            checked={addFromInventory}
            type="checkbox"
            onChange={() => setAddFromInventory(!addFromInventory)}
            onBlur={handleBlur}
            className=""
            label="Add product from inventory"
          />

          {/* form inputs */}
          <div className="flex w-full items-start gap-4">
            {/* product name */}
            <label className="w-full flex flex-col gap-2">
              <span className="text-sm text-[#30333B] font-normal">
                {'Product name'}
              </span>
              {addFromInventory ? (
                <Select
                  isDisabled={getInventoryLoading || isEmpty(inventoryOptions)}
                  classNames={{
                    control: (state: any) =>
                      state.isFocused
                        ? 'border-red-600 h-[48px] w-full mt-1 !rounded-xl'
                        : 'border-grey-300 h-[48px] w-full mt-1 !rounded-xl',
                    indicatorSeparator: () => '!bg-transparent',
                    valueContainer: () => '!px-3',
                  }}
                  defaultValue={selectedProduct || undefined}
                  value={selectedProduct || undefined}
                  onChange={(selectedValue: any) => {
                    setSelectedProduct(selectedValue);
                    replace(productIndex, {
                      taxPercentage: 0,
                      name: selectedValue !== null ? selectedValue.label : '',
                      quantity: 0,
                      unitPrice:
                        selectedValue !== null ? selectedValue.value : 0,
                    });
                  }}
                  placeholder="Select a product"
                  options={inventoryOptions !== null ? inventoryOptions : []}
                />
              ) : (
                <Input
                  name={`products[${productIndex}].name`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={product.name}
                  placeholder="Enter product name"
                  type="text"
                />
              )}
              <FormikErrorMessage name={`products[${productIndex}].name`} />
            </label>

            {/* enter amount */}
            <label className="w-full flex flex-col gap-2">
              <span className="text-sm text-[#30333B] font-normal">
                {'Unit price'}
              </span>
              <AmountInput
                disabled={addFromInventory}
                name={`products[${productIndex}].unitPrice`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={product.unitPrice}
                placeholder="Enter amount"
                type="number"
              />
              <FormikErrorMessage
                name={`products[${productIndex}].unitPrice`}
              />
            </label>

            {/* quantity input */}
            <div className="flex flex-col w-full gap-2">
              {/* title */}
              <h5 className="text-sm text-[#30333B] font-normal">New units</h5>

              <CounterInput
                value={product.quantity}
                onDecreaseClick={() => {
                  setFieldValue(
                    `products[${productIndex}].quantity`,
                    product.quantity === 0 ? 0 : product.quantity - 1
                  );
                }}
                onIncreaseClick={() => {
                  setFieldValue(
                    `products[${productIndex}].quantity`,
                    product.quantity + 1
                  );
                }}
              />
              <FormikErrorMessage name={`products[${productIndex}].quantity`} />
            </div>
          </div>

          {/* vat information */}
          <div className="flex flex-col w-full gap-1">
            <Checkbox
              checked={product.taxPercentage === 7.5}
              type="checkbox"
              name={`products[${productIndex}].taxPercentage`}
              onChange={() =>
                setFieldValue(
                  `products[${productIndex}].taxPercentage`,
                  product.taxPercentage === 7.5 ? 0 : 7.5
                )
              }
              onBlur={handleBlur}
              value={7.5}
              label="This is a VAT-able product"
            />
            <p className="font-normal w-[60%] text-[#808691] text-[13px]">
              Checking this box includes 7.5% tax in the subtotal. Check this
              only if the product is subject to value-added taxation.
            </p>
          </div>

          {/* add new and remove product button */}
          <div className="flex items-center justify-between w-full gap-4">
            {productIndex + 1 === (values?.products as Product[])?.length && (
              <button
                onClick={() =>
                  push
                    ? push({
                        taxPercentage: 0,
                        name: '',
                        quantity: 0,
                        unitPrice: 0,
                      })
                    : undefined
                }
                className="inline-flex items-center gap-2 text-[#6A78D1] text-sm hover:opacity-70"
              >
                <Add size="12" color="#6A78D1" />
                Add another product
              </button>
            )}

            {/* remove product */}
            {values !== undefined &&
              (values?.products as Product[])?.length > 1 && (
                <button
                  onClick={() => (remove ? remove(productIndex) : undefined)}
                  className="inline-flex items-center gap-2 text-red-500 text-xs hover:opacity-70 ml-auto"
                >
                  remove
                </button>
              )}
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  }
};

export default CreateInvoiceProduct;
