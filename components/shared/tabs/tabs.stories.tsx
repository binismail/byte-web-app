import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tabs, { ITabs } from './tabs';
import { mockTabsProps } from './tabs.mocks';

export default {
  title: 'templates/Tabs',
  component: Tabs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Tabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTabsProps.base,
} as ITabs;
