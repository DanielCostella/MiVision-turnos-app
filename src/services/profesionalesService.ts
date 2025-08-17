import axios from 'axios';
import { Profesional } from '../types/profesional';

interface ApiResponse {
  success: boolean;
  data: Profesional[];
}

const API_URL = 'http://localhost:3001/api/profesionales';

export const profesionalesService = {
  getProfesionalesBySede: async (sedeId: number): Promise<ApiResponse> => {
    try {
      const response = await axios.get<ApiResponse>(`${API_URL}/sede/${sedeId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener profesionales:', error);
      throw error;
    }
  },

  getProfesionales: async (): Promise<ApiResponse> => {
    try {
      const response = await axios.get<ApiResponse>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener todos los profesionales:', error);
      throw error;
    }
  }
};