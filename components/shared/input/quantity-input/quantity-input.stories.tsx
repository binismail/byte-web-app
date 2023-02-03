import { ComponentMeta, ComponentStory } from '@storybook/react';
import QuantityInput, { IQuantityInput } from './quantity-input';
import { mockQuantityInputProps } from './quantity-input.mocks';

export default {
  title: 'templates/QuantityInput',
  component: QuantityInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof QuantityInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof QuantityInput> = (args) => (
  <QuantityInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockQuantityInputProps.base,
} as IQuantityInput;
