import { apiService } from './apiService';
import type { Sede } from '../models/Sede';

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: any;
}

export const sedesService = {
  getSedes: async (): Promise<ServiceResponse<Sede[]>> => {
    try {
      const response = await apiService.getSedes();
      return response;
    } catch (error) {
      console.error('Error al obtener sedes:', error);
      return { success: false, error };
    }
  },

  obtenerSedePorId: async (id: number): Promise<ServiceResponse<Sede>> => {
    try {
      const response = await apiService.getSedeById(id);
      if (!response.success) {
        throw new Error('Error al obtener sede');
      }
      return response;
    } catch (error) {
      console.error('Error al obtener sede:', error);
      return { success: false, error };
    }
  }
};