import { Edit2, Trash } from 'iconsax-react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import Modal from '../../shared/modal/modal';

type Props = {
  onDeleteClick: () => void;
  setMoreModalState: Dispatch<SetStateAction<boolean>>;
  recordId: string;
  recordType: string;
};

const MoreRecordInfo = ({
  onDeleteClick,
  setMoreModalState,
  recordId,
  recordType,
}: Props) => {
  // DATA INITIALIZATION
  const router = useRouter();

  return (
    <Modal header={'More'} closeModal={() => setMoreModalState(false)}>
      {/* container */}
      <ul className="w-full flex flex-col gap-2 py-4">
        {/* edit details */}
        <li
          onClick={() => {
            router.push(
              `/dashboard/tools/record/edit/${recordType}/${recordId}`
            );
            setMoreModalState(false);
          }}
          className="text-[#30333B] text-sm font-normal inline-flex items-center gap-4 py-2 px-2 rounded-md active:bg-gray-300"
        >
          <Edit2 variant="Bold" size="20" color="#30333B" />
          Edit record details
        </li>

        {/* delete product */}
        <li
          onClick={onDeleteClick}
          className="text-[#CF4F66] text-sm font-normal inline-flex items-center gap-4 py-2 px-2 rounded-md active:bg-gray-300"
        >
          <Trash size="20" color="#CF4F66" />
          Delete record
        </li>
      </ul>
    </Modal>
  );
};

export default MoreRecordInfo;
