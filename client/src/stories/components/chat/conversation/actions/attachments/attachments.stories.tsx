import { Meta, StoryObj } from '@storybook/react';
import Attachments from '../../../../../../components/chat/conversation/actions/attachments';
import user from '../../../../../../test/components/chat/conversation/mocks/user.json';
import conversationList from '../../../../../../mocks/conversation_list.json';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';


const mockStore = configureMockStore([]);

const withProvider = ({
  showEmoji,
  showAttachments,
}: {
  showEmoji: boolean;
  showAttachments: boolean;
}) => {
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
      <Attachments
        showEmoji={showEmoji}
        setShowEmoji={() => {}}
        showAttachments={showAttachments}
        setShowAttachments={() => {}}
      />
    </Provider>
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Actions/Attachments/Attachments',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    showEmoji: true,
    showAttachments: true,
  },
};
