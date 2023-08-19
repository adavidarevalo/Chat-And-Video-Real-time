import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../mocks/render_with_providers';
import '@testing-library/jest-dom/extend-expect';
import ChatHeader from '../../../../components/chat/conversation/header';

describe('ChatHeader component', () => {
  it('renders the component correctly', async () => {
    render(renderWithProviders(<ChatHeader insOnline={true} callUser={() => {}} />))

    expect(await screen.findByTestId('video-call-icon')).toBeInTheDocument();
    expect(await screen.findByTestId('call-icon')).toBeInTheDocument();
    expect(await screen.findByTestId('search-large-icon')).toBeInTheDocument();
    expect(await screen.findByTestId('dots-icon')).toBeInTheDocument();
    expect(screen.getByText(/online/i)).toBeInTheDocument();
  });

  it('calls the callUser function when the video call button is clicked', async () => {
    const callUserMock = jest.fn();
    render(
      renderWithProviders(
        <ChatHeader insOnline={true} callUser={callUserMock} />,
      ),
    );
    userEvent.click(await screen.findByTestId('video-call-icon'));
    expect(callUserMock).toHaveBeenCalled();
  });

});
