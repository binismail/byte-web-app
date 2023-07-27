import { ReactElement, useEffect, useState } from 'react';
import Switch from 'react-switch';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';

import Head from 'next/head';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectUserDetails } from '../../../../lib/redux/userDetailsSlice/userDetailsSlice';
import { useTogglePushNotificationMutation } from '../../../../lib/services/businessApi';
import { NextPageWithLayout } from '../../../_app.page';

const Notifications: NextPageWithLayout = () => {
  // STATES
  const [isNotificationToggel, setIsNotificationToggled] = useState(true);

  // HOOKS
  const [toggleNotifications, { isLoading }] =
    useTogglePushNotificationMutation();

  // DATA INITIALIZATION
  const userDetails = useAppSelector(selectUserDetails);

  // HANDLERS
  const handleNotificationToggle = () => {
    toggleNotifications()
      .unwrap()
      .then((data: any) => {
        toast.success(data?.message || `Password updated successfully!`);
      })
      .catch((error: any) => {
        toast.error(error?.data?.message || `Failed to update password`);
      });
  };

  // SIDE EFFECTS
  useEffect(() => {
    setIsNotificationToggled(userDetails.isPushEnabled as boolean);
  }, [userDetails.isPushEnabled]);

  return (
    <div>
      <Head>
        <title>Notifications - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex w-full flex-col gap-6">
        {/* push notification */}
        <div className="flex flex-col border border-[#E6EAED] rounded-2xl px-4 py-6">
          <p className="border-b p-4 text-sm text-[#5864AE] font-normal border-[#D0D6DB]">
            Push Notifications
          </p>

          {/* new deals */}
          <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
            <p className="text-base text-[#30333B] font-normal">New Deals</p>
            <div className="flex flex-align-center">
              <Switch
                onColor="#19A97B"
                offColor="#D0D6DB"
                checkedIcon={false}
                uncheckedIcon={false}
                disabled={isLoading}
                activeBoxShadow="0 0 1px 1px #D0D6DB"
                onChange={handleNotificationToggle}
                checked={isNotificationToggel}
              />
            </div>
          </div>

          {/* transactions */}
          <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
            <p className="text-base text-[#30333B] font-normal">Transactions</p>
            <div className="flex flex-align-center">
              <Switch
                onColor="#19A97B"
                offColor="#D0D6DB"
                checkedIcon={false}
                uncheckedIcon={false}
                disabled={isLoading}
                activeBoxShadow="0 0 1px 1px #D0D6DB"
                onChange={handleNotificationToggle}
                checked={isNotificationToggel}
              />
            </div>
          </div>

          {/* recommenations */}
          <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
            <p className="text-base text-[#30333B] font-normal">
              Recommendations
            </p>
            <div className="flex flex-align-center">
              <Switch
                onColor="#19A97B"
                offColor="#D0D6DB"
                checkedIcon={false}
                uncheckedIcon={false}
                disabled={isLoading}
                activeBoxShadow="0 0 1px 1px #D0D6DB"
                onChange={handleNotificationToggle}
                checked={isNotificationToggel}
              />
            </div>
          </div>
        </div>

        {/* How you get notifications */}
        <div className="flex flex-col border border-[#E6EAED] rounded-2xl px-4 py-6">
          <p className="border-b p-4 text-sm text-[#5864AE] font-normal border-[#D0D6DB]">
            How you get notifications
          </p>

          {/* browser */}
          <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
            <p className="text-base text-[#30333B] font-normal">Browser</p>
            <div className="flex flex-align-center">
              <Switch
                onColor="#19A97B"
                offColor="#D0D6DB"
                checkedIcon={false}
                uncheckedIcon={false}
                activeBoxShadow="0 0 1px 1px #D0D6DB"
                onChange={(e) => console.log(e)}
                readOnly
                disabled={true}
                checked={true}
              />
            </div>
          </div>

          {/* email */}
          <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
            <p className="text-base text-[#30333B] font-normal">Email</p>
            <div className="flex flex-align-center">
              <Switch
                onColor="#19A97B"
                offColor="#D0D6DB"
                checkedIcon={false}
                uncheckedIcon={false}
                activeBoxShadow="0 0 1px 1px #D0D6DB"
                disabled={true}
                readOnly
                onChange={(e) => console.log(e)}
                checked={true}
              />
            </div>
          </div>

          {/* mobile only */}
          <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
            <div className="inline-flex flex-col gap-1">
              <p className="text-base text-[#30333B] font-normal">
                Mobile only
              </p>
              <p className="font-normal text-[13px] text-[#808691]">
                Receive notifications only on mobile device
              </p>
            </div>
            <div className="flex flex-align-center">
              <Switch
                onColor="#19A97B"
                offColor="#D0D6DB"
                checkedIcon={false}
                uncheckedIcon={false}
                activeBoxShadow="0 0 1px 1px #D0D6DB"
                onChange={() =>
                  setIsNotificationToggled((prevState) => !prevState)
                }
                disabled={true}
                checked={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Notifications.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Notifications">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default Notifications;
