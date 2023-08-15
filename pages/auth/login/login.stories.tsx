import { ComponentMeta, ComponentStory } from '@storybook/react';
import Login, { ILogin } from './index.page';
import { mockLoginProps } from './login.mocks';

export default {
  title: 'templates/Login',
  component: Login,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Login>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockLoginProps.base,
} as ILogin;
