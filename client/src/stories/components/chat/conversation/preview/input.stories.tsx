import { Meta, StoryObj } from '@storybook/react';
import InputFilePreview from '../../../../../components/chat/conversation/preview/files/input';

const meta = {
  title: 'Components/Chat/Conversation/Preview/Input',
  component: InputFilePreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputFilePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: 'Hello World',
    setMessage: () => {}
  },
};
