import { ReactElement, useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import ByteIcon from '../../../../components/shared/icon/byte.icon';
import SuccessModal from '../../../../components/shared/modal/components/success/success.modal';
import Modal from '../../../../components/shared/modal/modal';
import { NextPageWithLayout } from '../../../_app';

export interface IInput {}

const Verifications: NextPageWithLayout<IInput> = () => {
  const [status, setStatus] = useState(false);

  return (
    <div>
      {status && (
        <Modal closeModal={() => setStatus(false)} header={''}>
          <SuccessModal
            buttonTitle="Done"
            buttonColor="btnLight"
            message="Your BVN has been verified."
            title="BVN successfully verified"
            closeModal={() => setStatus(false)}
          />
        </Modal>
      )}
      <div className="container-border-rounded">
        <p className="text-value text-primary-06 text-strong">
          Personal Verifiation
        </p>
        <hr></hr>

        <div className="flex flex-space-between ">
          <div className="mx-md-1 my-md-2">
            <p className="text-strong mb-0">BVN</p>
            <div className="flex mt-0">
              <p className="mr-md-1">
                <ByteIcon
                  icon="tick-circle1"
                  color="var(--success)"
                  size={16}
                />
              </p>
              <p className="text-label "> Verified</p>
            </div>
          </div>
          <div className="flex flex-align-center">
            <ByteIcon icon="arrow-right-21" color="grey" size={16} />
          </div>
        </div>

        <div className="flex flex-space-between">
          <div className="mx-md-1 my-md-2">
            <p className="text-strong mb-0">Identity Document</p>
            <div className="flex mt-0">
              <p className="mr-md-1">
                <ByteIcon icon="tick-circle" color="grey" size={16} />
              </p>
              <p className="text-label ">Not verified</p>
            </div>
          </div>

          <div className="flex flex-align-center">
            <ByteIcon icon="arrow-right-21" color="grey" size={16} />
          </div>
        </div>
      </div>

      <div className="container-border-rounded mt-md-2">
        <p className="text-value text-primary-06 text-strong">
          Business Verification{' '}
        </p>
        <hr></hr>

        <div className="flex flex-space-between">
          <div className="mx-md-1 my-md-2">
            <p className="text-strong mb-0">CAC registration info</p>
            <div className="flex mt-0">
              <p className="mr-md-1">
                <ByteIcon icon="tick-circle" color="grey" size={16} />
              </p>
              <p className="text-label ">Not verified</p>
            </div>
          </div>
          <div className="flex flex-align-center">
            <ByteIcon icon="arrow-right-21" color="grey" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

Verifications.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Verifications;
