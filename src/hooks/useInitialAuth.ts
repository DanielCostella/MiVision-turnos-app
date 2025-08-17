import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { verifyToken } from '../services/authService';

export const useInitialAuth = () => {
  const { token, setUser, setToken } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !token) {
        try {
          const userData = await verifyToken(storedToken);
          if (userData) {
            setUser(userData);
            setToken(storedToken);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
    };

    checkAuth();
  }, [token, setUser, setToken]);
};