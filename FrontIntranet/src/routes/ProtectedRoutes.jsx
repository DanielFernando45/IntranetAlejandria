// src/routes/ProtectedRoutes.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ProtectedRoutes = ({ allowedRoles }) => {
  const { state } = useContext(AuthContext);
  const user = state.user;

  if (!user) return <Navigate to="/" />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
