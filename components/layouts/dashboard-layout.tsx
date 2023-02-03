import logo from '../../public/logo.svg';
import profile from '../../public/image/profile.jpg';
import React, { useState } from 'react';

import Image from 'next/image';
import ByteIcon from '../../components/shared/icon/byte.icon';
import Modal from '../../components/shared/modal/modal';
// import MakePayment from './payment/make-payment/make-payment';
// import FundWalletBank from './payment/fund-wallet/components/fund-wallet-bank/fund-wallet-card ';
// import FundWalletCard from './payment/fund-wallet/components/fund-wallet-card/fund-wallet-transfer-card';
// import SuccessModal from '../../components/shared/modal/components/success/success.modal';
// import FailedModal from '../../components/shared/modal/components/failed/failed.modal';
// import SendMoney from './payment/make-payment/components/send-money/send-money';
// import Selectbank from './payment/make-payment/components/select-bank/select-bank';
// import ConfirmTransaction from './payment/make-payment/components/confirm-transaction/confirm-transaction ';
import VerifyPhone from '../../components/verify-phone/verify-phone';

export interface IDashboard {
  children: any;
}

const DashboardLayout: React.FC<IDashboard> = ({ children }) => {
  const [status, setStatus] = useState(false);

  return (
    <div className="grid-container">
      {status && (
        <Modal closeModal={() => setStatus(false)} header={'Make a payment'}>
          <VerifyPhone />
        </Modal>
      )}
      <header className="header">
        <div className="header-container">
          <div className="header-title">
            <p>Home</p>
          </div>
          <div className="header-profile">
            <ByteIcon
              style={{ marginTop: '26px' }}
              icon="notification1"
              size={26}
              color="var(--primary09)"
            />{' '}
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
            <ByteIcon
              style={{ marginTop: '30px' }}
              icon="arrow-down-1"
              size={12}
              color="var(--primary09)"
            />{' '}
          </div>
        </div>
      </header>
      <aside className="aside">
        <div className="aside-header">
          <Image src={logo} alt="logo" width="80px" height="80px" />
        </div>
        <div className="aside-menu">
          <ul>
            <li className="link-item">
              <ByteIcon
                style={{ marginBottom: '-4px' }}
                icon="home-2"
                size={20}
                color="var(--neutral06)"
              />{' '}
              Home
            </li>
            <li className="link-item">
              {' '}
              <ByteIcon
                style={{ marginBottom: '-4px' }}
                icon="briefcase"
                size={20}
                color="var(--neutral06)"
              />{' '}
              Tools
            </li>
            <li className="link-item">
              {' '}
              <ByteIcon
                style={{ marginBottom: '-4px' }}
                icon="card-pos"
                size={20}
                color="var(--neutral06)"
              />{' '}
              Payments
            </li>
            <li className="link-item">
              {' '}
              <ByteIcon
                style={{ marginBottom: '-4px' }}
                icon="people"
                size={20}
                color="var(--neutral06)"
              />{' '}
              Network
            </li>
          </ul>
        </div>
        <div className="aside-footer">
          <p className="link-item">
            {' '}
            <ByteIcon
              style={{ marginBottom: '-4px' }}
              icon="logout"
              size={20}
              color="var(--neutral06)"
            />{' '}
            Log out
          </p>
        </div>
      </aside>
      <main className="main">
        <div className="main-content">{children}</div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
};

export default DashboardLayout;
