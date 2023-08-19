import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

export const renderWithProviders = (ui: React.ReactNode) => {
  return (
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};
