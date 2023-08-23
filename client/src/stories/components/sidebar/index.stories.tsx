import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from './../../../test/components/chat/conversation/mocks/user.json';
import Sidebar from '../../../components/sidebar';
import conversationList from "./../../../test/components/sidebar/conversation_list/mocks/conversation_list.json"

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
      <Sidebar />
    </Provider>
  );
};

const meta = {
  title: 'Components/Sidebar/Sidebar',
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
