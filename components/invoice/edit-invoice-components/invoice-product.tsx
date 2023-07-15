import { Add } from 'iconsax-react';
import { useEffect, useMemo } from 'react';
import { SingleInvoiceDetailsType } from '../../../pages/dashboard/tools/invoices/invoices.types';
import Checkbox from '../../shared/checkbox/checkbox';
import FormikErrorMessage from '../../shared/form-error/formik-error-message';
import AmountInput from '../../shared/input/amount-input/amount-input';
import CounterInput from '../../shared/input/counter-input';
import Input from '../../shared/input/input/input';

type Props = {
  isEditMode?: boolean;
  push?: <X = any>(obj: X) => void;
  remove?: <X = SingleInvoiceDetailsType>(index: number) => X | undefined;
  values?: SingleInvoiceDetailsType;
  handleBlur?: any;
  handleChange?: any;
  setFieldValue: any;
};

const InvoiceProduct = ({
  isEditMode = false,
  push,
  remove,
  values,
  handleBlur,
  handleChange,
  setFieldValue,
}: Props) => {
  // HOOKS
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
  }, [totalCost, combinedTaxPercentage]);

  return (
    <>
      {values?.products !== undefined &&
        values?.products.map((product, index) => (
          <div
            key={index}
            className="flex w-full flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4"
          >
            {/* title */}
            <p className="w-full p-4 border-b border-[#D0D6DB] text-sm text-[#5864AE]">
              Product details
            </p>

            {/* container */}
            <div className="flex flex-col w-full gap-6">
              {
                // add product to inventory
                !isEditMode ? (
                  <Checkbox className="" label="Add product from inventory" />
                ) : null
              }

              {/* form inputs */}
              <div className="flex w-full items-start gap-4">
                {/* product name */}
                <label className="w-full flex flex-col gap-2">
                  <span className="text-sm text-[#30333B] font-normal">
                    {'Product name'}
                  </span>
                  <Input
                    name={`products[${index}].name`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={product.name}
                    placeholder="Enter product name"
                    type="text"
                  />
                  <FormikErrorMessage name={`products[${index}].name`} />
                </label>

                {/* enter amount */}
                <label className="w-full flex flex-col gap-2">
                  <span className="text-sm text-[#30333B] font-normal">
                    {'Unit price'}
                  </span>
                  <AmountInput
                    name={`products[${index}].unitPrice`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={product.unitPrice}
                    placeholder="Enter amount"
                    type="number"
                  />
                  <FormikErrorMessage name={`products[${index}].unitPrice`} />
                </label>

                {/* quantity input */}
                <div className="flex flex-col w-full gap-2">
                  {/* title */}
                  <h5 className="text-sm text-[#30333B] font-normal">
                    New units
                  </h5>

                  <CounterInput
                    value={product.quantity}
                    onDecreaseClick={() => {
                      setFieldValue(
                        `products[${index}].quantity`,
                        product.quantity === 0 ? 0 : product.quantity - 1
                      );
                    }}
                    onIncreaseClick={() => {
                      setFieldValue(
                        `products[${index}].quantity`,
                        product.quantity + 1
                      );
                    }}
                  />
                  <FormikErrorMessage name={`products[${index}].quantity`} />
                </div>
              </div>

              {/* vat information */}
              <div className="flex flex-col w-full gap-1">
                <Checkbox
                  checked={product.taxPercentage === 7.5}
                  type="checkbox"
                  name={`products[${index}].taxPercentage`}
                  onChange={() =>
                    setFieldValue(
                      `products[${index}].taxPercentage`,
                      product.taxPercentage === 7.5 ? 0 : 7.5
                    )
                  }
                  onBlur={handleBlur}
                  value={7.5}
                  label="This is a VAT-able product"
                />
                <p className="font-normal w-[60%] text-[#808691] text-[13px]">
                  Checking this box includes 7.5% tax in the subtotal. Check
                  this only if the product is subject to value-added taxation.
                </p>
              </div>

              {/* add new and remove product button */}
              <div className="flex items-center justify-between w-full gap-4">
                {index + 1 === values.products?.length && (
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
                {values.products !== undefined && values.products?.length > 1 && (
                  <button
                    onClick={() => (remove ? remove(index) : undefined)}
                    className="inline-flex items-center gap-2 text-red-500 text-xs hover:opacity-70 ml-auto"
                  >
                    remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default InvoiceProduct;
