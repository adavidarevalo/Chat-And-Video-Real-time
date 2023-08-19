import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import messages from './mocks/messages.json';
import '@testing-library/jest-dom/extend-expect';
import Message from '../../../../components/chat/conversation/message';

describe('Message component', () => {
  it('renders the component with user message correctly', async () => {
    render(<Message message={messages[0] as any} isMe={true} />);

    const messageComponent = await screen.findByTestId('message-component');
    expect(messageComponent).toBeInTheDocument();

    expect(screen.getByText(messages[0].message)).toBeInTheDocument();

    const formattedTimestamp = moment(messages[0].createdAt).format('HH:mm');
    expect(screen.getByText(formattedTimestamp)).toBeInTheDocument();

    const elementWithTestId = screen.queryByTestId('triangle-icon');
    expect(elementWithTestId).toBeNull();
  });

  it('renders the component with other user message correctly', async () => {
    render(<Message message={messages[0] as any} isMe={false} />);

    expect(screen.getByText(messages[0].message)).toBeInTheDocument();

    const formattedTimestamp = moment(messages[0].createdAt).format('HH:mm');
    expect(screen.getByText(formattedTimestamp)).toBeInTheDocument();
    expect(await screen.findByTestId('triangle-icon')).toBeInTheDocument();
  });
});
