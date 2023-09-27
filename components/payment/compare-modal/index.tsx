import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import * as Yup from 'yup';
import { BusinessAnalyticsType } from '../../../pages/dashboard/payment/payement.types';
import Button from '../../shared/butttons/button/button';
import Checkbox from '../../shared/checkbox/checkbox';
import FormError from '../../shared/form-error/form-error';
import DateTimePicker from '../../shared/input/date-time-picker';
import Modal from '../../shared/modal/modal';

type Props = {
  setCompareModalState: Dispatch<SetStateAction<boolean>>;
  previousDate: string;
  currentDate: string;
  periodType: BusinessAnalyticsType;
};

const CompareModal = ({
  setCompareModalState,
  previousDate,
  currentDate,
  periodType,
}: Props) => {
  // STATES
  const [comparePeriodType, setComparePeriodType] = useState(() => periodType);

  // HOOKS
  const format = useMemo<string>(() => {
    switch (comparePeriodType) {
      case 'day':
        return 'YYYY-MM-DD';
      case 'month':
        return 'YYYY-MM';
      case 'year':
        return 'YYYY';
      default:
        return 'YYY-MM-DD';
    }
  }, [comparePeriodType]);

  // DATA INTIAILIZATION
  const router = useRouter();

  // SIDE EFFECT
  useEffect(() => {
    // Prefetch the login page
    router.prefetch('/dashboard/payment/compare');
  }, [router]);

  return (
    <Modal
      header={'Compare insights'}
      closeModal={() =>
        setCompareModalState((prevState: boolean) => !prevState)
      }
    >
      <Formik
        enableReinitialize
        initialValues={{
          previousDate: previousDate,
          currentDate: currentDate,
        }}
        onSubmit={(values) => {
          const params = new URLSearchParams();
          params.append('startDate', values.previousDate);
          params.append('endDate', values.currentDate);
          params.append('type', comparePeriodType);
          const paramsUrl = params.toString();
          router.push(`/dashboard/payment/compare?${paramsUrl}`);
        }}
        validationSchema={Yup.object({
          previousDate: Yup.date()
            .required('Required')
            .when(
              'currentDate',
              (currentDate, schema) =>
                currentDate &&
                schema.max(
                  currentDate,
                  'Previous date cannot be later than current date'
                )
            ),
          currentDate: Yup.date().required('Required'),
        })}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
        }) => {
          return (
            <div className="w-full flex flex-col pt-4 pb-3 gap-6 px-2">
              {/* payment methods */}
              <label className="w-full flex flex-col gap-3 py-3 border-y border-gray-300">
                <span className="text-sm text-[#30333B] font-normal">
                  Period
                </span>
                <div
                  role="group"
                  aria-labelledby="payment-method-group"
                  className="flex gap-6"
                >
                  <Checkbox
                    checked={comparePeriodType === 'day'}
                    type="radio"
                    name="type"
                    onChange={(e: any) => {
                      setComparePeriodType(e.target.value);
                    }}
                    // onBlur={handleBlur}
                    value={'day'}
                    label="Day"
                    className="mb-md-1"
                  />
                  <Checkbox
                    checked={comparePeriodType === 'month'}
                    type="radio"
                    name="type"
                    onChange={(e: any) => {
                      setComparePeriodType(e.target.value);
                    }}
                    // onBlur={handleBlur}
                    value={'month'}
                    label="Month"
                    className="mb-md-1"
                  />
                  <Checkbox
                    checked={comparePeriodType === 'year'}
                    type="radio"
                    name="type"
                    onChange={(e: any) => {
                      setComparePeriodType(e.target.value);
                    }}
                    // onBlur={handleBlur}
                    value={'year'}
                    label="Year"
                  />
                </div>
              </label>

              {/* previous date */}
              <div className="w-full flex flex-col gap-2">
                <span className="text-sm text-[#30333B] font-normal">
                  {'Previous date'}
                </span>
                <DateTimePicker
                  closeOnSelect={true}
                  inputProps={{
                    placeholder: 'Pick start date',
                  }}
                  onChange={(e: any) =>
                    setFieldValue(
                      'previousDate',
                      new Date(e._d).toLocaleDateString('en-CA')
                    )
                  }
                  dateFormat={format}
                  timeFormat={false}
                  value={new Date(values.previousDate)}
                />
                {touched.previousDate && errors.previousDate && (
                  <FormError message={errors.previousDate || ''} />
                )}
              </div>

              {/* to: date */}
              <div className="w-full flex flex-col gap-2">
                <span className="text-sm text-[#30333B] font-normal">
                  {'Current date'}
                </span>
                <DateTimePicker
                  closeOnSelect={true}
                  inputProps={{
                    placeholder: 'Pick end date',
                  }}
                  onChange={(e: any) =>
                    setFieldValue(
                      'currentDate',
                      new Date(e._d).toLocaleDateString('en-CA')
                    )
                  }
                  dateFormat={format}
                  timeFormat={false}
                  value={new Date(values.currentDate)}
                />
                {touched.currentDate && errors.currentDate && (
                  <FormError message={errors.currentDate || ''} />
                )}
              </div>

              {/* button */}
              <div className="flex flex-col items-stretch gap-6 pb-6">
                <Button
                  disabled={!isValid || isSubmitting}
                  click={handleSubmit}
                  title="Compare"
                  type="block"
                  color="btnPrimary"
                />
              </div>
            </div>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default CompareModal;
