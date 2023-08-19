import { rest } from 'msw';

export const authHandlers = [
  rest.post('http://localhost:4000/api/v1/auth/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Mocked login response' }));
  }),
  rest.post('http://localhost:4000/api/v1/auth/register', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Mocked login response' }));
  }),
];
