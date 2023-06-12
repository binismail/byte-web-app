import { RegStepProps } from '../../pages/auth/register/register.types';
import Button from '../shared/butttons/button/button';
import FormError from '../shared/form-error/form-error';
import Input from '../shared/input/input/input';
import PasswordInput from '../shared/input/password-input/password-input';

const SecondRegStep = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setProgress,
  handleSubmit,
  isLoading,
}: RegStepProps) => {
  return (
    <>
      <div className="form-group">
        <label>Business name</label>
        <Input
          placeholder="Enter your business name"
          name="businessName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.businessName}
          type="text"
        />
        {touched.businessName && errors.businessName && (
          <FormError message={errors.businessName} />
        )}
      </div>
      <div className="form-group">
        <label>Passoword</label>
        <PasswordInput
          name={'password'}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your password"
        />
        {touched.password && errors.password && (
          <FormError message={errors.password} />
        )}
      </div>
      <div className="form-group">
        <label>Confirm password</label>
        <PasswordInput
          name={'repeatPassword'}
          value={values.repeatPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Confirm password"
        />
        {touched.repeatPassword && errors.repeatPassword && (
          <FormError message={errors.repeatPassword} />
        )}
      </div>

      {/* Button */}
      <div className="flex justify-between gap-3 items-center w-full mb-6">
        <Button click={() => setProgress(1)} title="Back" color="btnLight" />

        <Button
          disabled={isLoading}
          loading={isLoading}
          click={handleSubmit}
          color="btnPrimary"
          title="Continue"
        />
      </div>
    </>
  );
};

export default SecondRegStep;
