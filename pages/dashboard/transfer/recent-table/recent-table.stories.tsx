import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SalesRecordType } from '../../tools/record/records.types';
import  RecentTable, { IRecentTable } from './recent-table';
import { mockRecentTableProps } from './recent-table.mocks';

export default {
  title: 'templates/Button',
  component: RecentTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof RecentTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RecentTable> = (args) => (
  <RecentTable {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockRecentTableProps.base,
} as IRecentTable<SalesRecordType>;
