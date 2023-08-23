import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import HeaderMenu from '../../../../components/sidebar/header/menu';

const mockStore = configureMockStore([]);

describe('SearchResults', () => {
  it('should render correctly', async () => {
    const customState = {
    };
    const store = mockStore(customState);
    render(
      <Provider store={store}>
        <HeaderMenu/>
      </Provider>,
    );
    const [newGroup, newCommunity, starredMessage, settings, logout] =
      await screen.findAllByRole('listitem');

    expect(within(newGroup).getByText('New group')).toBeInTheDocument();
    expect(within(newCommunity).getByText('New community')).toBeInTheDocument();
    expect(
      within(starredMessage).getByText('Starred message'),
    ).toBeInTheDocument();
    expect(within(settings).getByText('Settings')).toBeInTheDocument();
    expect(within(logout).getByText('Logout')).toBeInTheDocument();
  });
});
