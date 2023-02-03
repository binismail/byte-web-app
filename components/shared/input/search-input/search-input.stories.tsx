import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchInput, { ISearchInput } from './search-input';
import { mockSearchInputProps } from './search-input.mocks';

export default {
  title: 'templates/Button',
  component: SearchInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SearchInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSearchInputProps.base,
} as ISearchInput;
