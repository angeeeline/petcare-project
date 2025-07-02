import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('petOwner'));

  if (!user) {
    return <Navigate to="/signup" />;
  }

  return children;
};

export default PrivateRoute;
