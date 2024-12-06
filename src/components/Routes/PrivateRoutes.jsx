import React, { useContext } from 'react';
import { AuthContext } from '../Providers/Authprovider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoutes;
