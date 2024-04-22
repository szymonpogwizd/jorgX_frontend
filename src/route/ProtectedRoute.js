import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import getUserType from './UserType';

function ProtectedRoute({ children }) {
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

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
