import { Meta, StoryObj } from '@storybook/react';
import LoginForm from '../../../components/auth/login_form';
import ProviderWrapper from '../../providers';

const withProvider = () => <ProviderWrapper><LoginForm/></ProviderWrapper>;

const meta = {
  title: 'Components/Auth/LoginForm',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
