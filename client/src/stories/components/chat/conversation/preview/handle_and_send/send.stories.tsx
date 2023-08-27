import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from '../../../../../../test/components/chat/conversation/mocks/user.json';
import conversationList from '../../../../../../mocks/conversation_list.json';
import activeConversation from '../../../../../../mocks/active_conversation.json';
import fileMessage from './../../../../../../mocks/file_message.json';
import HandleAndSend from '../../../../../../components/chat/conversation/preview/files/handle_and_send';

const mockStore = configureMockStore([]);

const withProvider = ({ loading }: { loading: boolean }) => {
  const customState = {
    user: {
      user,
    },
    chat: {
      conversations: conversationList,
      activeConversation,
      conversationTyping: ['64d572ab22c8820bec77e8bb'],
      onlineUsers: ['64c92f264942b0176d1ff6dc'],
      files: [fileMessage],
    },
  };

  const store = mockStore(customState);

  return (
    <Provider store={store}>
      <HandleAndSend
        activeIndex={0}
        setActiveIndex={() => {}}
        loading={loading}
      />
    </Provider>
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Preview/Handle and Send/Handle and Send',
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
    loading: false
  },
};
