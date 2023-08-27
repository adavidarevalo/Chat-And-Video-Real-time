import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Sidebar from '../../../components/sidebar';
import user from './../chat/conversation/mocks/user.json';
import conversationList from "./../../../mocks/conversation_list.json"
const mockStore = configureMockStore([]);

describe('SearchResults', () => {
  it('should render correctly', async () => {
    const customState = {
      user: {
        user,
      },
      chat: {
        conversations: conversationList,
        onlineUsers: [],
        conversationTyping: []
      },
    };

    const store = mockStore(customState);
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
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
      within(secondConversation).getByText('16/08/2023'),
    ).toBeInTheDocument();

    expect(within(thirdConversation).getByText('Jose')).toBeInTheDocument();
    expect(
      within(thirdConversation).getByText('16/08/2023'),
    ).toBeInTheDocument();
  });
});
