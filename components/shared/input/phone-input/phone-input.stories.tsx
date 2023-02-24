import { ComponentMeta, ComponentStory } from '@storybook/react';
import PhoneInput, { IPhoneInput } from './phone-input';
import { mockPhoneInputProps } from './phone-input.mocks';

export default {
  title: 'templates/PhoneInput',
  component: PhoneInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof PhoneInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PhoneInput> = (args) => (
  <PhoneInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockPhoneInputProps.base,
} as IPhoneInput;
