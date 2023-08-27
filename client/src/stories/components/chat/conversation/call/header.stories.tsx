import { Meta, StoryObj } from '@storybook/react';
import Header from '../../../../../components/sidebar/header';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from './../../../../../test/components/chat/conversation/mocks/user.json';
import conversationList from './../../../../../mocks/conversation_list.json';

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
      <Header />
    </Provider>
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Call/Header',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
