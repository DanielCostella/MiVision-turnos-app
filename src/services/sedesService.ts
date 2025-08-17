import axios from 'axios';
import { Sede } from '../models/Sede';
import { ApiResponse } from '../types/api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const sedesService = {
  getSedes: async (): Promise<ApiResponse<Sede[]>> => {
    try {
      const response = await axios.get(`${API_URL}/sedes`);
      console.log('Respuesta del servidor:', response.data); // Para debug
      return response.data;
    } catch (error) {
      console.error('Error al obtener sedes:', error);
      throw error;
    }
  }
};