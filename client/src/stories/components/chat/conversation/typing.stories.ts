import { Meta, StoryObj } from '@storybook/react';
import Typing from '../../../../components/chat/conversation/typing';

const meta = {
  title: 'Components/Chat/Conversation/Typing',
  component: Typing,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Typing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
