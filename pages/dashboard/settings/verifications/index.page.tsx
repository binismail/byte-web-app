import { ArrowRight2 } from 'iconsax-react';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useEffect } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import ByteIcon from '../../../../components/shared/icon/byte.icon';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectUserDetails } from '../../../../lib/redux/userDetailsSlice/userDetailsSlice';
import { NextPageWithLayout } from '../../../_app.page';

const Verifications: NextPageWithLayout = () => {
  // DATA INITIALIZATION
  const userDetails = useAppSelector(selectUserDetails);

  useEffect(() => {
    console.log(userDetails);
  }, []);

  return (
    <div>
      <Head>
        <title>Verifications - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex w-full flex-col gap-6">
        {/* Personal verification */}
        <div className="flex flex-col border border-[#E6EAED] rounded-2xl px-4 py-6">
          <p className="border-b p-4 text-sm text-[#5864AE] font-normal border-[#D0D6DB]">
            Personal Verification
          </p>

          {/* BVN */}
          <Link
            href={
              userDetails.administrator.isBvnVerified
                ? ''
                : '/dashboard/settings/verifications/verify-bvn'
            }
          >
            <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
              {/* texts and icon */}
              <div className="inline-flex flex-col gap-1">
                <p className="text-base text-[#30333B] font-normal">BVN</p>

                {/* status */}
                <div className="inline-flex items-center gap-1">
                  {userDetails.administrator.isBvnVerified ? (
                    <ByteIcon
                      icon="tick-circle1"
                      color="var(--success)"
                      size={16}
                    />
                  ) : (
                    <ByteIcon icon="tick-circle" color="grey" size={16} />
                  )}
                  <span className="text-[13px] text-sm text-[#808691] font-normal">
                    Verified
                  </span>
                </div>
              </div>

              {/* arrow right */}
              <ArrowRight2 size="18" color="#808691" />
            </div>
          </Link>

          {/* IDENTITY DOCUMENT */}
          {/* <Link href="">
            <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
              texts and icon
              <div className="inline-flex flex-col gap-1">
                <p className="text-base text-[#30333B] font-normal">
                  Identity Document
                </p>

                status
                <div className="inline-flex items-center gap-1">
                  <ByteIcon icon="tick-circle" color="grey" size={16} />
                  <span className="text-[13px] text-sm text-[#808691] font-normal">
                    Not verified
                  </span>
                </div>
              </div>

              arrow right
              <ArrowRight2 size="18" color="#808691" />
            </div>
          </Link> */}
        </div>

        {/* Business verification */}
        {/* <div className="flex flex-col border border-[#E6EAED] rounded-2xl px-4 py-6">
          <p className="border-b p-4 text-sm text-[#5864AE] font-normal border-[#D0D6DB]">
            Business Verification
          </p>

          CAC REGISTRATION INFO
          <Link href="">
            <div className="flex items-center w-full py-4 px-6 gap-[10px] justify-between">
              <div className="inline-flex flex-col gap-1">
                <p className="text-base text-[#30333B] font-normal">
                  CAC registration info
                </p>

                <div className="inline-flex items-center gap-1">
                  <ByteIcon icon="tick-circle" color="grey" size={16} />
                  <span className="text-[13px] text-sm text-[#808691] font-normal">
                    Not verified
                  </span>
                </div>
              </div>

              <ArrowRight2 size="18" color="#808691" />
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

Verifications.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Verifications">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default Verifications;
