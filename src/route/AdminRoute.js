import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import getUserType from './UserType';

function AdminRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setRole(getUserType(storedToken));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (token && (role === 'SUPER_ADMINISTRATOR' || role === 'ADMINISTRATOR')) ? children : <Navigate to="/403" />;
}

export default AdminRoute;