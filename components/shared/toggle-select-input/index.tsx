import { ArrowDown2 } from 'iconsax-react';
import { MouseEventHandler } from 'react';

type Props = {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  value?: string;
};

const ToggleSelectInput = ({ disabled, onClick, value = 'Select' }: Props) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`flex items-center gap-1 border border-[#B2B8C2] ${
        disabled ? 'bg-gray-200' : 'bg-white'
      } rounded-xl h-12 px-4`}
    >
      <h3 className="text-sm font-normal text-[#30333B] w-full">{value}</h3>

      <ArrowDown2 variant="TwoTone" size={16} color="#ACA6BA" />
    </div>
  );
};

export default ToggleSelectInput;
