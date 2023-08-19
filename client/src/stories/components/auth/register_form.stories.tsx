import { Meta, StoryObj } from '@storybook/react';
import ProviderWrapper from '../../providers';
import RegisterForm from '../../../components/auth/register_form';

const withProvider = () => (
  <ProviderWrapper>
    <RegisterForm />
  </ProviderWrapper>
);

const meta = {
  title: 'Components/Auth/RegisterForm',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
