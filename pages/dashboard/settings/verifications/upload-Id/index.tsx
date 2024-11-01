import Head from 'next/head';
import { ReactElement } from 'react';
import DocumentUpload from '../../../../../components/document-upload/document-upload';
import DashboardLayout from '../../../../../components/layouts/dashboard-layout';
import Layout from '../../../../../components/layouts/layout';
import Button from '../../../../../components/shared/butttons/button/button';
import ByteIcon from '../../../../../components/shared/icon/byte.icon';
import Input from '../../../../../components/shared/input/input/input';
import Select from '../../../../../components/shared/selection/select';
import { NextPageWithLayout } from '../../../../_app.page';

export interface IInput {}

const list = [
  { label: 'Drivers License', value: 'Drivers License' },
  { label: 'National ID', value: 'National ID' },
];

const Verifications: NextPageWithLayout<IInput> = () => {
  return (
    <div>
      <Head>
        <title>Upload Id - Byte</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <div className="container-border-rounded">
          <div className="mx-md-1 my-md-2">
            <p className="text-body-lg-bold mb-0 text-neutral-09">
              Upload a valid ID
            </p>
            <div className="flex mt-0">
              <p className="text-value ">
                Upload a valid means of identification (NIN slip, Drivers
                license, International passport).
              </p>
            </div>
            <div className="form-group w-33">
              <label>ID Type</label>
              <Select list={list} placeholder="Select an ID type" />
            </div>
            <hr />

            <div className="form-group">
              <label>Drivers’ License</label>
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

            <div className="form-group w-33">
              <label>ID Type</label>
              <Input type="date" placeholder="Enter ID expiry date" />
            </div>
            <Button
              title="Submit ID Document"
              type="large"
              color="btnPrimary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Verifications.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout enableBackBtn={true} headerTitle="Upload Id">
        {page}
      </DashboardLayout>
    </Layout>
  );
};

export default Verifications;
