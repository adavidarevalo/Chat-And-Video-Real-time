import { Meta, StoryObj } from '@storybook/react';

import Input from '../../../../../components/chat/conversation/actions/input';
import user from './../../../../../test/components/chat/conversation/mocks/user.json';
import conversationList from './../../../../../mocks/conversation_list.json';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([]);

const withProvider = ({ message }: { message: string }) => {
  const customState = {
    user: {
      user,
    },
    chat: {
      conversations: conversationList,
      activeConversation: null,
      conversationTyping: [],
      onlineUsers: [],
    },
  };

  const store = mockStore(customState);

  return (
    <Provider store={store}>
      <Input message={message} setMessage={() => {}} textRef={null} />
    </Provider>
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Actions/Input',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: 'Hello World!',
  },
};
