import axios from 'axios';
import type { Sede } from '../models/Sede';
import type { Turno, TurnoBase } from '../types/turno';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const apiService = {
  // Método para obtener sedes
  getSedes: async () => {
    const response = await axios.get<{ success: boolean; data: Sede[] }>(`${API_URL}/sedes`);
    return response.data;
  },

  // Método para obtener un sede por ID
  getSedeById: async (id: number) => {
    const response = await axios.get<{ success: boolean; data: Sede }>(`${API_URL}/sedes/${id}`);
    return response.data;
  },

  // Método para obtener turnos
  getTurnos: async (filtros?: any) => {
    const response = await axios.get<{ success: boolean; data: Turno[] }>(
      `${API_URL}/turnos`,
      { params: filtros }
    );
    return response.data;
  },

  // Método para obtener un turno por ID
  getTurno: async (id: number) => {
    const response = await axios.get<{ success: boolean; data: Turno }>(
      `${API_URL}/turnos/${id}`
    );
    return response.data;
  },

  // Método para reservar turno
  reservarTurno: async (turnoData: Partial<TurnoBase>) => {
    const response = await axios.post<{ success: boolean; data: Turno }>(
      `${API_URL}/turnos`,
      turnoData
    );
    return response.data;
  },

  getProfesionalesBySede: async (sedeId: number) => {
    const response = await axios.get(`${API_URL}/profesionales/sede/${sedeId}`);
    return response.data;
  },

  getHorariosDisponibles: async (profesionalId: number, fecha: string) => {
    const response = await axios.get(
      `${API_URL}/turnos/horarios-disponibles/${profesionalId}`,
      { params: { fecha } }
    );
    return response.data;
  },

  getUsuarios: async () => {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
  }
};