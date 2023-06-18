import { ReactElement, useState } from 'react';
import profile from '../../public/image/profile.jpg';
import logo from '../../public/logo.svg';

import {
  ArrowDown2,
  Briefcase,
  CardPos,
  Home2,
  LogoutCurve,
  Notification,
  People,
} from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Modal from '../../components/shared/modal/modal';
import VerifyPhone from '../../components/verify-phone/verify-phone';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout, selectUserId } from '../../lib/redux/authSlice/authSlice';
import { useLogoutMutation } from '../../lib/services/businessApi';
import ActiveLink from '../shared/active-link/active-link';

// IDASHBOARD INTERFACE
export interface IDashboard {
  children: ReactElement;
  headerTitle?: string;
  backBtn?: boolean;
}

// DASHBOARDLAYOUT COMPONENT
const DashboardLayout = ({ children, headerTitle = 'Home' }: IDashboard) => {
  // STATES
  const [status, setStatus] = useState(false);

  // DATA INITIALIZATION
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

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
          <ActiveLink href={'/dashboard'} text="Home" Icon={Home2} />

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
            href={'/dashboard/network'}
            text="Network"
            Icon={People}
          />
        </ul>

        {/* LOGOUT */}
        <div className="flex w-[70%] ml-auto mt-auto">
          {isLoading ? (
            <span className="font-normal text-base text-[#6A78D1]">
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
        <header className="h-[12%] w-full py-4 px-20 border-b border-[#E6EAED]">
          <div className="h-full flex w-full justify-between items-center">
            {/* header title */}
            <div className="text-lg font-normal text-[#30333B]">
              <p>{headerTitle}</p>
            </div>

            {/* header profile */}
            <div className="flex gap-4 items-center">
              {/* Notification icon */}
              <Notification size="28" color="#232846" variant="Bold" />

              {/* Image */}
              <div className="inline-flex items-center justify-center border-[3px] border-[#6A78D1] [box-shadow:0px_0px_0px_4px_rgba(106,120,209,0.4)] rounded-[50%]">
                <Image
                  className="rounded-[50%]"
                  src={profile}
                  width="30px"
                  height="30px"
                  alt="profile image"
                />
              </div>

              {/* Profile Name */}
              <div className="flex flex-col font-normal text-sm">
                <p className="text-[#30333B">Cynthia Williams</p>
                <p className="text-[#808691]">Fresh market stores</p>
              </div>

              {/* Arrow */}
              <ArrowDown2 size="16" color="#30333B" variant="Bold" />
            </div>
          </div>
        </header>

        {/* MAIN CHILDREN */}
        <main className="w-full h-full py-8 px-16 flex items-center justify-center overflow-auto">
          <div className="w-full h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
