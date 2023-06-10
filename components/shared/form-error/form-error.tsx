import { Warning2 } from 'iconsax-react';

type Props = {
  message: string;
};

const FormError = ({ message }: Props) => {
  return (
    <div className="flex gap-1 items-center text-red-500 text-xs mt-2">
      <Warning2 size="14" color="#ef4444" />
      <p className="font-light mt-0 w-[95%]">{message}</p>
    </div>
  );
};

export default FormError;
