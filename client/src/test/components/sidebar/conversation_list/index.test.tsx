import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import user from './../../chat/conversation/mocks/user.json';
import { Provider } from 'react-redux';
import SidebarConversation from '../../../../components/sidebar/conversation_list';
import conversationList from './mocks/conversation_list.json';

const mockStore = configureMockStore([]);

describe('SidebarConversation', () => {
  it('Correctly render', async () => {
    const customState = {
      user: {
        user,
      },
      chat: {
        conversations: conversationList,
        activeConversation: null,
        conversationTyping: [],
        onlineUsers: [],
      },
    };
    const store = mockStore(customState);

    render(
      <Provider store={store}>
        <SidebarConversation />
      </Provider>,
    );

    const conversation = screen.getByTestId('conversation-list-container');
    const inConversation = within(conversation);

    const [firstConversation, secondConversation, thirdConversation] =
      await inConversation.findAllByRole('listitem');

    expect(within(firstConversation).getByText('Test')).toBeInTheDocument();
    expect(within(firstConversation).getByText('Hola')).toBeInTheDocument();
    expect(
      within(firstConversation).getByText('14/08/2023'),
    ).toBeInTheDocument();

    expect(within(secondConversation).getByText('Jose')).toBeInTheDocument();
    expect(within(secondConversation).getByText('asd')).toBeInTheDocument();
    expect(
      within(secondConversation).getByText('Wednesday'),
    ).toBeInTheDocument();

    expect(within(thirdConversation).getByText('Jose')).toBeInTheDocument();
    expect(
      within(thirdConversation).getByText('Wednesday'),
    ).toBeInTheDocument();
  });
});
