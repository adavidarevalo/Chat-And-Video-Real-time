import React from 'react'
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { store } from './redux/store';
import { SocketProvider } from './context/socket.context';

export default function App() {
  return (
    <Provider store={store}>
        <SocketProvider>
        <div className="dark">
          <RouterProvider router={router} />
        </div>
    </SocketProvider>
      </Provider>
  );
}
