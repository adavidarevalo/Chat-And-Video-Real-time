import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import messages from './mocks/messages.json';
import user from './mocks/user.json';
import ActiveConversation from './mocks/active_conversation.json';
import ChatMessages from '../../../../components/chat/conversation/messages';

const mockStore = configureMockStore([]);

describe('ChatMessages component', () => {
  it('validate render', async () => {
    const customState = {
      chat: {
        messages,
        conversationTyping: [],
        activeConversation: null,
      },
      user: {
        user,
      },
    };
    const store = mockStore(customState);

    render(
      <Provider store={store}>
        <ChatMessages />
      </Provider>,
    );

    expect(await screen.findByText(/asd/i)).toBeInTheDocument();
    expect(await screen.findByText(/18:28/i)).toBeInTheDocument();
    const [triangle] = await screen.findAllByTestId('triangle-icon');
    expect(triangle).toBeInTheDocument();
    expect(await screen.findByTestId('scroll-element')).toBeInTheDocument();
  });
  it('validate typing component', async () => {
    const customState = {
      chat: {
        messages,
        conversationTyping: ['64d3ac87c674cf079fb21dd5'],
        activeConversation: ActiveConversation,
      },
      user: {
        user,
      },
    };
    const store = mockStore(customState);

    render(
      <Provider store={store}>
        <ChatMessages />
      </Provider>,
    );

    expect(await screen.findByTestId('typing-component')).toBeInTheDocument();
  });
  it('validate when there are not messages', async () => {
    const customState = {
      chat: {
        messages: [],
        conversationTyping: ['64d3ac87c674cf079fb21dd5'],
        activeConversation: ActiveConversation,
      },
      user: {
        user,
      },
    };
    const store = mockStore(customState);

    render(
      <Provider store={store}>
        <ChatMessages />
      </Provider>,
    );
    const elementWithTestId = screen.queryByTestId('message-component');
    expect(elementWithTestId).toBeNull();
  });
  it('validate messages with files', async () => {
    const customState = {
      chat: {
        messages,
        conversationTyping: ['64d3ac87c674cf079fb21dd5'],
        activeConversation: ActiveConversation,
      },
      user: {
        user,
      },
    };
    const store = mockStore(customState);

    render(
      <Provider store={store}>
        <ChatMessages />
      </Provider>,
    );
    const [pdfFile, imageFile] = await screen.findAllByTestId(
      'file-message-component',
    );

    const { findAllByText } = within(pdfFile);

    const pdfWords = await findAllByText(/pdf/i);

    expect(pdfWords).toHaveLength(2);

    const { findByRole } = within(imageFile);

    expect(await findByRole('img')).toBeInTheDocument();
  });
});
