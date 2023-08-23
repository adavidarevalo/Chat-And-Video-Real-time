import { Meta, StoryObj } from '@storybook/react';
import Message from '../../../../components/chat/conversation/message';
import messages from './../../../../test/components/chat/conversation/mocks/messages.json';

const meta = {
  title: 'Components/Chat/Conversation/Messages',
  component: Message,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isMe: false,
    message: messages[0] as any,
  },
};
