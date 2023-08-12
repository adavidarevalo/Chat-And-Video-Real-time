import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import { ProtectedHomePage } from "./protected_route";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedHomePage element={<HomePage />} />,
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