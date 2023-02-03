import { ComponentMeta, ComponentStory } from '@storybook/react';
import TotalAmount, { ITotalAmount } from './total-amount';
import { mockTotalAmountProps } from './total-amount.mocks';

export default {
  title: 'templates/Button',
  component: TotalAmount,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TotalAmount>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TotalAmount> = (args) => (
  <TotalAmount {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTotalAmountProps.base,
} as ITotalAmount;
