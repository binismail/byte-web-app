import { Bank } from 'iconsax-react';
import React, { MouseEventHandler } from 'react';
interface IBankItem {
  name: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const BankItem: React.FC<IBankItem> = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-align-center">
      <div className="mr-md-1 w-[30px] h-[30px] bg-gray-200 rounded-[50%] inline-flex items-center justify-center">
        <Bank size="16" color="#19A97B" variant="Bold" />
      </div>
      <p className="font-normal text-[#30333B] text-sm">{name}</p>
    </div>
  );
};

export default BankItem;
