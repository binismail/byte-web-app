import { FormikErrors, FormikTouched } from 'formik';
import { Dispatch, SetStateAction } from 'react';

export type RegisterProps = {
  businessName: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
};

export type RegStepProps = {
  values: RegisterProps;
  handleChange: any;
  handleBlur: any;
  touched: FormikTouched<RegisterProps>;
  errors: FormikErrors<RegisterProps>;
  setProgress: Dispatch<SetStateAction<number>>;
  handleSubmit?: any;
  isLoading?: boolean;
};
