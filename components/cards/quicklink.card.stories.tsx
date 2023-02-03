import { ComponentMeta, ComponentStory } from '@storybook/react';
import QuickLinkCard, { IQuickLinkCard } from './quicklink.card';
import { mockQuickLinkCardProps } from './quicklink.card.mocks';

export default {
  title: 'templates/Button',
  component: QuickLinkCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof QuickLinkCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof QuickLinkCard> = (args) => (
  <QuickLinkCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockQuickLinkCardProps.base,
} as IQuickLinkCard;
