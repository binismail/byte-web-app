import { SalesRecordType } from '../../tools/record/records.types';
import { IRecentTable } from './recent-table';

const base: IRecentTable<SalesRecordType> = {
  header: [],
  recents: [],
  filter: '',
  isAscending: true,
  loading: false,
};

export const mockRecentTableProps = {
  base,
};
