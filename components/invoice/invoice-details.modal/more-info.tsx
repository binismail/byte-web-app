import { Edit2, TickSquare, Trash } from 'iconsax-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import Modal from '../../shared/modal/modal';

type Props = {
  onDeleteClick: () => void;
  onMarkAsReadClick: () => void;
  setMoreModalState: Dispatch<SetStateAction<boolean>>;
  invoiceId: string;
};

const MoreInfo = ({
  onDeleteClick,
  setMoreModalState,
  onMarkAsReadClick,
  invoiceId,
}: Props) => {
  return (
    <Modal header={'More'} closeModal={() => setMoreModalState(false)}>
      {/* container */}
      <ul className="w-full flex flex-col gap-2 py-4">
        {/* edit details */}
        <Link href={`/dashboard/tools/invoices/edit-invoice/${invoiceId}`}>
          <li
            onClick={() => {
              setMoreModalState(false);
            }}
            className="text-[#30333B] text-sm font-normal inline-flex items-center gap-4 py-2 px-2 rounded-md active:bg-gray-300"
          >
            <Edit2 variant="Bold" size="20" color="#30333B" />
            Edit product details
          </li>
        </Link>

        {/* mark as paid */}
        <li
          onClick={onMarkAsReadClick}
          className="text-[#30333B] text-sm font-normal inline-flex items-center gap-4 py-2 px-2 rounded-md active:bg-gray-300"
        >
          <TickSquare variant="Bold" size="20" color="#30333B" />
          Mark as paid
        </li>

        {/* delete product */}
        <li
          onClick={onDeleteClick}
          className="text-[#CF4F66] text-sm font-normal inline-flex items-center gap-4 py-2 px-2 rounded-md active:bg-gray-300"
        >
          <Trash size="20" color="#CF4F66" />
          Delete product
        </li>
      </ul>
    </Modal>
  );
};

export default MoreInfo;
