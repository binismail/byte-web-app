import { Dispatch, SetStateAction } from 'react';

type Props = {
  setIsSent: Dispatch<SetStateAction<boolean>>;
  isSent: boolean;
};

const AnalyticsTab = ({ setIsSent, isSent }: Props) => {
  return (
    <div className="flex items-center mx-auto">
      {/* Received */}
      <button
        onClick={() => setIsSent(false)}
        className={`${
          !isSent
            ? 'bg-[#F0F2F5] hover:bg-gray-200'
            : 'bg-white hover:bg-[#fbfbfb]'
        } [border-width:1px_0_1px_1px] border-[D0D6DB] py-4 px-24 text-[#565A63] font-normal text-base rounded-l-2xl`}
      >
        Received
      </button>

      {/* Sent */}
      <button
        onClick={() => setIsSent(true)}
        className={`${
          isSent
            ? 'bg-[#F0F2F5] hover:bg-gray-200'
            : 'bg-white hover:bg-[#fbfbfb]'
        } border border-[D0D6DB] py-4 px-24 text-[#565A63] font-normal text-base rounded-r-2xl`}
      >
        Sent
      </button>
    </div>
  );
};

export default AnalyticsTab;
