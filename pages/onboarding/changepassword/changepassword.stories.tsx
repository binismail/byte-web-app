import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChangePassword, { IChangePassword } from './changepassword';
import { mockChangePasswordProps } from './changepassword.mocks';

export default {
  title: 'templates/ChangePassword',
  component: ChangePassword,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ChangePassword>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChangePassword> = (args) => (
  <ChangePassword {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockChangePasswordProps.base,
} as IChangePassword;
