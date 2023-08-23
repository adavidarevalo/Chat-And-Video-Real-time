import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import user from './../../chat/conversation/mocks/user.json';
import SidebarHeader from '../../../../components/sidebar/header';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([]);

describe('SidebarHeader', () => {
  it('should render correctly', async () => {
    const customState = {
      user: {
        user,
      },
    };
    const store = mockStore(customState);
    render(
      <Provider store={store}>
        <SidebarHeader />
      </Provider>,
    );

    const [CommunityIcon, StoryIcon, ChatIcon, DotsIcon] =
      await screen.findAllByRole('listitem');

    expect(
      await within(CommunityIcon).findByTestId('community-icon'),
    ).toBeInTheDocument();
    expect(
      await within(StoryIcon).findByTestId('story-icon'),
    ).toBeInTheDocument();
    expect(
      await within(ChatIcon).findByTestId('chat-icon'),
    ).toBeInTheDocument();
    expect(
      await within(DotsIcon).findByTestId('dots-icon'),
    ).toBeInTheDocument();
  });
  it('Verify the open menu', async () => {
    const customState = {
      user: {
        user,
      },
    };
    const store = mockStore(customState);
    render(
      <Provider store={store}>
        <SidebarHeader />
      </Provider>,
    );

    // userEvent.click(document.querySelector('[data-testid="open-menu-btn"]'));

    // expect(await screen.findByTestId('sidebar-list')).toBeInTheDocument();
  });
});
