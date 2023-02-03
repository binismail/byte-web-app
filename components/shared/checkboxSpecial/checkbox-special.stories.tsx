import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckboxSpecial, { ICheckboxSpecial } from './checkbox-special';
import { mockCheckboxSpecialProps } from './checkbox-special.mocks';

export default {
  title: 'templates/CheckboxSpecial',
  component: CheckboxSpecial,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CheckboxSpecial>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckboxSpecial> = (args) => (
  <CheckboxSpecial {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCheckboxSpecialProps.base,
} as ICheckboxSpecial;
