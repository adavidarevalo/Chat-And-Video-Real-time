/** @format */

import React from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from 'react-router-dom';

const isAuthenticated = () => {
  return true;
};

export const ProtectedHomePage: React.FC<RouteObject> = ({ element, ...route }) => {    
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return React.cloneElement(element as React.ReactElement, { ...route });
};
