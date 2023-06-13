import { ReactElement } from 'react';
import DocumentUpload from '../../../../components/document-upload/document-upload';
import DashboardLayout from '../../../../components/layouts/dashboard-layout';
import Layout from '../../../../components/layouts/layout';
import Button from '../../../../components/shared/butttons/button/button';
import ByteIcon from '../../../../components/shared/icon/byte.icon';
import Input from '../../../../components/shared/input/input/input';
import Select from '../../../../components/shared/selection/select';
import { NextPageWithLayout } from '../../../_app';

export interface IInput {}

const list = [
  { label: 'Drivers License', value: 'Drivers License' },
  { label: 'National ID', value: 'National ID' },
];

const Verifications: NextPageWithLayout<IInput> = () => {
  return (
    <div>
      <div className="container-border-rounded">
        <div className="mx-md-1 my-md-2">
          <div className="flex gap-1 form-group">
            <div className="form-group">
              <label>Business registration type</label>
              <Select list={list} placeholder="Choose business types" />
            </div>

            <div className="form-group w-33">
              <label>RC Number</label>
              <Input type="text" placeholder="Select an ID type" />
            </div>

            <div className="form-group w-33">
              <label>Date of incoporation</label>
              <Input type="date" placeholder="Select an ID type" />
            </div>
          </div>

          <div className="flex gap-1 form-group w-33">
            <div className="form-group">
              <label>Industry/Nature of business</label>
              <Select list={list} placeholder="Drivers License" />
            </div>
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
          <Button title="Submit ID Document" type="large" color="btnPrimary" />
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
