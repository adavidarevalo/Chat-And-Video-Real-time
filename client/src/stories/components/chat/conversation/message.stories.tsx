import { Meta, StoryObj } from '@storybook/react';
import Message from '../../../../components/chat/conversation/message';
import messages from "./../../../../test/components/chat/conversation/mocks/messages.json"
import ProviderWrapper from '../../../providers';
import MessageType from "./../../../../types/message.type"

const withProvider = (isMe: boolean, message: MessageType) => {
  return (
    <ProviderWrapper>
      <Message isMe={isMe} message={message} />
    </ProviderWrapper>
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Message',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    isMe: false,
    message: messages[0] as any
  },
};
