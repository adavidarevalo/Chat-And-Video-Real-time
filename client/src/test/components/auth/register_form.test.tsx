import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../mocks/render_with_providers';
import RegisterForm from '../../../components/auth/register_form';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { INVALID_REQUEST_STATUS } from '../../consts/http_status';

const submitButton = () => screen.getByText(/Sign Up/i, { selector: 'button' });

const server = setupServer(
  rest.post('http://localhost:4000/api/v1/auth/register', (req, res, ctx) => {
    return res(ctx.status(INVALID_REQUEST_STATUS));
  }),
);

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe('RegisterForm Component', () => {
  it('renders without errors', async () => {
    render(renderWithProviders(<RegisterForm />));
    expect(screen.getByText('Full Name')).toBeVisible();
    expect(screen.getByText('Email Address')).toBeVisible();
    expect(screen.getByText('Status (Optional)')).toBeVisible();
    expect(screen.getByText('Password')).toBeVisible();
    expect(screen.getByText('Sign Up')).toBeVisible();
    expect(
      screen.getByText('Sign Up', { selector: 'button' }),
    ).toBeInTheDocument();
  });

  it('Validate the Sign Up link', async () => {
    render(renderWithProviders(<RegisterForm />));
    const signUpLink = await screen.findByText('Sign In');

    expect(signUpLink).toBeInTheDocument();

    expect(signUpLink.getAttribute('href')).toBe('/login');
  });
  it('Validate validations schema', async () => {
    render(renderWithProviders(<RegisterForm />));

    userEvent.click(submitButton());

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i),
    ).toBeInTheDocument();
  });
  it('Invalid Email', async () => {
    render(renderWithProviders(<RegisterForm />));

    userEvent.click(submitButton());

    const emailInput = screen.getByPlaceholderText('Email Address');

    userEvent.type(emailInput, 'test');

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });
  it('Invalid Password', async () => {
    render(renderWithProviders(<RegisterForm />));

    userEvent.click(submitButton());

    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(passwordInput, 'test');

    expect(
      await screen.findByText(
        /password must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character./i,
      ),
    ).toBeInTheDocument();

    userEvent.type(passwordInput, 'test1223');

    expect(
      await screen.findByText(
        /password must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character./i,
      ),
    ).toBeInTheDocument();
  });
  it('Valid Password', async () => {
    render(renderWithProviders(<RegisterForm />));

    userEvent.click(submitButton());

    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(passwordInput, 'Password1@');

    expect(
      screen.queryByText(
        /password must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character./i,
      ),
    ).toBeNull();
  });
  it('validate email already used', async () => {
    server.use(
      rest.post(
        'http://localhost:4000/api/v1/auth/register',
        (req, res, ctx) => {
          return res(
            ctx.status(409),
            ctx.json({
              error: {
                status: 409,
                message:
                  'Please try again with a different email address, this email already exist.',
              },
            }),
          );
        },
      ),
    );

    render(renderWithProviders(<RegisterForm />));

    userEvent.click(submitButton());

    const emailInput = screen.getByPlaceholderText('Email Address');
    const nameInput = screen.getByPlaceholderText('Full Name');
    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'Password1@');
    userEvent.type(nameInput, 'test');

    userEvent.click(submitButton());

    await screen.findByText(
      /please try again with a different email address, this email already exist/i,
    );
  });
});
