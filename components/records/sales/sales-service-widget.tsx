import { Add } from 'iconsax-react';
import { useEffect, useMemo } from 'react';
import { SalesRecordDetailsType } from '../../../pages/dashboard/tools/record/records.types';
import FormikErrorMessage from '../../shared/form-error/formik-error-message';
import AmountInput from '../../shared/input/amount-input/amount-input';
import Input from '../../shared/input/input/input';

type Props = {
  push?: <X = any>(obj: X) => void;
  remove?: <X = SalesRecordDetailsType>(index: number) => X | undefined;
  values?: SalesRecordDetailsType;
  handleBlur?: any;
  handleChange?: any;
  setFieldValue: any;
};

const SalesServiceWidget = ({
  push,
  remove,
  values,
  handleBlur,
  handleChange,
  setFieldValue,
}: Props) => {
  // HOOKS
  const totalCost = useMemo(
    () =>
      values?.services?.reduce(
        (accumulator, service) => accumulator + service.cost,
        0
      ),
    [values?.services]
  );

  // SIDE EFFECTS
  useEffect(() => {
    setFieldValue('totalAmount', totalCost);
  }, [totalCost]);

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
              <div className="w-full grid grid-cols-3 gap-4 items-start">
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

                {/* enter cost */}
                <label className="w-full flex flex-col gap-2">
                  <span className="text-sm text-[#30333B] font-normal">
                    {'Amount'}
                  </span>
                  <AmountInput
                    name={`services[${index}].cost`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={service.cost}
                    placeholder="Enter cost"
                    type="number"
                  />
                  <FormikErrorMessage name={`services[${index}].cost`} />
                </label>
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
                          })
                        : undefined
                    }
                    className="inline-flex items-center gap-2 text-[#6A78D1] text-sm hover:opacity-70"
                  >
                    <Add size="12" color="#6A78D1" />
                    Add another service
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

export default SalesServiceWidget;
