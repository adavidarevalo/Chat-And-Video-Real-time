import { Meta, StoryObj } from '@storybook/react';
import FileImageVideo from '../../../../../components/chat/conversation/files/file_image_video';

const meta = {
  title: 'Components/Chat/Conversation/Files/File Image Video',
  component: FileImageVideo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof FileImageVideo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'IMAGE',
    url: 'https://dg.imgix.net/do-you-think-you-re-happy-jgdbfiey-en/landscape/do-you-think-you-re-happy-jgdbfiey-9bb0198eeccd0a3c3c13aed064e2e2b3.jpg?ts=1520525855&ixlib=rails-4.3.1&fit=crop&w=2000&h=1050',
  },
};
