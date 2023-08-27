import { Meta, StoryObj } from '@storybook/react';
import FileMessage from '../../../../../components/chat/conversation/files/file_message';
import fileMessage from './../../../../../mocks/file_message.json';
import message from "./../../../../../mocks/message.json"

const meta = {
  title: 'Components/Chat/Conversation/Files/File Message',
  component: FileMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof FileMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isMe: true,
    message: message as any,
    fileMessage: fileMessage,
  },
};
