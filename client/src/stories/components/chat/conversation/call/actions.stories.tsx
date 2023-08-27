import { Meta, StoryObj } from '@storybook/react';
import CallActions from '../../../../../components/chat/conversation/call/actions';

const withProvider = () => {
  return (
    <CallActions
      endCall={() => {}}
    />
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Call/Actions',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
