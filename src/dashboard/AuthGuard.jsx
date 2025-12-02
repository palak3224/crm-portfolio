import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from './utils/api';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      
      // If no token but isAuthenticated is true (fallback mode), allow access
      if (!token && isAuthenticated === 'true') {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await authAPI.verify();
        // Update user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Token verification error:', error);
        
        // If it's a network error, check if we have fallback authentication
        if (error.message.includes('Failed to fetch') || error.message.includes('Network error')) {
          const isAuthenticated = localStorage.getItem('isAuthenticated');
          if (isAuthenticated === 'true') {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
          setIsAuthenticated(false);
        }
      }
      
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AuthGuard;
