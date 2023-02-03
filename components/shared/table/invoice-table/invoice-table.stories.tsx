import { ComponentMeta, ComponentStory } from '@storybook/react';
import InvoiceTable, { IInvoiceTable } from './invoice-table';
import { mockInvoiceTableProps } from './invoice-table.mocks';

export default {
  title: 'templates/Invoice',
  component: InvoiceTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof InvoiceTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InvoiceTable> = (args) => (
  <InvoiceTable {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockInvoiceTableProps.base,
} as IInvoiceTable;
