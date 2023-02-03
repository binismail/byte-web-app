import { ComponentMeta, ComponentStory } from '@storybook/react';
import Filter, { IFilter } from './filter';
import { mockFilterProps } from './filter.mocks';

export default {
  title: 'templates/Button',
  component: Filter,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Filter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFilterProps.base,
} as IFilter;
