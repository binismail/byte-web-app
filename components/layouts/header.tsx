import { ArrowDown2, ArrowLeft, Notification, User } from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isEmpty } from '../../helpers/is-emtpy';
import { useAppSelector } from '../../hooks/hooks';
import { selectUserDetails } from '../../lib/redux/userDetailsSlice/userDetailsSlice';

type Props = {
  headerTitle: string;
  loading: boolean;
  enableBackBtn?: boolean;
};

const LayoutHeader = ({
  headerTitle = 'Home',
  loading,
  enableBackBtn,
}: Props) => {
  // DATA INITIALZIATION
  const router = useRouter();
  const {
    name,
    administrator: { firstName, lastName, identityImageUrl },
  } = useAppSelector(selectUserDetails);

  return (
    <header className="h-[12%] w-full py-4 px-20 border-b border-[#E6EAED]">
      <div className="h-full flex w-full justify-between items-center">
        {/* header title */}
        <div className="inline-flex items-center gap-6">
          {/* back button */}
          {enableBackBtn ? (
            <div
              role="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size="24" color="#565A63" />

              <span className="text-[#808691] text-sm font-normal">Back</span>
            </div>
          ) : null}

          {/* title */}
          <p className="text-lg font-normal text-[#30333B]">{headerTitle}</p>
        </div>

        {/* header profile */}
        <div className="flex gap-4 items-center">
          {/* Notification icon */}
          <Notification size="28" color="#232846" variant="Bold" />

          {/* Image */}
          <div className="inline-flex items-center justify-center border-[3px] border-[#6A78D1] [box-shadow:0px_0px_0px_4px_rgba(106,120,209,0.4)] rounded-[50%] h-[30px] w-[30px] bg-gray-100">
            {isEmpty(identityImageUrl) ? (
              <User size="18" color="#000000" variant="Linear" />
            ) : (
              <Image
                className="rounded-[50%]"
                src={identityImageUrl || ''}
                width="30px"
                height="30px"
                alt="profile image"
              />
            )}
          </div>

          {/* Profile Name */}
          <div className="flex flex-col font-normal text-sm">
            {loading ? (
              'Loading'
            ) : (
              <>
                <p className="text-[#30333B">{`${firstName} ${lastName}`}</p>
                <p className="text-[#808691]">{`${name}`}</p>
              </>
            )}
          </div>

          {/* Arrow */}
          <ArrowDown2 size="16" color="#30333B" variant="Bold" />
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
