import { Meta, StoryObj } from '@storybook/react';
import user from '../../../../../../../test/components/chat/conversation/mocks/user.json';
import conversationList from '../../../../../../../mocks/conversation_list.json';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AttachmentsMenu from '../../../../../../../components/chat/conversation/actions/attachments/menu';

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
      <AttachmentsMenu/>
    </Provider>
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Actions/Attachments/Menu/Attachments',
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
