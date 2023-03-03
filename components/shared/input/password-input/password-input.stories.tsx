import { ComponentMeta, ComponentStory } from '@storybook/react';
import PasswordInput, { IPasswordInput } from './password-input';
import { mockPasswordInputProps } from './password-input.mocks';

export default {
  title: 'templates/PasswordInput',
  component: PasswordInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof PasswordInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockPasswordInputProps.base,
} as IPasswordInput;
