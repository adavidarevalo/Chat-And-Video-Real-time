import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import InputCustom from '../../../components/auth/input_custom';

const meta = {
  title: 'Components/Auth/InputCustom',
  component: InputCustom,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { control: 'text' },
  },
} satisfies Meta<typeof InputCustom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'te',
    type: 'text',
    placeholder: 'Name',
    register: null,
  },
};
