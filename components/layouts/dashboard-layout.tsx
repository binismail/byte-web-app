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
}

// DASHBOARDLAYOUT COMPONENT
const DashboardLayout = ({ children }: IDashboard) => {
  // STATES
  const [status, setStatus] = useState(false);

  // DATA INITIALIZATION
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  return (
    <div className="grid-container">
      {status && (
        <Modal closeModal={() => setStatus(false)} header={'Make a payment'}>
          <VerifyPhone />
        </Modal>
      )}

      {/* HEADER */}
      <header className="header">
        <div className="header-container">
          <div className="header-title">
            <p>Home</p>
          </div>
          <div className="header-profile">
            <Notification size="24" color="#232846" variant="Bold" />
            <div className="image-container">
              <Image
                className="image"
                src={profile}
                width="30px"
                height="30px"
                alt="logo"
              />
            </div>
            <div className="profile-desc">
              <p>Cynthia Williams</p>
              <p>Fresh market stores</p>
            </div>
            <ArrowDown2 size="16" color="#30333B" variant="Bold" />
          </div>
        </div>
      </header>

      {/* ASIDE TAG */}
      <aside className="aside">
        <div className="aside-header">
          <Image src={logo} alt="logo" width="80px" height="80px" />
        </div>

        {/* ASIDE CHILD CONTAINER */}
        <div className="aside-menu">
          {/* DASHBOARD LIST CONTAINER */}
          <ul className="flex flex-col gap-6">
            {/* HOME */}
            <ActiveLink href={'/dashboard'} text="Home" Icon={Home2} />

            {/* TOOLS */}
            <ActiveLink
              href={'/dashboard/tools'}
              text="Tools"
              Icon={Briefcase}
            />

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
        </div>

        {/* LOGOUT */}
        <div className="aside-footer items-center">
          {isLoading ? (
            <span className="font-normal text-base text-[#808691]">
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
              className="font-normal cursor-pointer text-base text-[#808691] flex items-center gap-3 hover:text-[#6A78D1]"
            >
              <LogoutCurve size="20" color="#808691" variant="Outline" />
              Log out
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CHILDREN */}
      <main className="main">
        <div className="main-content">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
