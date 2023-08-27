import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import ConversationItem from '../../../../components/sidebar/conversation_list/item';
import conversation from './../../../../mocks/conversation.json';
import activeConversation from './../../../../mocks/active_conversation.json';
import user from './../../../../test/components/chat/conversation/mocks/user.json';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([]);

const withProvider = (isOnline: boolean, name: string, isTyping: boolean) => {

  const customState = {
    user: {
      user,
    },
    chat: {
      activeConversation,
      conversationTyping: isTyping ? ['64d30783582dd5869d6bc1c1'] : [],
    },
  };
  const store = mockStore(customState);

  const users = conversation.users.map(userConversation => {
    if(userConversation._id !== user._id) {
      userConversation.name = name;
    }
    return userConversation;
  })
  return (
    <Provider store={store}>
      <ConversationItem
        isOnline={isOnline}
        conversation={
          {
            ...conversation,
            users,
          } as any
        }
      />
    </Provider>
  );
};

export default {
  title: 'Components/Sidebar/Conversation List/Item',
  component: ConversationItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOnline: { control: { type: 'boolean' } },
    isTyping: { control: { type: 'boolean' } },
    name: { control: { type: 'text' } },
  },
} as Meta;

type TemplateProps = {
  isOnline: boolean;
  name: string;
  isTyping: boolean;
};

const Template: Story<TemplateProps> = ({
  isOnline,
  name,
  isTyping,
}: TemplateProps) => withProvider(isOnline, name, isTyping);

export const Primary = Template.bind({});

Primary.args = {
  isOnline: true,
  name: "Jose"
};
