import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export interface TurnosStats {
  turnosPorEstado: {
    pendientes: number;
    confirmados: number;
    cancelados: number;
    completados: number;
  };
  turnosHoy: number;
  profesionalesActivos: number;
}

export const turnosService = {
  getTurnosStats: async (): Promise<TurnosStats> => {
    const response = await axios.get(`${API_URL}/turnos/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data;
  },

  getHorariosDisponibles: async (profesionalId: number, fecha: string) => {
    const response = await axios.get(
      `${API_URL}/turnos/horarios-disponibles/${profesionalId}`,
      {
        params: { fecha }
      }
    );
    return response.data.data;
  },

  crearTurno: async (turnoData: any) => {
    const response = await axios.post(`${API_URL}/turnos`, turnoData);
    return response.data;
  },

  actualizarEstado: async (turnoId: number, estado: string) => {
    const response = await axios.put(`${API_URL}/turnos/${turnoId}/estado`, {
      estado
    });
    return response.data;
  },

  getTurnosBySede: async (sedeId: number) => {
    const response = await axios.get(`${API_URL}/turnos/sede/${sedeId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};