import { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '../services/authService';

// Interfaces para tipar el contexto
interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserData | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear el contexto con tipos
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    setUser,
    setToken,
    login: async (email: string, password: string) => {
      try {
        // Llamada al API de login
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setToken(data.token);
          // Guardar token en localStorage
          localStorage.setItem('token', data.token);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error en login:', error);
        throw error;
      }
    },
    logout: () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};