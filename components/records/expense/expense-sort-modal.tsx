import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import Modal from '../../shared/modal/modal';

type Props = {
  setSortModalStatus: Dispatch<SetStateAction<boolean>>;
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
  setAscending: Dispatch<SetStateAction<boolean>>;
  ascending: boolean;
};

const ExpenseSortModal = ({
  setSortModalStatus,
  setFilter,
  filter,
  setAscending,
  ascending,
}: Props) => {
  // DATA INITIALIZATION
  const sortItems = [
    {
      content: 'Sort by name',
      id: 1,
      sortData: 'description',
    },
    {
      content: 'Sort by amount',
      id: 2,
      sortData: 'totalAmount',
    },
    {
      content: 'Sort by date',
      id: 3,
      sortData: 'date',
    },
  ];
  const ascendingItems = [
    {
      content: 'Ascending',
      value: true,
    },
    {
      content: 'Descending',
      value: false,
    },
  ];

  //   HANDLERS
  const handleSortClick = (filterName: string) => {
    setFilter(filterName);
    setSortModalStatus(false);
  };
  const handleAscendingClick = (isAscending: boolean) => {
    setAscending(isAscending);
    setSortModalStatus(false);
  };

  return (
    <Modal
      header={'Sorting'}
      closeModal={() => setSortModalStatus((prevState: boolean) => !prevState)}
    >
      <div className="w-full flex flex-col pt-3 pb-3">
        {/* sorts */}
        <ul className="flex flex-col w-full text-sm gap-4 py-3 font-normal text-[#30333B]">
          {sortItems.map((items) => (
            <li
              onClick={() => {
                handleSortClick(items.sortData);
              }}
              key={items.id}
              className="px-3 flex items-center w-full justify-between rounded-md active:bg-gray-200 py-2"
            >
              {items.content}
              {/* icon */}
              {filter === items.sortData && (
                <Image
                  priority
                  src="/image/checkmark.svg"
                  height={12}
                  width={12}
                  alt="checkmark"
                />
              )}
            </li>
          ))}
        </ul>

        {/* ascending */}
        {/* sorts */}
        <ul className="flex flex-col w-full text-sm gap-4 py-3 font-normal text-[#30333B] border-t border-gray-200">
          {ascendingItems.map((items, index) => (
            <li
              onClick={() => {
                handleAscendingClick(items.value);
              }}
              key={index}
              className="px-3 flex items-center w-full justify-between rounded-md active:bg-gray-200 py-2"
            >
              {items.content}
              {/* icon */}
              {ascending === items.value && (
                <Image
                  priority
                  src="/image/checkmark.svg"
                  height={12}
                  width={12}
                  alt="checkmark"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ExpenseSortModal;
