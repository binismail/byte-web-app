import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockPosProps } from './index.mocks';
import Pos, { IPos } from './index.page';

export default {
  title: 'templates/Pos',
  component: Pos,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Pos>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pos> = (args) => (
  <Pos {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockPosProps.base,
} as IPos;
