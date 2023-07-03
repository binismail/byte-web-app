import { ReactElement } from 'react';
import DocumentUpload from '../../../../components/document-upload/document-upload';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Button from '../../../../components/shared/butttons/button/button';
import ByteIcon from '../../../../components/shared/icon/byte.icon';
import TextArea from '../../../../components/shared/textarea/textarea';
import { NextPageWithLayout } from '../../../_app.page';

export interface IInput {}

const Verifications: NextPageWithLayout<IInput> = () => {
  return (
    <div>
      <div className="container-border-rounded">
        <p className="text-value text-primary-06 text-strong">
          Send us a message{' '}
        </p>
        <hr></hr>
        <div className="mx-md-1 my-md-2">
          <div className="form-group">
            <label>ID Type</label>
            <TextArea rows={8} value="" placeholder="" />
          </div>

          <div className="form-group">
            <label>Attach file</label>
            <DocumentUpload />
          </div>
          <div className="flex flex-justify-center">
            <div className="flex flex-align-center">
              <p className="mr-md-1">
                {' '}
                <ByteIcon icon="info-circle" size={12} color="grey" />
              </p>
              <p className="text-value text-neutral-06">
                File must be an image and less than 2MB.{' '}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button title="Send" type="large" color="btnPrimary" />
            <p className="text-byte">Send via email</p>
          </div>
          <p className="hint " style={{ color: 'var(--grey-faded)' }}>
            We will respond to you via Byte Inbox
          </p>
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
