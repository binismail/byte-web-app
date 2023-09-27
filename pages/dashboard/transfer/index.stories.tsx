import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockTransferProps } from './index.mocks';
import Transfer, { ITransfer } from './index.page';

export default {
  title: 'templates/Transfer',
  component: Transfer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Transfer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Transfer> = (args) => (
  <Transfer {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTransferProps.base,
} as ITransfer;
