import { Add } from 'iconsax-react';
import { useEffect, useMemo } from 'react';
import { SingleInvoiceDetailsType } from '../../../pages/dashboard/tools/invoices/invoices.types';
import Checkbox from '../../shared/checkbox/checkbox';
import FormikErrorMessage from '../../shared/form-error/formik-error-message';
import AmountInput from '../../shared/input/amount-input/amount-input';
import Input from '../../shared/input/input/input';

type Props = {
  push?: <X = any>(obj: X) => void;
  remove?: <X = SingleInvoiceDetailsType>(index: number) => X | undefined;
  values?: SingleInvoiceDetailsType;
  handleBlur?: any;
  handleChange?: any;
  setFieldValue: any;
};

const InvoiceService = ({
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
      values?.services !== undefined ? values.services : []
    ).reduce(
      (accumulator, service) => {
        const { cost, taxPercentage } = service;
        const serviceCost = cost;
        const serviceTax = (cost * taxPercentage) / 100;

        return {
          totalCost: accumulator.totalCost + (serviceCost || 0),
          combinedTaxPercentage: accumulator.combinedTaxPercentage + serviceTax,
        };
      },
      { totalCost: 0, combinedTaxPercentage: 0 }
    );
    return {
      combinedTaxPercentage,
      totalCost,
    };
  }, [values?.services]);

  // SIDE EFFECTS
  useEffect(() => {
    // setField values
    setFieldValue('taxAmount', combinedTaxPercentage);
    setFieldValue('subTotal', totalCost);
  }, [totalCost, combinedTaxPercentage]);

  return (
    <>
      {values?.services !== undefined &&
        values?.services?.map((service, index) => (
          <div
            key={index}
            className="flex w-full flex-col border p-4 border-[#E6EAED] rounded-2xl gap-4"
          >
            {/* title */}
            <p className="w-full p-4 border-b border-[#D0D6DB] text-sm text-[#5864AE]">
              Service details
            </p>

            {/* container */}
            <div className="flex flex-col w-full gap-6">
              {/* form inputs */}
              <div className="flex w-full items-start gap-4">
                {/* service name */}
                <label className="w-full flex flex-col gap-2">
                  <span className="text-sm text-[#30333B] font-normal">
                    {'Service name'}
                  </span>
                  <Input
                    name={`services[${index}].name`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={service.name}
                    placeholder="Enter service name"
                    type="text"
                  />
                  <FormikErrorMessage name={`services[${index}].name`} />
                </label>

                {/* enter amount */}
                <label className="w-full flex flex-col gap-2">
                  <span className="text-sm text-[#30333B] font-normal">
                    {'Amount'}
                  </span>
                  <AmountInput
                    name={`services[${index}].cost`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={service.cost}
                    placeholder="Enter amount"
                    type="number"
                  />
                  <FormikErrorMessage name={`services[${index}].cost`} />
                </label>
              </div>

              {/* vat information */}
              <div className="flex flex-col w-full gap-1">
                <Checkbox
                  checked={service.taxPercentage === 7.5}
                  type="checkbox"
                  name={`services[${index}].taxPercentage`}
                  onChange={() =>
                    setFieldValue(
                      `services[${index}].taxPercentage`,
                      service.taxPercentage === 7.5 ? 0 : 7.5
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

              {/* add new and remove service button */}
              <div className="flex items-center justify-between w-full gap-4">
                {index + 1 === values.services?.length && (
                  <button
                    onClick={() =>
                      push
                        ? push({
                            name: '',
                            cost: 0,
                            taxPercentage: 0,
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
                {values.services !== undefined && values.services?.length > 1 && (
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

export default InvoiceService;
