import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox, { ICheckbox } from './checkbox';
import { mockCheckboxProps } from './checkbox.mocks';

export default {
  title: 'templates/Checkbox',
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCheckboxProps.base,
} as ICheckbox;
