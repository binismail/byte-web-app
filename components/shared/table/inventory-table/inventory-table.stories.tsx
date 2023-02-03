import { ComponentMeta, ComponentStory } from '@storybook/react';
import InventoryTable, { IInventoryTable } from './inventory-table';
import { mockInventoryTableProps } from './inventory-table.mocks';

export default {
  title: 'templates/Button',
  component: InventoryTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof InventoryTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InventoryTable> = (args) => (
  <InventoryTable {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockInventoryTableProps.base,
} as IInventoryTable;
