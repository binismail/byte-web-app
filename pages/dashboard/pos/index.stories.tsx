import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockDashboardProps } from './index.mocks';
import Dashboard, { IDashboard } from './index.page';

export default {
  title: 'templates/Dashboard',
  component: Dashboard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Dashboard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dashboard> = (args) => (
  <Dashboard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockDashboardProps.base,
} as IDashboard;
