import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { isEmpty } from '../../../helpers/is-emtpy';
import { useGetSingleInvoiceQuery } from '../../../lib/services/businessApi';
import { InvoiceDetailsType } from '../../../pages/dashboard/tools/invoices/invoices.types';
import Button from '../../shared/butttons/button/button';
import ByteIcon from '../../shared/icon/byte.icon';
import IconShadow from '../../shared/icon/icon-shadow';
import LoadingState from '../../shared/loading-state';
import Modal from '../../shared/modal/modal';
import DeleteInvoice from './delete-invoice';
import styles from './invoice-detail.module.scss';
import MarkAsPaid from './mark-as-paid';
import MoreInfo from './more-info';

type InvoiceDetailsProps = {
  invoiceId: string;
  setInvoiceDetailsState: Dispatch<SetStateAction<boolean>>;
};

const InvoiceDetail = ({
  invoiceId,
  setInvoiceDetailsState,
}: InvoiceDetailsProps) => {
  // DATA INITIALIZATION
  const localeTimeOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  // STATES
  const [moreModalState, setMoreModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [markPaidState, setMarkPaidState] = useState(false);
  const [invoiceDetails, setInvoiceDetails] =
    useState<InvoiceDetailsType | null>(null);
  const [isService, setIsService] = useState(false);

  // HANDLERS
  const toggleDeleteModal = () => {
    setMoreModalState(false);
    setDeleteModalState(true);
  };
  const toggleMarkAsPaid = () => {
    setMoreModalState(false);
    setMarkPaidState(true);
  };

  // HOOKS
  const { data, isLoading, isSuccess } = useGetSingleInvoiceQuery(invoiceId, {
    refetchOnMountOrArgChange: true,
  });

  // SIDE EFFECTS
  useEffect(() => {
    if (isSuccess && !isEmpty(data?.data) && data?.data !== null) {
      const singleInvoice: InvoiceDetailsType = data?.data;
      setInvoiceDetails(singleInvoice);
      setIsService(singleInvoice.type === 'service');
    }
  }, [isSuccess, data]);

  return (
    <>
      <Modal width_styling="30vw">
        {isLoading ? (
          <LoadingState heightTailwind="h-[70vh]" />
        ) : !isEmpty(invoiceDetails) && invoiceDetails != null ? (
          <>
            {moreModalState && (
              <MoreInfo
                invoiceId={invoiceId}
                setMoreModalState={setMoreModalState}
                onDeleteClick={toggleDeleteModal}
                onMarkAsReadClick={toggleMarkAsPaid}
              />
            )}
            {deleteModalState && (
              <DeleteInvoice
                setInvoiceDetailsState={setInvoiceDetailsState}
                invoiceId={invoiceId}
                cancelClick={() => setDeleteModalState(false)}
                setDeleteModalState={setDeleteModalState}
              />
            )}
            {markPaidState && (
              <MarkAsPaid
                setInvoiceDetailsState={setInvoiceDetailsState}
                invoiceId={invoiceId}
                cancelClick={() => setMarkPaidState(false)}
                setMarkPaidState={setMarkPaidState}
                isService={isService}
              />
            )}
            <div className="h-[85vh] w-full overflow-auto flex items-center justify-center py-4">
              <div className={styles.container}>
                {/* header */}
                <div className="w-full flex justify-between items-center gap-2">
                  <div className="inline-flex items-center gap-1">
                    <div
                      onClick={() => setInvoiceDetailsState(false)}
                      className="mr-sm-2"
                    >
                      <ByteIcon icon="close-circle" size="18" />
                    </div>

                    <ByteIcon
                      onClick={() => setMoreModalState(true)}
                      icon="more"
                      size="18"
                    />
                  </div>
                  <p className="text-strong">{`#${invoiceDetails.num}`}</p>
                </div>

                {/* card heading */}
                <div className={styles.cardByte}>
                  <div className="flex flex-space-between">
                    <div className="inline-flex flex-col gap-1">
                      <p className={`${styles.amount} + weight-400`}>
                        Amount due
                      </p>
                      <p className="text-h5 text-white mt-0">{`₦${invoiceDetails.totalAmount.toLocaleString(
                        'en-US'
                      )}`}</p>
                    </div>
                    <span
                      className={`${styles.status} h-fit ${
                        invoiceDetails.status === 'paid'
                          ? styles.paid
                          : invoiceDetails.status === 'unpaid'
                          ? styles.unpaid
                          : styles.overdue
                      }`}
                    >
                      {' '}
                      {invoiceDetails.status}
                    </span>
                  </div>

                  {/* divider */}
                  <div className={styles.divider}></div>

                  {/* customer info */}
                  <div className="flex flex-space-between flex-align-center ">
                    <div className="flex w-full items-center gap-3">
                      {/* image */}
                      {invoiceDetails?.customer?.image ? (
                        <span className="rounded-[50%] bg-[#F0F2F5] h-[40px] w-[40px] inline-flex items-center justify-center">
                          <Image
                            className="rounded-[50%]"
                            height="40px"
                            width="40px"
                            src={invoiceDetails?.customer?.image as string}
                            alt=""
                          />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center">
                          <IconShadow
                            icon="user"
                            color="var(--neutral06)"
                            size="16"
                            className="grey small"
                          />
                        </span>
                      )}

                      {/* name and number */}
                      <div>
                        <label className="text-value text-white">
                          {invoiceDetails?.customer?.name}
                        </label>
                        <p className="text-label mt-0 mb-0 text-primary-01">
                          {invoiceDetails?.customer?.phone}
                        </p>
                      </div>
                    </div>
                    <ByteIcon
                      icon="arrow-right-3"
                      size="18"
                      color="var(--white)"
                    />
                  </div>
                </div>

                {/* container */}
                <div className="w-full flex flex-col">
                  {/* card items */}
                  <div className={styles.invoiceContent}>
                    <div className="flex flex-space-between">
                      <p className="text-[#808691] text-base font-normal">
                        Items:
                      </p>
                      <p className="text-base text-[#6A78D1] font-normal">
                        Go to sales record
                      </p>
                    </div>

                    {/* content */}
                    <div className="flex flex-col gap-3 w-full">
                      {isService
                        ? invoiceDetails.services.map((service, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-1 w-full"
                            >
                              <div className="flex w-full items-start justify-between">
                                <p className="text-value text-neutral-09 w-[60%]">
                                  {service.name}
                                </p>
                                <p className=" text-value w-[30%] text-neutral-08 mt-0 ">
                                  ₦{service.cost.toLocaleString('en-US')}
                                </p>
                              </div>
                              <p className="text-label mt-0 text-neutral-06 ">
                                {`Tax (${service.taxPercentage}%)`}
                              </p>
                            </div>
                          ))
                        : invoiceDetails.products.map((product, index) => (
                            <div
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
                            </div>
                          ))}

                      {/* horizontal line */}
                      <hr className="my-2" />

                      {/* totals */}
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-label mt-0 text-neutral-06">
                            Subtotal
                          </p>
                          <p className="text-value text-neutral-08 mt-0 ">
                            {`₦${invoiceDetails.subTotal.toLocaleString(
                              'en-US'
                            )}`}
                          </p>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-label mt-0 text-neutral-06">Tax</p>
                          <p className="text-value text-neutral-08 mt-0 ">
                            {`₦${invoiceDetails.taxAmount.toLocaleString(
                              'en-US'
                            )}`}
                          </p>
                        </div>
                        {invoiceDetails.discountPercentage > 0 ? (
                          <div className="flex justify-between items-center gap-2">
                            <p className="text-label mt-0 text-neutral-06">
                              Discount ({invoiceDetails.discountPercentage}%){' '}
                            </p>
                            <p className=" text-value text-neutral-08 mt-0 ">
                              {`₦${invoiceDetails.discountAmount.toLocaleString(
                                'en-US'
                              )}`}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* total */}
                  <div className={styles.footer}>
                    <div className="flex flex-space-between">
                      <p className={styles.small}>Total</p>
                      <p
                        className={styles.footerAmount}
                      >{`₦${invoiceDetails.totalAmount.toLocaleString(
                        'en-US'
                      )}`}</p>
                    </div>
                  </div>
                </div>

                {/* footer: more information */}
                <div className="flex flex-col w-full gap-4">
                  {/* date issue adn due date */}
                  <div className="grid grid-cols-2 gap-x-2 items-center px-3">
                    <div className="inline-flex flex-col gap-1">
                      <span className="text-label text-neutral-06">
                        Date issued
                      </span>
                      <p className="text-value mt-0 text-neutral-09">
                        {`${new Date(invoiceDetails.issuedDate).toLocaleString(
                          'en-UK',
                          localeTimeOptions
                        )}`}
                      </p>
                    </div>
                    <div className="inline-flex flex-col gap-1">
                      <span className="text-label text-neutral-06">
                        Expiry date{' '}
                      </span>
                      <p className="text-value mt-0 text-neutral-09">
                        {`${new Date(invoiceDetails.dueDate).toLocaleString(
                          'en-UK',
                          localeTimeOptions
                        )}`}
                      </p>
                    </div>{' '}
                  </div>

                  {/* payment method */}
                  <div className="inline-flex flex-col gap-1 px-3">
                    <span className="text-label text-neutral-06">
                      Payment methods{' '}
                    </span>
                    <span className="text-value mt-0 text-neutral-09">
                      {invoiceDetails.paymentMethod}
                    </span>
                  </div>

                  {/* buttons */}
                  <div className="flex flex-col w-full items-stretch gap-3 mt-2">
                    <Button
                      // loading={isLoading}
                      // disabled={!dirty || isSubmitting || !isValid}
                      // click={() => setPreviewInvoiceState(true)}
                      // click={handleSubmit}
                      title="Share Invoice"
                      iconPosition="right"
                      icon="invoice"
                      type="block"
                      color="btnPrimary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-[70vh] text-gray-400 flex flex-col pt-2">
            <div className="w-full flex items-center gap-2">
              <div
                onClick={() => setInvoiceDetailsState(false)}
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

export default InvoiceDetail;
