import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../redux/store';
import { ChakraProvider } from '@chakra-ui/react';

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <ChakraProvider>
      <Router>{children}</Router>
    </ChakraProvider>
  </Provider>
);


export default ProviderWrapper;
