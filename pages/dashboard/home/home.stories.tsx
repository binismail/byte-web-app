import { ComponentMeta, ComponentStory } from '@storybook/react';
import Home, { IHome } from './index';
import { mockHomeProps } from './home.mocks';

export default {
  title: 'templates/Home',
  component: Home,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Home>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockHomeProps.base,
} as IHome;
