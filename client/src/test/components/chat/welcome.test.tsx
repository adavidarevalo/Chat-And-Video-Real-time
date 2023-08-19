import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WelcomeWhatsappHome } from '../../../components/chat/welcome';

describe('WelcomeWhatsappHome Component', () => {
  it('renders correctly', async () => {
    render(<WelcomeWhatsappHome />);
    
    expect(screen.getByText('Whatsapp Web')).toBeInTheDocument();
    expect(screen.getByText(/Send and receive messages without keeping your phone online/i)).toBeInTheDocument();
    expect(await screen.findByTestId('company-logo')).toBeInTheDocument();
  });
});
