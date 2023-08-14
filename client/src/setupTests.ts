import { setupServer } from 'msw/node';
import { authHandlers } from './mocks/auth.mock';

const server = setupServer(...authHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
