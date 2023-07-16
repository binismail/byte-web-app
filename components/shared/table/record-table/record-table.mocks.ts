import { SalesRecordType } from '../../../../pages/dashboard/tools/record/records.types';
import { IRecordTable } from './record-table';

const base: IRecordTable<SalesRecordType> = {
  header: [],
  records: [],
  filter: '',
  isAscending: true,
  loading: false,
};

export const mockRecordTableProps = {
  base,
};
