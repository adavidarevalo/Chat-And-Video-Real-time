import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from './../../chat/conversation/mocks/user.json';
import SidebarSearch from '../../../../components/sidebar/search';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { SUCCESS_STATUS } from '../../../consts/http_status';
import searchResult  from "./../../../../mocks/search_result.json"
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([]);

const server = setupServer(
  rest.get('http://localhost:4000/api/v1/user', (req, res, ctx) => {
    return res(ctx.status(SUCCESS_STATUS), ctx.json(searchResult));
  }),
);

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe('SidebarSearch', () => {
  it('should render correctly', async () => {
    const customState = {
      user: {
        user,
      },
    };
    const store = mockStore(customState);
    render(
      <Provider store={store}>
        <SidebarSearch searchLength={0} setSearchResults={() => {}} />
      </Provider>,
    );

    expect(
      await screen.findByPlaceholderText('Search or start a new chat'),
    ).toBeInTheDocument();
    
    expect(await screen.findByTestId('search-icon')).toBeInTheDocument();
    expect(await screen.findByTestId('filter-icon')).toBeInTheDocument();
  });
  // it('Validate the result', async () => {
  //   const customState = {
  //     user: {
  //       user,
  //     },
  //   };
  //   const store = mockStore(customState);
  //   render(
  //     <Provider store={store}>
  //       <SidebarSearch searchLength={0} setSearchResults={() => {}} />
  //     </Provider>,
  //   );
  //   const input = await screen.findByPlaceholderText('Search or start a new chat');
  //   userEvent.type(input, 'Test{enter}');

  //     const [firstUser, secondUser] = await screen.findByTestId(
  //       'search-result-list',
  //     );

  //     expect(await within(firstUser).findByText('Jose')).toBeInTheDocument();

  //     expect(await within(secondUser).findByText('Pepe')).toBeInTheDocument();
  // });
});
