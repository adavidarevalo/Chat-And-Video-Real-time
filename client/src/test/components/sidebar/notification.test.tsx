import React from 'react';
import { render, screen } from '@testing-library/react';
import SidebarNotification from '../../../components/sidebar/notification';
import '@testing-library/jest-dom/extend-expect';

describe('SidebarNotification', () => {
  it('should render correctly', () => {
    const { container } = render(<SidebarNotification />);

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    expect(
      screen.getByText('Get notified of new messages'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Turn on desktop notification'),
    ).toBeInTheDocument();
  });
});
