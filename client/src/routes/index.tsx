import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HomePage/>
    ),
  },
  {
    path: '/login',
    element: (
      <LoginPage/>
    ),
  },
  {
    path: '/register',
    element: (
      <RegisterPage/>
    ),
  }
]);