import { ArrowRight2 } from 'iconsax-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { isEmpty } from '../../../helpers/is-emtpy';
import { useGetSingleRecordQuery } from '../../../lib/services/businessApi';
import {
  ExpenseRecordDetailsType,
  RecordProduct,
  RecordService,
  SalesRecordDetailsType,
} from '../../../pages/dashboard/tools/record/records.types';
import ByteIcon from '../../shared/icon/byte.icon';
import IconShadow from '../../shared/icon/icon-shadow';
import LoadingState from '../../shared/loading-state';
import Modal from '../../shared/modal/modal';
import DeleteRecord from '../delete-record';
import MoreInfo from './more-info';
import styles from './record-details.module.scss';

type InvoiceDetailsProps = {
  recordId: string;
  setRecordDetailsState: Dispatch<SetStateAction<boolean>>;
};

const RecordDetails = ({
  recordId,
  setRecordDetailsState,
}: InvoiceDetailsProps) => {
  // STATES
  const [moreModalState, setMoreModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [recordDetails, setRecordDetails] = useState<
    (SalesRecordDetailsType & ExpenseRecordDetailsType) | null
  >(null);
  const [isService, setIsService] = useState(false);

  // HANDLERS
  const toggleDeleteModal = () => {
    setMoreModalState(false);
    setDeleteModalState(true);
  };

  // HOOKS
  const { data, isLoading, isSuccess } = useGetSingleRecordQuery(recordId, {
    refetchOnMountOrArgChange: true,
  });

  // SIDE EFFECTS
  useEffect(() => {
    if (isSuccess && !isEmpty(data?.data) && data?.data !== null) {
      const recordDetails: SalesRecordDetailsType & ExpenseRecordDetailsType =
        data?.data;
      setRecordDetails(recordDetails);
      setIsService(!isEmpty(recordDetails.services));
    }
  }, [isSuccess, data]);

  return (
    <>
      <Modal width_styling="30vw">
        {isLoading ? (
          <LoadingState heightTailwind="h-[70vh]" />
        ) : !isEmpty(recordDetails) && recordDetails != null ? (
          <>
            {moreModalState && (
              <MoreInfo
                recordType={recordDetails.type}
                recordId={recordId}
                setMoreModalState={setMoreModalState}
                onDeleteClick={toggleDeleteModal}
              />
            )}
            {deleteModalState && (
              <DeleteRecord
                setRecordDetailsState={setRecordDetailsState}
                recordId={recordId}
                cancelClick={() => setDeleteModalState(false)}
                setDeleteModalState={setDeleteModalState}
              />
            )}
            <div className="max-h-[90vh] w-full py-2 overflow-auto flex flex-col">
              {/* header column */}
              <div className={styles.container}>
                {/* header */}
                <div className="w-full flex justify-between items-center gap-1">
                  <p className="text-strong">
                    {recordDetails.customer.name !== null
                      ? recordDetails.customer.name
                      : recordDetails.description}
                  </p>

                  {/* more */}
                  <div className="inline-flex items-center gap-2">
                    <ByteIcon
                      onClick={() => setMoreModalState(true)}
                      icon="more"
                      size="18"
                    />
                    <div onClick={() => setRecordDetailsState(false)}>
                      <ByteIcon icon="close-circle" size="18" />
                    </div>
                  </div>
                </div>

                {/* card title and amount */}
                <div className="flex flex-col gap-1 w-full border-b border-[#D0D6DB] pb-3">
                  {/* title */}
                  <h5 className="font-normal text-sm text-[#808691]">
                    Total amount
                  </h5>

                  <h3
                    className={`text-2xl ${
                      recordDetails.type === 'sales'
                        ? 'text-[#19A97B]'
                        : 'text-[#CF4F66]'
                    } font-normal`}
                  >
                    ₦{recordDetails.totalAmount.toLocaleString('en-US')}
                  </h3>
                </div>

                {/* items */}
                <div className="flex w-full flex-col gap-2">
                  {/* title */}
                  <h3 className="text-sm text-[#808691] font-normal">Items:</h3>

                  {/* list */}
                  <ul className="w-full flex flex-col gap-3 border-b border-[#D0D6DB] pb-3">
                    {isService
                      ? (recordDetails.services as RecordService[]).map(
                          (service, index) => (
                            <li
                              key={index}
                              className="flex w-full items-start justify-between"
                            >
                              <p className="text-value text-neutral-09 w-[60%]">
                                {service.name}
                              </p>
                              <p className=" text-value w-[30%] text-neutral-08 mt-0 ">
                                ₦{service.cost.toLocaleString('en-US')}
                              </p>
                            </li>
                          )
                        )
                      : (recordDetails.products as RecordProduct[]).map(
                          (product, index) => (
                            <li
                              key={index}
                              className="flex flex-col gap-1 w-full"
                            >
                              <div className="flex w-full items-start justify-between">
                                <p className="text-value text-neutral-09 w-[60%]">
                                  {product.name}
                                </p>
                                <p className=" text-value text-neutral-08 w-[30%] mt-0 ">
                                  ₦{product.unitPrice.toLocaleString('en-US')}
                                </p>
                              </div>
                              <p className="text-label mt-0 text-neutral-06 ">
                                {`x${product.quantity} @ ₦
                                ${(
                                  product.quantity * product.unitPrice
                                ).toLocaleString('en-US')}`}
                              </p>
                            </li>
                          )
                        )}
                  </ul>
                </div>

                {/* customer details for sales record */}
                {recordDetails.type === 'sales' ? (
                  <div className="flex flex-space-between flex-align-center border-b border-[#D0D6DB] pb-3">
                    <div className="flex w-full items-center gap-3">
                      {/* image */}
                      <span className="inline-flex items-center justify-center">
                        <IconShadow
                          icon="d-cube-scan"
                          color="var(--neutral06)"
                          size="16"
                          className="grey small"
                        />
                      </span>

                      {/* name and number */}
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-normal text-[#15171F]">
                          {recordDetails?.customer?.name}
                        </label>
                        <p className="text-sm font-normal text-[#808691]">
                          {recordDetails?.customer?.phone}
                        </p>
                      </div>

                      {/* arrow */}
                      <ArrowRight2
                        className="ml-auto"
                        size="18"
                        color="#6A78D1"
                      />
                    </div>
                    <ByteIcon
                      icon="arrow-right-3"
                      size="18"
                      color="var(--white)"
                    />
                  </div>
                ) : null}

                {/* more information */}
                <div className="flex flex-col gap-6 w-full mt-auto">
                  {/* category */}
                  {recordDetails.type === 'expense' && (
                    <div className="flex flex-col gap-1 w-full">
                      <h4 className="font-normal text-sm text-[#808691]">
                        Category
                      </h4>

                      {recordDetails.expenseCategory ? (
                        <h5 className="text-[#15171F] text-sm font-normal">
                          {recordDetails.expenseCategory as string}
                        </h5>
                      ) : (
                        <span className="text-sm font-normal text-[#808691]">
                          Empty
                        </span>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <div className="flex flex-col gap-1 w-full">
                    <h4 className="font-normal text-sm text-[#808691]">
                      Description
                    </h4>

                    {recordDetails.description ? (
                      <h5 className="text-[#15171F] text-sm font-normal">
                        {recordDetails.description}
                      </h5>
                    ) : (
                      <span className="text-sm font-normal text-[#808691]">
                        No description
                      </span>
                    )}
                  </div>

                  {/* Payment method for sales */}
                  {recordDetails.type === 'sales' && (
                    <div className="flex flex-col gap-1 w-full">
                      <h4 className="font-normal text-sm text-[#808691]">
                        Payment method
                      </h4>

                      <h5 className="text-[#15171F] text-sm font-normal">
                        {recordDetails.paymentMethod}
                      </h5>
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex flex-col gap-1 w-full">
                    <h4 className="font-normal text-sm text-[#808691]">Date</h4>

                    <h5 className="text-[#15171F] text-sm font-normal">
                      {new Date(recordDetails.date).toDateString()}
                    </h5>
                  </div>

                  {/* See change history */}
                  <button className="text-[#6A78D1] text-sm font-normal inline-flex">
                    See change history
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-[70vh] text-gray-400 flex flex-col pt-3">
            <div className="w-full flex items-center gap-2">
              <div
                onClick={() => setRecordDetailsState(false)}
                className="mr-sm-2"
              >
                <ByteIcon icon="close-circle" size="18" />
              </div>
            </div>

            {/* content */}
            <div className="w-full h-full flex items-center justify-center">
              No data!
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RecordDetails;
