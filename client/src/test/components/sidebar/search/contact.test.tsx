import React from 'react';
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from './../../chat/conversation/mocks/user.json';
import Contact from '../../../../components/sidebar/search/contact';
import contact from "./../../../../mocks/contact.json"

const mockStore = configureMockStore([]);

describe('Contact', () => {
  it('should render correctly', async () => {
    const customState = {
      user: {
        user,
      },
    };
    const store = mockStore(customState);
    render(
      <Provider store={store}>
        <Contact contact={contact as any} setSearchResults={() => {}} />
      </Provider>,
    );

    expect(await screen.findByText("Test")).toBeInTheDocument()
    expect(
      await screen.findByText('Hey there! I am using whatsapp'),
    ).toBeInTheDocument();
  });
});
