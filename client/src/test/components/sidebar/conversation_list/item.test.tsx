import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import conversation from './../../../../mocks/conversation.json';
import ConversationItem from '../../../../components/sidebar/conversation_list/item';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from './../../chat/conversation/mocks/user.json';
import activeConversation from "./../../../../mocks/active_conversation.json"

const mockStore = configureMockStore([]);

describe('ConversationItem', () => {
  it('should render correctly', () => {
    const customState = {
      user: {
        user,
      },
      chat: {
        activeConversation,
        conversationTyping: [],
      },
    };
    const store = mockStore(customState);

    const { container } = render(
      <Provider store={store}>
        <ConversationItem isOnline={false} conversation={conversation as any} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText('Jose')).toBeInTheDocument();
    expect(screen.getByText('16/08/2023')).toBeInTheDocument();
  });

    it('Validate user typing', async () => {
      const customState = {
        user: {
          user,
        },
        chat: {
          activeConversation,
          conversationTyping: ['64d30783582dd5869d6bc1c1'],
        },
      };
      const store = mockStore(customState);

      render(
        <Provider store={store}>
          <ConversationItem
            isOnline={false}
            conversation={conversation as any}
          />
        </Provider>,
      );

      expect(await screen.findByText('Typing...')).toBeInTheDocument();
    });
});
