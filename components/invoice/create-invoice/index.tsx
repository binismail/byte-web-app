import { Document } from 'iconsax-react';
import { useRouter } from 'next/router';
import Modal from '../../shared/modal/modal';

type Props = {
  closeModal: () => void;
};

const CreateInvoiceModal = ({ closeModal }: Props) => {
  // DATA INITIALIZATION
  const router = useRouter();

  return (
    <Modal header={' '} closeModal={closeModal}>
      <div className="w-full flex flex-col px-2 py-5 gap-8">
        {/* texts */}
        <div className=" text-center flex flex-col gap-1">
          {/* title*/}
          <h3 className="text-2xl text-[#30333B] font-normal">
            Invoice source
          </h3>

          {/* description */}
          <p className="text-sm text-[#565A63] font-normal">
            Where do you want to create your invoice from?
          </p>
        </div>

        {/* buttons*/}
        <div className="flex items-end justify-center w-full h-full">
          {/* create invoice from scratch */}
          <button
            onClick={() => {
              router.push('/dashboard/tools/invoices/create-invoice');
              closeModal();
            }}
            className="flex flex-col w-[15vw] items-center justify-center h-[20vh] gap-4 px-2 text-sm py-4 text-[#6A78D1] rounded-xl bg-[#E1E4F680]"
          >
            {/* icon */}
            <span className="p-4 rounded-[50%] inline-flex items-center justify-center bg-[#6A78D1]">
              <Document size="20" color="#FFF" variant="Bold" />
            </span>

            {/* text */}
            <p>From scratch</p>
          </button>

          {/* create invoice from sales record */}
          {/* <button className="flex flex-col w-full items-center justify-center h-full gap-4 px-2 text-sm py-4 text-[#6A78D1] rounded-xl bg-[#E1E4F680]">
            icon
            <span className="p-4 rounded-[50%] inline-flex items-center justify-center bg-[#6A78D1]">
              <Document size="20" color="#FFF" variant="Bold" />
            </span>

            text
            <p>From sales record</p>
          </button> */}
        </div>
      </div>
    </Modal>
  );
};

export default CreateInvoiceModal;
