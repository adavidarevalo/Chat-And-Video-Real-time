import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../redux/store';
import "./../../index.css"

const ProviderWrapper = ({ children }: { children: React.ReactNode }) =>{ 
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );};


export default ProviderWrapper;
