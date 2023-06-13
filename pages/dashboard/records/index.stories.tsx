import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockRecordsProps } from './index.mocks';
import Records, { IRecords } from './index.page';

export default {
  title: 'templates/Records',
  component: Records,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Records>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Records> = (args) => (
  <Records {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockRecordsProps.base,
} as IRecords;
