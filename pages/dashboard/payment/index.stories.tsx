import { ComponentMeta, ComponentStory } from '@storybook/react';
import Payment, { IPayment } from '.';
import { mockPaymentProps } from './index.mocks';

export default {
  title: 'templates/Payment',
  component: Payment,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Payment>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Payment> = (args) => (
  <Payment {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockPaymentProps.base,
} as IPayment;
