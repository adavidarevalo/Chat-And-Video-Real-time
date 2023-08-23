import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import SidebarConversation from '../../../../components/sidebar/conversation_list';
import configureMockStore from 'redux-mock-store';
import user from './../../../../test/components/chat/conversation/mocks/user.json';
import conversationList from "./../../../../test/components/sidebar/conversation_list/mocks/conversation_list.json"
import activeConversation from './../../../../test/components/sidebar/conversation_list/mocks/active_conversation.json';

const mockStore = configureMockStore([]);

const withProvider = () => {
   const customState = {
     user: {
       user,
     },
     chat: {
       conversations: conversationList,
       activeConversation,
       conversationTyping: ['64d572ab22c8820bec77e8bb'],
       onlineUsers: ['64c92f264942b0176d1ff6dc'],
     },
   };

  const store = mockStore(customState);

  return (
    <Provider store={store}>
      <SidebarConversation/>
    </Provider>
  );
};

const meta = {
  title: 'Components/Sidebar/Conversation List/Sidebar Conversation',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { control: 'text' },
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'te',
    type: 'text',
    placeholder: 'Name',
    register: null,
  },
};