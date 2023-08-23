import { Meta, StoryObj } from '@storybook/react';
import ProviderWrapper from '../../providers';
import Picture from '../../../components/auth/picture';

const withProvider = () => {
  return (
    <ProviderWrapper>
      <Picture
        readablePicture={""}
        setPicture={() => {}}
        setReadablePicture={(r) => {}}
      />
    </ProviderWrapper>
  );
};

const meta = {
  title: 'Components/Auth/Picture',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
