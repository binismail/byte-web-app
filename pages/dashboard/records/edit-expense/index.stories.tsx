import { ComponentMeta, ComponentStory } from '@storybook/react';
import EditSales, { IEditSales } from './index';
import { mockEditSalesProps } from './index.mocks';

export default {
  title: 'templates/EditEditSales',
  component: EditSales,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EditSales>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditSales> = (args) => (
  <EditSales {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockEditSalesProps.base,
} as IEditSales;
