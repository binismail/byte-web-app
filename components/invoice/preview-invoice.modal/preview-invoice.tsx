import Image from 'next/image';
import { FormEvent } from 'react';
import {
  Product,
  Service,
  SingleInvoiceDetailsType,
} from '../../../pages/dashboard/tools/invoices/invoices.types';
import Button from '../../shared/butttons/button/button';
import IconShadow from '../../shared/icon/icon-shadow';
import Modal from '../../shared/modal/modal';
import styles from './preview-invoice.module.scss';

type PreviewInvoiceType = {
  onClose: () => void;
  isLoading: boolean;
  dirty: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  // values: {
  //   type: string;
  //   paymentMethod: string;
  //   discountPercentage: number;
  //   issuedDate: string;
  //   dueDate: string;
  //   products: Product[] | undefined;
  //   services?: Service[];
  //   subTotal: number;
  //   taxAmount: number;
  //   discountAmount: number;
  //   totalAmount: number;
  //   customer: Customer;
  // };
  isService: boolean;
  values: SingleInvoiceDetailsType;
};

function PreviewInvoice({
  onClose,
  values,
  isService,
  handleSubmit,
  dirty,
  isSubmitting,
  isValid,
  isLoading,
}: PreviewInvoiceType) {
  // DATA INITIALIZATION
  const localeTimeOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return (
    <Modal header="Preview invoice" closeModal={onClose} width_styling="30vw">
      <div className="h-[85vh] w-full overflow-auto flex items-center justify-center pb-2">
        <div className={styles.container}>
          {/* card */}
          <div className="flex flex-space-between flex-align-center border-b border-[#D0D6DB] pb-4">
            <div className="flex w-full items-center gap-3">
              {/* image */}
              {values?.customer?.image ? (
                <span className="rounded-[50%] bg-[#F0F2F5] h-[40px] w-[40px] inline-flex items-center justify-center">
                  <Image
                    className="rounded-[50%]"
                    height="40px"
                    width="40px"
                    src={values?.customer?.image as string}
                    alt=""
                  />
                </span>
              ) : (
                <span className="inline-flex items-center justify-center">
                  <IconShadow
                    icon="user"
                    color="var(--neutral06)"
                    size="22"
                    className="grey small !h-[50px] !w-[50px]"
                  />
                </span>
              )}

              {/* name and number */}
              <div className="inline-flex flex-col gap-1">
                <label className="text-sm text-[#15171F] font-normal">
                  {values?.customer?.name}
                </label>
                <p className="text-sm font-normal text-[#808691]">
                  {values?.customer?.phone}
                </p>
              </div>
            </div>
          </div>

          {/* container */}
          <div className="w-full flex flex-col">
            {/* items */}
            <div className={styles.invoiceContent}>
              {/* title */}
              <p className="text-secton-items">Items:</p>

              {/* content */}
              <div className="flex flex-col gap-3 w-full">
                {isService
                  ? (values.services as Service[]).map((service, index) => (
                      <div key={index} className="flex flex-col gap-1 w-full">
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
                  : (values?.products as Product[]).map((product, index) => (
                      <div key={index} className="flex flex-col gap-1 w-full">
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
                    <p className="text-label mt-0 text-neutral-06">Subtotal</p>
                    <p className="text-value text-neutral-08 mt-0 ">
                      {`₦${values.subTotal.toLocaleString('en-US')}`}
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-label mt-0 text-neutral-06">Tax</p>
                    <p className="text-value text-neutral-08 mt-0 ">
                      {`₦${values.taxAmount.toLocaleString('en-US')}`}
                    </p>
                  </div>
                  {values.discountPercentage > 0 ? (
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-label mt-0 text-neutral-06">
                        Discount ({values.discountPercentage}%){' '}
                      </p>
                      <p className=" text-value text-neutral-08 mt-0 ">
                        {`-₦${values.discountAmount.toLocaleString('en-US')}`}
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
                <p className={styles.footerAmount}>
                  ₦{values.totalAmount.toLocaleString('en-US')}
                </p>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className={styles.divider} />

          {/* footer: more information */}
          <div className="flex flex-col w-full gap-4">
            {/* date issue adn due date */}
            <div className="grid grid-cols-2 gap-x-2 items-center">
              <div className="inline-flex flex-col gap-1">
                <span className="text-label text-neutral-06">Date issued</span>
                <p className="text-value mt-0 text-neutral-09">
                  {`${new Date(values.issuedDate).toLocaleString(
                    'en-UK',
                    localeTimeOptions
                  )}`}
                </p>
              </div>
              <div className="inline-flex flex-col gap-1">
                <span className="text-label text-neutral-06">Expiry date </span>
                <p className="text-value mt-0 text-neutral-09">
                  {`${new Date(values.dueDate).toLocaleString(
                    'en-UK',
                    localeTimeOptions
                  )}`}
                </p>
              </div>{' '}
            </div>

            {/* payment method */}
            <div className="inline-flex flex-col gap-1">
              <span className="text-label text-neutral-06">
                Payment methods{' '}
              </span>
              <span className="text-value mt-0 text-neutral-09">
                {values.paymentMethod}
              </span>
            </div>

            {/* buttons */}
            <div className="flex flex-col w-full items-stretch gap-3 mt-2">
              <Button
                title="Go back"
                type="block"
                color="btnLight"
                click={onClose}
              />
              <Button
                loading={isLoading}
                disabled={!dirty || isSubmitting || !isValid}
                // click={() => setPreviewInvoiceState(true)}
                click={handleSubmit}
                title="Generate Invoice"
                iconPosition="right"
                icon="invoice"
                type="block"
                color="btnPrimary"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PreviewInvoice;
