import { RegStepProps } from '../../pages/auth/register/register.types';
import Button from '../shared/butttons/button/button';
import FormError from '../shared/form-error/form-error';
import Input from '../shared/input/input/input';

const FirstRegStep = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setProgress,
}: RegStepProps) => {
  return (
    <>
      <div className="form-group">
        <label>First name</label>
        <Input
          name="firstName"
          placeholder="Enter your first name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          type="text"
        />
        {touched.firstName && errors.firstName && (
          <FormError message={errors.firstName} />
        )}
      </div>
      <div className="form-group">
        <label>Last name</label>
        <Input
          placeholder="Enter your last name"
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          type="text"
        />
        {touched.lastName && errors.lastName && (
          <FormError message={errors.lastName} />
        )}
      </div>
      <div className="form-group">
        <label>Email address</label>
        <Input
          placeholder="Enter your email address"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          type="text"
        />
        {touched.email && errors.email && <FormError message={errors.email} />}
      </div>
      <div className="form-group">
        <label>Phone</label>
        <Input
          placeholder="Enter your phone number"
          name="phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phone}
          type="text"
        />
        {touched.phone && errors.phone && <FormError message={errors.phone} />}
      </div>

      {/* Button */}
      <div className="flex w-full flex-col items-stretch my-6">
        <Button
          disabled={
            !values.firstName ||
            !values.lastName ||
            !values.email ||
            !values.phone
          }
          click={() => setProgress(2)}
          color="btnPrimary"
          title="Continue"
        />
      </div>
    </>
  );
};

export default FirstRegStep;
