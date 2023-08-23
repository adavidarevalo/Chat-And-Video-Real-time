import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchResults from '../../../../components/sidebar/search/results';
import mockSearchResults from "./../mocks/search_result.json"
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import user from "./../../chat/conversation/mocks/user.json"
import _ from 'lodash';

const mockStore = configureMockStore([]);

describe('SearchResults', () => {
  it('should render correctly', () => {
         const customState = {
           user: {
             user
           },
         };
         const store = mockStore(customState);
      render(
        <Provider store={store}>
          <SearchResults
            searchResults={mockSearchResults as any}
            setSearchResults={() => {}}
          />
        </Provider>
      );

      const userNames = mockSearchResults.map((user) => user.name);
      userNames.forEach((userName) => {
        console.log("🚀 ~ file: search_results.test.tsx:36 ~ userNames.forEach ~ userName:", userName)
        const userNameElement = screen.getByText(_.capitalize(userName));
        expect(userNameElement).toBeInTheDocument();
      });
  });
});
