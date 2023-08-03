import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<any> = ({ Component, ...rest }: any) => {
    const {user: {token} } = useSelector((state: any) => state.user)
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Component/>;
};