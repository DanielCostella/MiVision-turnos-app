import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export interface UserData {
  id: number;
  email: string;
  nombre: string;
  role: string;
}

export const verifyToken = async (token: string): Promise<UserData | null> => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch (error) {
    console.error('Error verificando token:', error);
    return null;
  }
};

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    return localStorage.getItem('token');
  }
};

export default authService;