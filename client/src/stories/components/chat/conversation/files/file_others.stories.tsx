import { Meta, StoryObj } from '@storybook/react';
import pdfFile from '../../../../../mocks/pdf_file.json';
import FileOthers from '../../../../../components/chat/conversation/files/file_others';

const meta = {
  title: 'Components/Chat/Conversation/Files/File Others',
  component: FileOthers,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof FileOthers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'PDF',
    file: pdfFile,
  },
};
