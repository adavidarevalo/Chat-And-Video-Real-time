import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import { ProtectedRoute } from "./protected_route";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute component={HomePage} />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);