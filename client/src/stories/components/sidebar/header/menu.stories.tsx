import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import HeaderMenu from '../../../../components/sidebar/header/menu';

const mockStore = configureMockStore([]);

const withProvider = () => {
  const customState = {};

  const store = mockStore(customState);

  return (
    <Provider store={store}>
      <HeaderMenu />
    </Provider>
  );
};

const meta = {
  title: 'Components/Sidebar/Header/Menu',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
