import { Meta, StoryObj } from '@storybook/react';
import EmojiPickerSelector from '../../../../../components/chat/conversation/actions/emoji_picker';


const withProvider = ({
  message,
  showEmoji,
  showAttachments,
}: {
  message: string;
  showEmoji: boolean;
  showAttachments: boolean;
}) => {
  return (
      <EmojiPickerSelector
        message={message}
        setMessage={() => {}}
        textRef={null}
        showEmoji={showEmoji}
        setShowEmoji={() => {}}
        showAttachments={showAttachments}
        setShowAttachments={() => {}}
      />
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Actions/Emoji Picker',
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
    showEmoji: true,
    showAttachments: true,
  },
};
