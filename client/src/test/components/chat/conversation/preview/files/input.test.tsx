import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputFilePreview from '../../../../../../components/chat/conversation/preview/files/input';

describe('<InputFilePreview />', () => {
  it('should update the message when typing in the input', () => {
    const setMessage = jest.fn();

    render(<InputFilePreview message="" setMessage={setMessage} />);

    const input = screen.getByPlaceholderText('Type a message');

    const typedMessage = 'Hello, world!';
    userEvent.type(input, typedMessage);

    expect(setMessage).toHaveBeenCalled();
  })

  it('should render with the provided message', async () => {
    const mockMessage = 'Test message';

    render(<InputFilePreview message={mockMessage} setMessage={() => {}} />);
       const input = screen.getByPlaceholderText('Type a message');

       await screen.findByDisplayValue(mockMessage);

       expect(input.getAttribute('value')).toBe(mockMessage);
  });
});
