import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { useMarkInvoiceAsPaidMutation } from '../../../lib/services/businessApi';
import Button from '../../shared/butttons/button/button';
import Modal from '../../shared/modal/modal';

type Props = {
  cancelClick: () => void;
  setMarkPaidState: Dispatch<SetStateAction<boolean>>;
  setInvoiceDetailsState: Dispatch<SetStateAction<boolean>>;
  invoiceId: string;
  isService: boolean;
};

const MarkAsPaid = ({
  cancelClick,
  setMarkPaidState,
  setInvoiceDetailsState,
  invoiceId,
  isService,
}: Props) => {
  // HOOKS
  const [markAsPaid, { isLoading }] = useMarkInvoiceAsPaidMutation();

  // HANDLERS
  const handleMarkAsPaid = () => {
    markAsPaid({
      invoiceId,
      type: isService ? 'service' : 'product',
    })
      .unwrap()
      .then(() => {
        setMarkPaidState(false);
        setInvoiceDetailsState(false);
        toast.success(`Invoice updated successfully!`);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error?.data?.message || `Couldn't updated invoice`);
      });
  };

  return (
    // <Modal header={'More'} closeModal={() => setMoreModalState(false)}>
    <Modal header={''}>
      {/* container */}

      <div className="flex w-full flex-col text-center gap-5 py-6">
        {/* texts */}
        <div className="flex flex-col gap-2">
          {/* title */}
          <h3 className="text-xl text-[#30333B] font-normal">
            Mark invoice as paid
          </h3>

          {/* description */}
          <h5 className="text-sm text-[#565A63] font-normal">
            Mark this invoice as paid only if you’ve received the amount due via
            a payment method outside the online payment option. Once done, this
            action is irreversible. Do you wish to mark this invoice as paid?
          </h5>
        </div>

        {/* buttons */}
        <div className="flex w-full items-center justify-between gap-2">
          {/* cancel */}
          <button
            onClick={cancelClick}
            className="text-[#6A78D1] inline-flex items-center justify-center w-[40%]"
          >
            Cancel
          </button>

          {/* delete */}
          <div className="w-full flex-col items-stretch">
            <Button
              click={handleMarkAsPaid}
              loading={isLoading}
              color="btnLight"
              title="Mark as paid"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MarkAsPaid;
