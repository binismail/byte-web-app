import { useState } from 'react';
import { BankType } from '../../../../pages/dashboard/home/home.types';
import BankItem from '../../../bank-item/bank-item';
import SearchInput from '../../../shared/input/search-input/search-input';

const Selectbank: React.FC<any> = ({ banks, onBankClick }) => {
  // STATES
  const [searchInput, setSearchInput] = useState<string>('');
  return (
    <div className="flex flex-col w-full justify-center px-3 pb-3 mt-6">
      {/* wrapper */}
      <div className="flex flex-col w-full gap-5">
        {/* search input */}
        <div className="flex w-full px-3 pb-5 border-b border-[#E6EAED]">
          <SearchInput
            value={searchInput}
            onChange={(e: Event) =>
              setSearchInput((e.target as HTMLInputElement).value)
            }
            placeholder="Search for a bank"
            type="text"
          />
        </div>

        {/* bank list container */}
        <div className="flex w-full flex-col gap-5 px-3">
          {banks
            ?.filter((bank: BankType) =>
              bank.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
            )
            ?.map((bank: BankType, index: number) => (
              <BankItem
                key={index}
                onClick={() => onBankClick(bank)}
                name={bank.name}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Selectbank;
