import { Meta, StoryObj } from '@storybook/react';
import SidebarNotification from '../../../components/sidebar/notification';
import ProviderWrapper from '../../providers';

const withProvider = () => {
  return (
    <ProviderWrapper>
      <SidebarNotification />
    </ProviderWrapper>
  );
};

const meta = {
  title: 'Components/Sidebar/Sidebar Notification',
  component: SidebarNotification,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof SidebarNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
