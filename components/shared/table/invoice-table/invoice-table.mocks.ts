import { IInvoiceTable } from './invoice-table';

const base: IInvoiceTable = {
  header: [],
  contents: [],
  // header?: any;
  filter: 'num',
  loading: false,
  isAscending: true,
};

export const mockInvoiceTableProps = {
  base,
};
