import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchResults from '../../../../components/sidebar/search/results';
import mockSearchResults from './../../../../mocks/search_result.json';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from './../../chat/conversation/mocks/user.json';

const mockStore = configureMockStore([]);

describe('SearchResults', () => {
  it('should render correctly', async () => {
    const customState = {
      user: {
        user,
      },
    };
    const store = mockStore(customState);
    render(
      <Provider store={store}>
        <SearchResults
          searchResults={mockSearchResults as any}
          setSearchResults={() => {}}
        />
      </Provider>,
    );

    const [firstUser, secondUser] = await screen.findAllByRole('listitem');

    expect(await within(firstUser).findByText('Jose')).toBeInTheDocument();

    expect(await within(secondUser).findByText('Pepe')).toBeInTheDocument();
  });
});
