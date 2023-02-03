import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecordTable, { IRecordTable } from './record-table';
import { mockRecordTableProps } from './record-table.mocks';

export default {
  title: 'templates/Button',
  component: RecordTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof RecordTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RecordTable> = (args) => (
  <RecordTable {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockRecordTableProps.base,
} as IRecordTable;
