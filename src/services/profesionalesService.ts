import { Profesional } from '../models/Profesional';

export const profesionalesService = {
  getProfesionales: async () => {
    try {
      const response = await fetch('/api/profesionales');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false };
    }
  },

  getProfesionalesBySede: async (sedeId: number) => {
    try {
      const response = await fetch(`/api/profesionales/sede/${sedeId}`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false };
    }
  }
};