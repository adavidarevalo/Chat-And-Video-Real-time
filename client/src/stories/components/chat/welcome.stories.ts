import { Meta, StoryObj } from '@storybook/react';
import { WelcomeWhatsappHome } from '../../../components/chat/welcome';

const meta = {
  title: 'Components/Chat/Welcome Whatsapp Home',
  component: WelcomeWhatsappHome,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof WelcomeWhatsappHome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
