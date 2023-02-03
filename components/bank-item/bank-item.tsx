import React from 'react';
import IconShadow from '../shared/icon/icon-shadow';
interface IBankItem {
  name: string;
}
const BankItem: React.FC<IBankItem> = ({ name }) => {
  return (
    <div className="flex flex-align-center my-md-1">
      <div className="mr-md-1">
        <IconShadow
          className="byte small"
          icon="bank"
          size="12"
          color="var(--primary01)"
        />
      </div>
      <p className="">{name}</p>
    </div>
  );
};

export default BankItem;
