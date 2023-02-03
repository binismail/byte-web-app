import { ComponentMeta, ComponentStory } from '@storybook/react';
import Table, { ITable } from './table';
import { mockTableProps } from './table.mocks';

export default {
  title: 'templates/Button',
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTableProps.base,
} as ITable;
