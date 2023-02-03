import { ComponentMeta, ComponentStory } from '@storybook/react';
import AmountInput, { IAmountInput } from './amount-input';
import { mockAmountInputProps } from './amount-input.mocks';

export default {
  title: 'templates/AmountInput',
  component: AmountInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AmountInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AmountInput> = (args) => (
  <AmountInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockAmountInputProps.base,
} as IAmountInput;
