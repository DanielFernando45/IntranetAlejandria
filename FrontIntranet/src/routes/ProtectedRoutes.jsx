// src/routes/ProtectedRoutes.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ allowedRoles }) => {

  const auth = useSelector((state) => state.auth);

  return auth.isAuthenticated ? (
    allowedRoles.includes(auth.user.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" />
    )
  ) : (
    <Navigate to="/" />
  );
  // const { state } = useContext(AuthContext);
  // const user = state.user;

  // if (!user) return <Navigate to="/" />;

  // if (!allowedRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" />;
  // }

  // return <Outlet />;
};

export default ProtectedRoutes;
