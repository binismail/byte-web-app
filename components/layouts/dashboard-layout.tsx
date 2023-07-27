import { ReactElement, useEffect, useState } from 'react';
import logo from '../../public/logo.svg';

import { Briefcase, CardPos, Home2, LogoutCurve, People } from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Modal from '../../components/shared/modal/modal';
import VerifyPhone from '../../components/verify-phone/verify-phone';
import { isEmpty } from '../../helpers/is-emtpy';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout, selectUserId } from '../../lib/redux/authSlice/authSlice';
import {
  clearUserDetails,
  setUserDetails,
} from '../../lib/redux/userDetailsSlice/userDetailsSlice';
import {
  useGetUserInformationQuery,
  useLogoutUserMutation,
} from '../../lib/services/businessApi';
import ActiveLink from '../shared/active-link/active-link';
import LayoutHeader from './header';

// IDASHBOARD INTERFACE
export interface IDashboard {
  children: ReactElement;
  headerTitle?: string;
  backBtn?: boolean;
  enableBackBtn?: boolean;
}

// DASHBOARDLAYOUT COMPONENT
const DashboardLayout = ({
  children,
  headerTitle = 'Home',
  enableBackBtn,
}: IDashboard) => {
  // STATES
  const [status, setStatus] = useState(false);

  // DATA INITIALIZATION
  const router = useRouter();
  const userId: string = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  // HOOKS
  const {
    data: userDetails,
    isLoading: getUserDetailsLoading,
    isError: getUserDetailsError,
  } = useGetUserInformationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();

  // SIDE EFFETS
  useEffect(() => {
    if (!getUserDetailsError && !isEmpty(userDetails)) {
      dispatch(setUserDetails(userDetails?.data));
    }
  }, [userDetails, getUserDetailsError]);

  return (
    <div className="max-h-[98vh] w-full flex">
      {status && (
        <Modal closeModal={() => setStatus(false)} header={'Make a payment'}>
          <VerifyPhone />
        </Modal>
      )}

      {/* ASIDE TAG */}
      <aside className="flex flex-col h-screen w-[20%] border-r border-[#E6EAED] pt-7 pb-16 gap-5">
        <div className="aside-header">
          <Image src={logo} alt="logo" width="80px" height="80px" />
        </div>

        {/* DASHBOARD LIST CONTAINER */}
        <ul className="flex flex-col gap-6 w-[70%] ml-auto">
          {/* HOME */}
          <ActiveLink
            exact={true}
            href={'/dashboard'}
            text="Home"
            Icon={Home2}
          />

          {/* TOOLS */}
          <ActiveLink href={'/dashboard/tools'} text="Tools" Icon={Briefcase} />

          {/* PAYMENTS */}
          <ActiveLink
            href={'/dashboard/payment'}
            text="Payments"
            Icon={CardPos}
          />

          {/* NETWORK */}
          <ActiveLink
            href={'/dashboard/settings'}
            text="Settings"
            Icon={People}
          />
        </ul>

        {/* LOGOUT */}
        <div className="flex w-[70%] ml-auto mt-auto">
          {logoutLoading ? (
            <span className="font-normal inline-flex items-center gap-2 text-base text-[#6A78D1]">
              <RotatingLines
                strokeColor="#6A78D1"
                strokeWidth="4"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
              Siging out...
            </span>
          ) : (
            <div
              onClick={() => {
                logoutUser({
                  userId,
                })
                  .unwrap()
                  .then(() => {
                    router.replace('/auth/login');
                    dispatch(logout());
                    dispatch(clearUserDetails());
                  })
                  .catch((error) => {
                    toast.error(error?.data?.message || 'Logout failed!');
                  });
              }}
              className="font-normal cursor-pointer text-base text-[#808691] flex items-center gap-4 hover:text-[#6A78D1]"
            >
              <LogoutCurve size="20" color="#808691" variant="Outline" />
              Log out
            </div>
          )}
        </div>
      </aside>

      {/* CONTAINER */}
      <div className="flex flex-col h-screen w-[80%]">
        {/* HEADER */}
        <LayoutHeader
          enableBackBtn={enableBackBtn}
          headerTitle={headerTitle}
          loading={getUserDetailsLoading}
        />

        {/* MAIN CHILDREN */}
        <main className="w-full h-full py-8 px-16 flex items-center justify-center overflow-auto">
          <div className="w-full h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
