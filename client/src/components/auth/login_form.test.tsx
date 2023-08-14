import { render, screen, waitFor } from '@testing-library/react';
import LoginForm from './login_form';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { renderWithProviders } from '../../mocks/render-with-providers';

const submitButton = () => screen.getByText(/Sign In/i, { selector: 'button' });

describe('<LoginForm />', () => {
  it('Validate form render', () => {
    render(renderWithProviders(<LoginForm />));

    expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(submitButton()).toBeInTheDocument();
  });
  it('it should validate the inputs as required', async () => {
    render(renderWithProviders(<LoginForm />));

    expect(submitButton()).not.toBeDisabled();

    userEvent.click(submitButton());

    expect(await waitFor(() => screen.getByText(/Email is required/i))).toBeInTheDocument();
    expect(await screen.getByText(/Password is required/i)).toBeInTheDocument();
  });
  it('it should disable the submit button while is fetching', async () => {
    render(renderWithProviders(<LoginForm />));

    expect(submitButton()).not.toBeDisabled();

    userEvent.type(screen.getByPlaceholderText('Email Address'), 'test@gmail.com');
    userEvent.type(screen.getByPlaceholderText('Password'), '123456789');

    userEvent.click(submitButton());

    expect(await waitFor(() => screen.getByTestId('login-loader'))).toBeInTheDocument();
    expect(await waitFor(() => submitButton())).toBeInTheDocument();
  });
});
