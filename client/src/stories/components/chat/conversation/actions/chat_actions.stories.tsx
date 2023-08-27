import { Meta, StoryObj } from '@storybook/react';
import user from '../../../../../test/components/chat/conversation/mocks/user.json';
import conversationList from '../../../../../mocks/conversation_list.json';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ChatActions from '../../../../../components/chat/conversation/actions';

const mockStore = configureMockStore([]);

const withProvider = () => {
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
      <ChatActions/>
    </Provider>
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Actions/Chat Actions',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

export const Primary = {};
