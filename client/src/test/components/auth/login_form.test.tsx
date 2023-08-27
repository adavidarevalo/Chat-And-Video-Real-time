import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../providers/render_with_providers';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../../../components/auth/login_form';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import {
  INVALID_REQUEST_STATUS,
  NOT_FOUND__REQUEST_STATUS,
} from '../../consts/http_status';

const submitButton = () => screen.getByText(/Sign In/i, { selector: 'button' });
const server = setupServer(
  rest.post('http://localhost:4000/api/v1/auth/login', (req, res, ctx) => {
    return res(ctx.status(INVALID_REQUEST_STATUS));
  }),
);

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe('<LoginForm />', () => {
  it('renders form fields', () => {
    render(renderWithProviders(<LoginForm />));

    expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(submitButton()).toBeInTheDocument();
  });

  it('validates required inputs', async () => {
    render(renderWithProviders(<LoginForm />));

    userEvent.click(submitButton());

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it('disables submit button during fetching', async () => {
    render(renderWithProviders(<LoginForm />));

    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(submitButton()).not.toBeDisabled();

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(submitButton());

    await screen.findByTestId('login-loader');

    expect(
      await screen.findByRole('button', { name: 'Sign In' }),
    ).toBeInTheDocument();
  });
  it('Validate the Sign Up link', async () => {
    render(renderWithProviders(<LoginForm />));
    const signUpLink = await screen.findByText('Sign Up');

    expect(signUpLink).toBeInTheDocument();

    expect(signUpLink.getAttribute('href')).toBe('/register');
  });
  it('Connection error', async () => {
    render(renderWithProviders(<LoginForm />));

    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(submitButton());

    expect(
      screen.getByText('An error occurred while logging in.'),
    ).toBeInTheDocument();
  });
  it('Sing up failed', async () => {
    server.use(
      rest.post('http://localhost:4000/api/v1/auth/login', (req, res, ctx) => {
        return res(
          ctx.status(NOT_FOUND__REQUEST_STATUS),
          ctx.json({
            error: { status: 404, message: 'Invalid Credentials.' },
          }),
        );
      }),
    );

    render(renderWithProviders(<LoginForm />));

    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(submitButton());

    await screen.findByText(/invalid credentials/i);
  });
});
