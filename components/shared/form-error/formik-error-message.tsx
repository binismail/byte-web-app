import { Field, getIn } from 'formik';
import { Warning2 } from 'iconsax-react';

const FormikErrorMessage = ({ name }: { name: string }) => {
  return (
    <Field name={name}>
      {({ form }: any) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? (
          <div className="flex gap-1 items-center text-red-500 text-xs mt-2">
            <Warning2 size="14" color="#ef4444" />
            <p className="font-light mt-0 w-[95%]">{error}</p>
          </div>
        ) : null;
      }}
    </Field>
  );
};

export default FormikErrorMessage;
