import { ComponentMeta, ComponentStory } from '@storybook/react';
import VerifyPhone, { IVerifyPhone } from './verifyphone';
import { mockVerifyPhoneProps } from './verifyphone.mocks';

export default {
  title: 'templates/VerifyPhone',
  component: VerifyPhone,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof VerifyPhone>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VerifyPhone> = (args) => (
  <VerifyPhone {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockVerifyPhoneProps.base,
} as IVerifyPhone;
