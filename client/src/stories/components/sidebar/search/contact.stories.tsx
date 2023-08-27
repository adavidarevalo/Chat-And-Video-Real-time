import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from './../../../../test/components/chat/conversation/mocks/user.json';
import contact from "../../../../mocks/contact.json"
import Contact from '../../../../components/sidebar/search/contact';
const mockStore = configureMockStore([]);

const withProvider = () => {
  const customState = {
    user: {
      user,
    },
  };

  const store = mockStore(customState);

  return (
    <Provider store={store}>
      <Contact contact={contact as any} setSearchResults={() => {}} />
    </Provider>
  );
};

const meta = {
  title: 'Components/Sidebar/Search/Contact',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};