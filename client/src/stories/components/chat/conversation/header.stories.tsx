import { Meta, StoryObj } from '@storybook/react';
import configureMockStore from 'redux-mock-store';
import user from './../../../../test/components/chat/conversation/mocks/user.json';
import { Provider } from 'react-redux';
import ChatHeader from '../../../../components/chat/conversation/header';

const mockStore = configureMockStore([]);

const withProvider = () => {
  const customState = {
    user: {
      user,
    },
    chat: {
      activeConversation: null,
      conversationTyping: [],
      onlineUsers: [],
    },
  };

  const store = mockStore(customState);

  return (
    <Provider store={store}>
      <ChatHeader insOnline={false} callUser={() => {}}/>
    </Provider>
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Chat Header',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
